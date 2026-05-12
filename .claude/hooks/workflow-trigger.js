#!/usr/bin/env node
// **Version:** 0.20.0
/**
 * workflow-trigger.js
 *
 * UserPromptSubmit hook that:
 * 1. Detects workflow trigger prefixes and injects reminders
 * 2. Responds to 'commands' with available triggers and slash commands
 * 3. Validates release assignment for 'work #N' commands (merged from validate-release.js)
 *
 * Trigger prefixes: bug:, enhancement:, finding:, idea:, proposal:, prd:
 * Work command: work #N (validates release assignment, provides branch context)
 *
 * Performance optimizations:
 * - Early exit for non-matching prompts (no I/O)
 * - Single detectFramework() function (no duplication)
 * - Cached command help (regenerated on demand)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Cache file location
const CACHE_FILE = path.join(process.cwd(), '.claude', 'hooks', '.command-cache.json');

let input = '';

process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    try {
        const data = JSON.parse(input);
        const prompt = (data.prompt || '').trim();
        const promptLower = prompt.toLowerCase();

        // FAST PATH: Early exit for non-matching prompts (no I/O needed)
        // Check for --refresh flag
        const hasRefreshFlag = /--refresh/i.test(prompt);
        const basePrompt = promptLower.replace(/\s*--refresh\s*/gi, '').trim();
        const isCommandRequest = ['commands', 'list-commands', 'list-cmds'].includes(basePrompt);
        const triggerMatch = prompt.match(/^(bug|enhancement|finding|idea|proposal|prd):/i);
        const workMatch = prompt.match(/^work\s+#?(\d+)/i);

        if (!isCommandRequest && !triggerMatch && !workMatch) {
            process.exit(0);
        }

        // Handle 'commands' request
        if (basePrompt === 'commands') {
            const helpText = generateCommandsHelp(hasRefreshFlag);
            const output = {
                systemMessage: `Success`,
                hookSpecificOutput: {
                    hookEventName: "UserPromptSubmit",
                    additionalContext: `[COMMANDS HELP: Display the following commands to the user in a clean formatted way.]\n\n${helpText}`
                }
            };
            console.log(JSON.stringify(output));
            process.exit(0);
        }

        // Handle 'List-Commands' request (full detailed list)
        if (basePrompt === 'list-commands' || basePrompt === 'list-cmds') {
            const detailedCommands = getDetailedCommands(hasRefreshFlag);
            const output = {
                systemMessage: `Success`,
                hookSpecificOutput: {
                    hookEventName: "UserPromptSubmit",
                    additionalContext: `[LIST-COMMANDS: Display the following detailed command list to the user in a clean formatted way.]\n\n${detailedCommands}`
                }
            };
            console.log(JSON.stringify(output));
            process.exit(0);
        }

        // Handle 'work #N' command - validate release assignment
        if (workMatch) {
            const issueNumber = workMatch[1];

            try {
                // Query issue's Release and Sprint fields via gh pmu view
                const result = execSync(
                    `gh pmu view ${issueNumber} --json`,
                    { encoding: 'utf-8', timeout: 10000 }
                );

                const issueData = JSON.parse(result);
                const release = issueData.fieldValues?.Release;
                const sprint = issueData.fieldValues?.Microsprint || issueData.fieldValues?.Sprint;

                if (!release || release === '' || release === 'null') {
                    // No release assigned - block with actionable message
                    const output = {
                        decision: 'block',
                        reason: `Issue #${issueNumber} has no release assignment.\n\nUse: /assign-release #${issueNumber} release/vX.Y.Z\n\nOr use: gh pmu move ${issueNumber} --release "release/vX.Y.Z"`
                    };
                    console.log(JSON.stringify(output));
                    process.exit(0);
                }

                // Release assigned - allow and provide branch context
                // Branch name IS the release name (already in [track]/[name] format)
                // e.g., release/v1.2.0, patch/v1.1.5, idpf/to-praxis, hotfix/auth-bypass
                const branchName = release;

                let contextMessage = `[BRANCH-AWARE WORK]\n`;
                contextMessage += `Issue #${issueNumber} is assigned to release: ${release}\n`;
                contextMessage += `\nBEFORE working on this issue:\n`;
                contextMessage += `1. Check current branch: git branch --show-current\n`;
                contextMessage += `2. If not on '${branchName}', switch to it: git checkout ${branchName}\n`;
                contextMessage += `3. NEVER commit directly to main branch\n`;

                if (sprint) {
                    contextMessage += `\nSprint context: ${sprint}\n`;
                }

                const output = {
                    systemMessage: `Success`,
                    hookSpecificOutput: {
                        hookEventName: 'UserPromptSubmit',
                        additionalContext: contextMessage
                    }
                };
                console.log(JSON.stringify(output));
                process.exit(0);

            } catch (error) {
                // Error checking - allow and let downstream handle (fail-open)
                const output = {
                    systemMessage: `Success`,
                    hookSpecificOutput: {
                        hookEventName: 'UserPromptSubmit',
                        additionalContext: `[WORK COMMAND] Could not verify release assignment for #${issueNumber} (fail-open). Proceeding with work.`
                    }
                };
                console.log(JSON.stringify(output));
                process.exit(0);
            }
        }

        // Handle workflow triggers
        if (triggerMatch) {
            const triggerType = triggerMatch[1].toLowerCase();

            if (triggerType === 'prd') {
                const output = {
                    systemMessage: `Success`,
                    hookSpecificOutput: {
                        hookEventName: "UserPromptSubmit",
                        additionalContext: "[PRD TRIGGER: Invoke Proposal-to-PRD workflow (Section 8 of GitHub-Workflow.md). Identify proposal from name or issue number, then run IDPF-PRD phases.]"
                    }
                };
                console.log(JSON.stringify(output));
            } else {
                const output = {
                    systemMessage: `Success`,
                    hookSpecificOutput: {
                        hookEventName: "UserPromptSubmit",
                        additionalContext: "[WORKFLOW TRIGGER: Create GitHub issue first. Wait for 'work' instruction before implementing.]"
                    }
                };
                console.log(JSON.stringify(output));
            }
        }

        process.exit(0);
    } catch (e) {
        process.exit(0);
    }
});

/**
 * Detect active IDPF framework (single source of truth)
 * @returns {string|null} Framework name or null
 */
function detectFramework() {
    const cwd = process.cwd();

    // Check framework-config.json first (user projects - most specific)
    try {
        const configPath = path.join(cwd, 'framework-config.json');
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            const framework = config.projectType?.processFramework || config.framework;
            if (framework) return normalizeFramework(framework);
        }
    } catch (e) {}

    // Check for IDPF directories (framework dev or direct usage)
    const frameworks = ['IDPF-Agile', 'IDPF-Vibe', 'IDPF-PRD'];
    for (const fw of frameworks) {
        if (fs.existsSync(path.join(cwd, fw))) {
            return fw;
        }
    }

    return null;
}

/**
 * Normalize framework name to standard format
 */
function normalizeFramework(name) {
    const lower = name.toLowerCase();
    if (lower === 'agile' || lower === 'idpf-agile') return 'IDPF-Agile';
    if (lower.startsWith('vibe') || lower === 'idpf-vibe') return 'IDPF-Vibe';
    if (lower === 'prd' || lower === 'idpf-prd') return 'IDPF-PRD';
    return name;
}

/**
 * Try to load from cache, regenerate if stale or missing
 * @param {string} key - Cache key to retrieve
 * @param {boolean} forceRefresh - If true, skip cache and force regeneration
 */
function getFromCache(key, forceRefresh = false) {
    // Skip cache entirely if refresh requested
    if (forceRefresh) {
        return null;
    }

    try {
        if (fs.existsSync(CACHE_FILE)) {
            const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));

            // Check if cache is from today (daily expiration)
            if (cache.timestamp) {
                const cacheDate = new Date(cache.timestamp).toDateString();
                const today = new Date().toDateString();
                if (cacheDate !== today) {
                    return null; // Cache expired, force regeneration
                }
            }

            // Trust cached framework when cache is fresh (no detectFramework() call)
            // Framework changes are rare within a session
            if (cache[key]) {
                return cache[key];
            }
        }
    } catch (e) {}
    return null;
}

/**
 * Save to cache
 */
function saveToCache(key, value) {
    try {
        let cache = {};
        if (fs.existsSync(CACHE_FILE)) {
            cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
        }
        cache.framework = detectFramework();
        cache[key] = value;
        cache.timestamp = Date.now();
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    } catch (e) {}
}

/**
 * Generate help text for all available commands
 * @param {boolean} forceRefresh - If true, bypass cache and regenerate
 */
function generateCommandsHelp(forceRefresh = false) {
    // Try cache first (unless refresh requested)
    const cached = getFromCache('commandsHelp', forceRefresh);
    if (cached) return cached;

    let help = `📋 **Available Commands**

**Workflow Triggers** (prefix your message):
- \`bug:\` - Report a bug → creates issue, wait for 'work' to implement fix
- \`enhancement:\` - Request enhancement → creates issue, wait for 'work' to implement
- \`finding:\` - Document a finding → creates issue for discovered issues
- \`idea:\` - Alias for proposal: → creates proposal document + issue
- \`proposal:\` - Formal proposal → creates proposal document + issue
- \`prd: [name]\` - Convert proposal to PRD → invokes IDPF-PRD workflow

**Issue Management**:
- \`work #N\` or \`work <issue>\` - Start working on issue (moves to In Progress)
- \`done\` - Complete current issue (moves to Done, closes issue)
`;

    // Get slash commands
    const slashCommands = getSlashCommands();
    if (slashCommands.length > 0) {
        help += `\n**Slash Commands**:\n`;
        for (const cmd of slashCommands) {
            help += `- \`/${cmd.name}\` - ${cmd.description}\n`;
        }
    }

    // Detect and show IDPF framework commands
    const framework = detectFramework();
    if (framework) {
        help += '\n' + getFrameworkDetailedCommands(framework);
    }

    // Cache the result
    saveToCache('commandsHelp', help);

    return help;
}

/**
 * Get detailed commands (used by list-commands)
 * @param {boolean} forceRefresh - If true, bypass cache and regenerate
 */
function getDetailedCommands(forceRefresh = false) {
    // Try cache first (unless refresh requested)
    const cached = getFromCache('detailedCommands', forceRefresh);
    if (cached) return cached;

    const framework = detectFramework();
    let result;

    if (framework) {
        result = getFrameworkDetailedCommands(framework);
    } else {
        result = getFrameworkSelectionHelp();
    }

    // Cache the result
    saveToCache('detailedCommands', result);

    return result;
}

/**
 * Read slash commands from .claude/commands/ directory
 */
function getSlashCommands() {
    const commands = [];
    const commandsDir = path.join(process.cwd(), '.claude', 'commands');

    try {
        if (!fs.existsSync(commandsDir)) return commands;

        const files = fs.readdirSync(commandsDir).filter(f => f.endsWith('.md'));
        for (const file of files) {
            const filePath = path.join(commandsDir, file);
            // Read only first 500 bytes for frontmatter (optimization)
            const fd = fs.openSync(filePath, 'r');
            const buffer = Buffer.alloc(500);
            fs.readSync(fd, buffer, 0, 500, 0);
            fs.closeSync(fd);
            const content = buffer.toString('utf8');

            const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
            if (frontmatterMatch) {
                const descMatch = frontmatterMatch[1].match(/description:\s*(.+)/);
                if (descMatch) {
                    commands.push({
                        name: file.replace('.md', ''),
                        description: descMatch[1].trim()
                    });
                }
            }
        }
    } catch (e) {}

    return commands;
}

/**
 * Get framework-specific detailed commands
 */
function getFrameworkDetailedCommands(framework) {
    switch (framework) {
        case 'IDPF-Agile': return getAgileDetailedCommands();
        case 'IDPF-Vibe': return getVibeDetailedCommands();
        case 'IDPF-PRD': return getPRDDetailedCommands();
        default: return getFrameworkSelectionHelp();
    }
}

function getAgileDetailedCommands() {
    return `## IDPF-Agile Commands - Full List

### Backlog Management

| Command | Description |
|---------|-------------|
| \`Create-Backlog\` | Generate initial product backlog from project vision |
| \`Add-Story\` | User describes a new story to add to backlog |
| \`Refine-Story [ID]\` | Update/clarify an existing story |
| \`Estimate-Story [ID]\` | Re-estimate story points |
| \`Prioritize-Backlog\` | Re-order stories by priority |
| \`Split-Story [ID]\` | Break a large story into smaller stories |
| \`Archive-Story [ID]\` | Move story to icebox |

---

### GitHub Issue Commands

| Command | Description |
|---------|-------------|
| \`Create-Issues\` | Create GitHub issues from PRD/backlog (auto-detects framework) |
| \`Create-Issues-Agile\` | Explicit Agile issue creation |

---

### Sprint Commands

| Command | Description |
|---------|-------------|
| \`Plan-Sprint\` | Select stories for next sprint |
| \`Show-Sprint\` | Display current sprint backlog |
| \`Start-Story [ID]\` | Begin development on a story |
| \`Story-Status\` | Check progress on current story |
| \`Story-Complete [ID]\` | Mark story as done |
| \`Sprint-Progress\` | Show sprint burndown/progress |
| \`Sprint-Review\` | Review completed sprint |
| \`Sprint-Retro\` | Conduct retrospective |
| \`End-Sprint\` | Close current sprint (runs Review + Retro) |

---

### Development Commands

| Command | Description |
|---------|-------------|
| \`Done-Next-Step\` | Current TDD iteration successful, proceed |
| \`Rollback-Previous-Step\` | Undo last iteration |
| \`Run-Tests\` | Execute full test suite |
| \`Show-Coverage\` | Display test coverage report |
| \`Refactor-Now\` | Dedicated refactoring session |

**TDD Skills:** \`tdd-red-phase\`, \`tdd-green-phase\`, \`tdd-refactor-phase\`, \`tdd-failure-recovery\`, \`test-writing-patterns\`

---

### Project Commands

| Command | Description |
|---------|-------------|
| \`Velocity-Report\` | Show velocity trends across sprints |
| \`Push-Changes\` | Commit and push current work |
| \`Project-Complete\` | Finalize project and create final PR |

---

### Release Lifecycle Commands

| Command | Slash Command | Description |
|---------|---------------|-------------|
| \`Open-Release\` | \`/open-release\` | Open release branch and tracker |
| \`Prepare-Release\` | \`/prepare-release\` | Validate, merge to main, tag, deploy |
| \`Close-Release\` | \`/close-release\` | Generate notes, create GitHub Release, cleanup |

---

### Special Scenario Commands

| Command | Description |
|---------|-------------|
| \`Story-Blocked [ID] [reason]\` | Mark story as blocked |
| \`Story-Growing [ID]\` | Flag story scope creep |
| \`Emergency-Bug [description]\` | Create unplanned bug fix story |
| \`Pivot [new direction]\` | Change project direction |

---

### Utility Commands

| Command | Description |
|---------|-------------|
| \`List-Commands\` | Show all available commands with descriptions |
| \`List-Cmds\` | Show all commands without descriptions |
| \`Help [command]\` | Get detailed help for specific command |
| \`Review-Last\` | Review ASSISTANT's most recent reply for accuracy |`;
}

function getVibeDetailedCommands() {
    return `## IDPF-Vibe Commands - Full List

### Development Flow

IDPF-Vibe uses conversational development. No strict commands required.

| Action | Description |
|--------|-------------|
| Describe what you want | Assistant builds iteratively |
| "Try this..." | Experiment with approaches |
| "Change it to..." | Modify current implementation |
| "That works, next..." | Move to next feature |

---

### Transition Commands

| Command | Description |
|---------|-------------|
| \`Formalize\` | Ready to transition to Agile |
| \`Extract-PRD\` | Generate PRD from current implementation |
| \`Add-Tests\` | Begin adding test coverage |

---

### When to Transition

- Code is working and stable
- Ready to add comprehensive tests
- Need formal requirements documentation
- Moving to team development

---

### Utility Commands

| Command | Description |
|---------|-------------|
| \`List-Commands\` | Show all available commands |
| \`Help\` | Get guidance on Vibe workflow |`;
}

function getPRDDetailedCommands() {
    return `## IDPF-PRD Commands - Full List

### Discovery Phase

| Command | Description |
|---------|-------------|
| \`Start-PRD\` | Begin PRD creation process |
| \`Define-Stakeholders\` | Identify project stakeholders |
| \`Define-Domain\` | Specify project domain and context |

---

### Elicitation Phase

| Command | Description |
|---------|-------------|
| \`Add-Requirement\` | Add a new functional requirement |
| \`Add-NFR\` | Add non-functional requirement |
| \`Add-Constraint\` | Add project constraint |
| \`Add-Risk\` | Document project risk |

---

### Specification Phase

| Command | Description |
|---------|-------------|
| \`Detail-Requirement [REQ-XXX]\` | Add details to requirement |
| \`Add-Acceptance-Criteria [REQ-XXX]\` | Define acceptance criteria |
| \`Prioritize-Requirements\` | Order requirements by priority |

---

### Generation Phase

| Command | Description |
|---------|-------------|
| \`Generate-PRD\` | Generate final PRD document |
| \`Select-Template\` | Choose PRD template (Comprehensive/Moderate/Lightweight) |
| \`Export-PRD\` | Export to specified format |

---

### Utility Commands

| Command | Description |
|---------|-------------|
| \`List-Commands\` | Show all available commands |
| \`Show-PRD-Progress\` | Display current PRD status |
| \`Review-Last\` | Review ASSISTANT's most recent reply |`;
}

function getFrameworkSelectionHelp() {
    return `## No Active Framework Detected

To see framework-specific commands, either:

1. **Set up a project** with \`framework-config.json\`:
   \`\`\`json
   { "framework": "IDPF-Agile" }
   \`\`\`

2. **Available frameworks:**
   - \`IDPF-Agile\` - Sprint-based development with user stories
   - \`IDPF-Vibe\` - Exploratory development
   - \`IDPF-PRD\` - Requirements engineering

3. **Quick start:** Type \`commands\` to see workflow triggers and slash commands.`;
}
