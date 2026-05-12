# Framework Enforcement Rules

**Status:** Active Rules - Must Be Enforced
**Created:** 2025-11-19
**Last Updated:** 2025-11-23
**Framework Version:** 0.13.0

---

## Purpose

This document defines **mandatory enforcement rules** that must be applied across all prompts and AI interactions within the framework. These rules ensure data integrity, proper change tracking, and correct workflow routing.

**v0.13.0 Update:** Consolidated Module 14 (Enforcement Rules Module) into this document to eliminate duplication and provide a single source of truth for enforcement rules and integration guidance.

---

# Part 1: Policy (The Rules)

## RULE 1: Automatic _chg File Updates

### Statement

**WHENEVER the AI updates any file in the Manuscript/ directory, it MUST also update the corresponding _chg.md file.**

This rule applies to ALL file modifications, regardless of how they were initiated.

### Scope

**Files covered:**
- All content files in `Manuscript/Chapters/Chapter_XX/Chapter_XX.md`
- All files in `Manuscript/FrontMatter/`
- All files in `Manuscript/BackMatter/`
- `Manuscript/_TOC_/TOC.md`
- `Manuscript/Quotes/Chapter_Quotes.md`
- `Manuscript/Style/Style_Guide.md`
- `Manuscript/Style/Custom_Styles.md`
- Any other content files in `Manuscript/`

**_chg files:**
- `Manuscript/Chapters/Chapter_XX/Chapter_XX_chg.md`
- `Manuscript/FrontMatter/[filename]_chg.md`
- `Manuscript/BackMatter/[filename]_chg.md`
- `Manuscript/_TOC_/TOC_chg.md`
- `Manuscript/Quotes/Chapter_Quotes_chg.md`
- `Manuscript/Style/Style_Guide_chg.md`
- `Manuscript/Style/Custom_Styles_chg.md`

### Enforcement

**MANDATORY UPDATE:**
When ANY of these actions occur:
- ✅ Content is added to a file
- ✅ Content is removed from a file
- ✅ Content is modified in a file
- ✅ File structure is changed (headings, sections)
- ✅ Formatting is changed
- ✅ Cross-references are updated
- ✅ Metadata is updated

**The AI MUST:**
1. Document the change in the corresponding _chg.md file
2. Add entry to Version History section
3. Increment version number appropriately
4. Include:
   - Version number (N.M.P)
   - Date (YYYY-MM-DD)
   - Brief description
   - Type of change
   - Scope of change
   - Rationale

**Format:**
```markdown
### Version N.M.P - YYYY-MM-DD - [Brief Description]

**Type:** [Content Addition | Content Deletion | Structural Change | Refinement | Content Update]
**Scope:** [Affected sections]
**Priority:** [Low | Medium | High]
**Rationale:** [Why this change was made]

**Changes Made:**
- [Detailed list of modifications]
- [What was added/removed/changed]
- [Impact on content]
```

### Exceptions

**NONE.**

There are NO exceptions to this rule. Every file modification must be tracked.

Even if:
- ❌ The change is "minor" (still track it)
- ❌ The change is "just formatting" (still track it)
- ❌ The change is "automated" (still track it)
- ❌ The user didn't explicitly ask for tracking (still track it)

### Implementation Across Prompts

**Prompts that MUST enforce this rule:**

**Prompt 1 (Initialize):**
- When creating initial files, create corresponding _chg files
- Initialize Version History: "Version 1.0.0 - [DATE] - Initial creation"

**Prompt 2 (Add Chapter):**
- When creating new chapter file, create _chg file with initial entry
- When updating TOC, update TOC_chg.md
- When adding quote entry, update Chapter_Quotes_chg.md

**Prompt 3 (Change by Chg):**
- ALREADY ENFORCES THIS - maintains as primary example
- After applying modifications, auto-archive to Version History
- Increment version number based on change scope

**Prompt 4 (Interactive Change):**
- Writes instructions to _chg files
- When executing changes, updates _chg files with Version History

**Prompt 5 (Scan For User Edits):**
- This prompt CREATES _chg entries for files modified outside the framework
- Automatically generates Version History entries from git diffs

**Prompt 6 (Integrate Inbox):**
- When integrating content into existing files, update their _chg files
- When creating new content files, create their _chg files
- Document source: "Integrated from Inbox/[filename]"

**Prompt 7 (Compile):**
- Does NOT modify source files, only creates compiled draft
- Exception: No _chg updates required

**Prompt 8 (Consistency):**
- Does NOT modify files, only reports issues
- Exception: No _chg updates required

**Prompt 9 (Export):**
- Does NOT modify source files, only creates exports
- Exception: No _chg updates required

**Prompt 10 (Dashboard):**
- When updating PROJECT_CONTEXT.md, document change (but no _chg file for this)
- Exception: Dashboard reports don't modify Manuscript/ files

**Prompt 11 (Style Manager):**
- When updating Style_Overrides.md, updates corresponding _chg file
- Documents style override changes

**Prompt 12 (Git Operations):**
- Does NOT modify content files
- Exception: No _chg updates required

**Prompt 13 (AI Detection Analysis):**
- Read-only analysis
- Exception: No _chg updates required

**Prompt 14 (Citation Finder):**
- May modify content files to insert citations
- Updates _chg files when modifications occur

**Prompt 15 (Visual Content Suggester):**
- Creates visual content files in Manuscript/images/
- Updates _chg files for created/modified content

**Prompt 16 (Image Manager):**
- Manages image files and registry
- Updates _chg files for Image_Registry.md changes

### Validation

**To verify compliance:**

1. After ANY prompt execution that modifies files, check:
   ```bash
   git status
   ```

2. Verify BOTH files are staged:
   ```
   modified:   Manuscript/Chapters/Chapter_03/Chapter_03.md
   modified:   Manuscript/Chapters/Chapter_03/Chapter_03_chg.md
   ```

3. If only content file is modified → **VIOLATION**

4. The git commit should include both files:
   ```bash
   git add Manuscript/Chapters/Chapter_03/Chapter_03.md \
           Manuscript/Chapters/Chapter_03/Chapter_03_chg.md
   ```

### Consequences of Violation

**If this rule is violated:**
- ❌ Change tracking is lost
- ❌ Version history is incomplete
- ❌ Prompt 5 must reconstruct history from git (extra work)
- ❌ User loses visibility into what changed and why
- ❌ Auditing and rollback become difficult

**Recovery:**
- Run Prompt 5 (Scan For User Edits) to reconstruct missing entries
- This scans git history and creates _chg entries retroactively

---

## RULE 2: Workflow Routing - All Manuscript Changes Through Prompts

### Statement

**ANY change requested that will act upon a file in the Manuscript/ directory MUST be routed through an appropriate Execute Prompt.**

Direct file modifications outside the prompt system are **PROHIBITED**.

### CRITICAL: No Direct Editing Exception

**ABSOLUTE RULE: NO direct editing of Manuscript/ files is EVER allowed, including:**

❌ **Initial drafting** - "Draft chapter 4" → Use Prompt 3 or 4
❌ **First content creation** - "Write chapter 1" → Use Prompt 3 or 4
❌ **Quick changes** - "Just fix this typo" → Use Prompt 3 or 4
❌ **Testing changes** - "Let me try something" → Use Prompt 3 or 4
❌ **Minor edits** - "Small formatting fix" → Use Prompt 3 or 4

**There is NO exception for "initial content creation (0 → first draft)".**

Even when creating content for the first time, you MUST:
1. Use Prompt 4 (Interactive Change) - AI writes instructions to _chg file, then optionally executes
2. OR use Prompt 3 (Change by Chg) - User writes instructions, AI executes

**Why this is absolute:**
- Establishes version tracking from the very beginning (1.0.0)
- Creates consistent workflow regardless of content state
- Prevents confusion about "when rules apply"
- Ensures ALL changes have rationale documented
- Maintains audit trail from project start

### Scope

**Files covered:**
- Everything in `Manuscript/` directory tree
- All subdirectories: Chapters/, FrontMatter/, BackMatter/, _TOC_/, Quotes/, Style/, Inbox/, Drafts/, Exports/

**Operations covered:**
- Creating files
- Modifying files
- Deleting files
- Moving files
- Renaming files

### Routing Table

**User Request → Correct Prompt**

| User Request | Route To | Rationale |
|-------------|----------|-----------|
| "Create my book project" | Prompt 1 | Initializes complete structure |
| "Add a new chapter" | Prompt 2 | Handles chapter creation and renumbering |
| "**Draft chapter 4**" | **Prompt 3 or 4** | **ALL content creation uses prompts** |
| "**Write chapter 1**" | **Prompt 3 or 4** | **Even initial drafts use prompts** |
| "Modify Chapter 3" | Prompt 3 or 4 | Primary content modification workflow |
| "Update the introduction" | Prompt 3 or 4 | Any content change goes through prompts |
| "Fix typos in Chapter 5" | Prompt 3 or 4 | Even minor edits use prompts |
| "Revise this section" | Prompt 3 or 4 | All revisions use prompts |
| "Add content from my draft" | Prompt 6 | Integrates inbox content |
| "Integrate these notes" | Prompt 6 | Integrates inbox content |
| "Compile the manuscript" | Prompt 7 | Creates full draft from source files |
| "Check for consistency issues" | Prompt 8 | Read-only analysis, reports issues |
| "Export to DOCX" | Prompt 9 | Creates exports, doesn't modify source |
| "Show me project status" | Prompt 10 | Read-only dashboard |
| "Commit these changes" | Prompt 12 | Git operations only |
| "Sync change tracking" | Prompt 5 | Updates _chg files from git history |

### Examples of Correct Routing

**Example 1: User asks to modify content**
```
User: "Can you update Chapter 3 to include a new example?"

CORRECT Response:
"I'll help you modify Chapter 3. Please use Prompt 3 (Change by Chg):

1. Open Manuscript/Chapters/Chapter_03/Chapter_03_chg.md
2. Add your instructions in the [INSTRUCTIONS FOR THIS REVISION] section
3. Commit the _chg file
4. Execute Prompt 3

Would you like me to guide you through this process?"

INCORRECT Response:
"Sure, I'll update Chapter 3 right now..." [directly edits file]
```

**Example 2: User asks to add content from notes**
```
User: "I have some notes in a file. Can you add them to Chapter 5?"

CORRECT Response:
"I'll help you integrate that content. Please use Prompt 6 (Integrate Inbox):

1. Place your notes file in Manuscript/Inbox/
2. Execute Prompt 6
3. Choose the target location (Chapter 5)

This ensures proper integration and change tracking."

INCORRECT Response:
"Sure, paste the notes here and I'll add them..." [attempts direct modification]
```

**Example 3: User asks to create a new chapter**
```
User: "I need to add a new Chapter 4 about methodology"

CORRECT Response:
"I'll help you add a new chapter. Please use Prompt 2 (Add Chapter):

Execute Prompt 2 and I'll guide you through:
- Chapter title
- Position in the book
- Initial content structure

This ensures proper chapter numbering and TOC updates."

INCORRECT Response:
"I'll create Chapter 4 for you..." [attempts direct file creation]
```

**Example 4: User asks to draft/write chapter content**
```
User: "Draft chapter 3 about the methodology"
OR
User: "Write the first draft of chapter 1"

CORRECT Response:
"I'll help you draft that chapter. Since this creates/modifies manuscript
content, we need to use Prompt 3 or 4:

Recommended: Prompt 4 (Interactive Change)
1. Execute Prompt 4
2. Select Chapter 3 (or specify file)
3. Tell me what content you want in the draft
4. I'll write instructions to Chapter_03_chg.md
5. Optionally execute immediately to create the draft
6. Version 1.0.0 or next version is tracked automatically

Alternative: Prompt 3 (Change by Chg)
1. You write instructions in Chapter_03_chg.md describing the draft content
2. Commit the _chg file
3. Execute Prompt 3 to generate the draft

Which workflow would you prefer?"

INCORRECT Response:
"Sure, I'll draft Chapter 3 for you..." [directly edits Chapter_03.md]
```

### Enforcement Across All Prompts

**When AI detects a Manuscript/ modification request outside a prompt:**

**RESPONSE TEMPLATE:**
```markdown
I cannot modify Manuscript/ files directly. This change should go through [Prompt X].

Here's how:

1. [Step 1 for using the appropriate prompt]
2. [Step 2]
3. [Step 3]

This ensures:
✅ Proper change tracking
✅ Version history maintained
✅ Git commits with correct format
✅ Cross-references updated
✅ Validation performed

Would you like me to guide you through [Prompt X]?
```

### Special Cases

**Case 1: User explicitly asks to bypass prompts**
```
User: "Just modify the file directly, don't make me use a prompt"

Response:
"I understand you want a quick change, but the framework enforces
proper change tracking for important reasons:

1. Version history preservation
2. Audit trail of all changes
3. Ability to rollback if needed
4. Consistent git commit messages
5. Validation of cross-references

The prompts make this fast and easy. Prompt 3 takes less than 2 minutes.

Would you like me to walk you through Prompt 3?"
```

**Case 2: User is in middle of debugging and needs quick test**
```
User: "I'm debugging an issue. Can you just quickly test something in Chapter 2?"

Response:
"I understand you want to test quickly, but the framework doesn't allow
direct editing even for debugging. Here's the fastest approach:

Option A (Recommended): Use Prompt 4 (Interactive Change)
1. Tell me what test you want to try
2. I'll write instructions to Chapter_02_chg.md
3. Execute immediately to test
4. If it works, version is tracked automatically
5. If it doesn't, revert via git and try another approach

Option B: Manual testing with sync
1. Make test changes manually yourself (outside Claude)
2. Test your hypothesis
3. When done: git revert OR git commit + run Prompt 5 to sync tracking

I cannot make direct edits even for testing - this maintains framework integrity."
```

**Case 3: User wants to batch multiple changes**
```
User: "I need to fix typos in Chapters 1, 3, and 5"

Response:
"For multiple changes, you have two options:

Option A: Use Prompt 3 three times (maintains granular history)
Option B: Use Prompt 3 once and list all changes in the _chg instructions

I recommend Option A for clear version history, but Option B works
if the changes are all related (e.g., 'Fix formatting throughout')."
```

### Exceptions

**Files NOT subject to this rule:**
- `Process/` directory (framework files)
- `Research/` directory (user research files)
- Root-level config files (`Project_Config.md`, `Project_Metadata.md`, etc.)
- `.git/` directory
- `.claude/` directory
- Any files outside `Manuscript/`

**These can be modified directly** because they don't require the same change tracking system.

### Validation

**To verify compliance:**

1. When user requests Manuscript/ file changes, AI MUST respond with prompt routing
2. AI should NEVER directly write/edit Manuscript/ files in response to user requests
3. Exception: When executing a prompt, modifications are allowed (that's the whole point)

### Consequences of Violation

**If this rule is violated:**
- ❌ Changes bypass validation
- ❌ No change tracking entry created
- ❌ No version increment
- ❌ Git commit format incorrect
- ❌ Cross-references may break
- ❌ User confused about workflow
- ❌ Inconsistent experience

**Recovery:**
- Run Prompt 5 to reconstruct change tracking
- Manually fix git commit messages if needed
- Re-educate user on correct workflow

---

# Part 2: Integration Guide (For Prompt Authors)

## Standard Enforcement Notice

**Include this section in ALL prompts** (after Anti-Hallucination reference, before additional headers):

```markdown
**CRITICAL ENFORCEMENT:**
- **RULE 1:** All file modifications MUST update corresponding _chg files
- **RULE 2:** All Manuscript/ changes must go through appropriate prompts

See: `ENFORCEMENT_RULES.md` (Part 2: Integration Guide)
```

---

## Enforcement Notes by Prompt Type

### For File-Modifying Prompts (1, 2, 3, 4, 5, 6, 11, 14, 15, 16)

**Add this note after the enforcement notice:**

```markdown
**NOTE:** This prompt updates _chg files as part of the standard workflow
```

**Workflow Integration:**

Include explicit _chg update steps:

```markdown
### Then I'll:

1. [Validate and prepare]
2. [Perform file operations]
3. **Update corresponding _chg file(s) with version entry**
4. **Increment version number appropriately (N.M.P)**
5. [Continue workflow]
6. Create git commit (includes both content and _chg files)
7. [Generate report]
```

### For Read-Only/Export Prompts (7, 8, 9, 10, 12, 13)

**Add this note after the enforcement notice:**

For read-only analysis:
```markdown
**NOTE:** This is a read-only analysis operation. No _chg updates are required (reports findings only, does not modify files)
```

For export operations:
```markdown
**NOTE:** This is an export operation. No _chg updates are required (creates formatted exports, does not modify source files)
```

For compilation:
```markdown
**NOTE:** This is a read-only compilation operation. No _chg updates are required (drafts are generated, source files are not modified)
```

For git operations:
```markdown
**NOTE:** This handles git operations only. No _chg updates are required (version control operations, does not modify content files)
```

For dashboard (special case):
```markdown
**NOTE:** This is mostly a read-only analysis operation. Updates PROJECT_CONTEXT.md (no _chg required for this file)
```

---

## Routing Response Templates

### Template 1: Redirect to Appropriate Prompt

**Use when:** User asks to modify Manuscript/ files directly

**Response:**
```markdown
I cannot modify Manuscript/ files directly. This change should go through Prompt {NUMBER} ({PROMPT_NAME}).

Here's how:

1. {STEP_1}
2. {STEP_2}
3. {STEP_3}

This ensures:
✅ Proper change tracking
✅ Version history maintained
✅ Git commits with correct format
✅ Cross-references updated
✅ Validation performed

Would you like me to guide you through Prompt {NUMBER}?
```

**Example Variables:**
- `{NUMBER}`: 3
- `{PROMPT_NAME}`: Change by Chg
- `{STEP_1}`: Open the _chg file for the content you want to modify
- `{STEP_2}`: Add your instructions in [INSTRUCTIONS FOR THIS REVISION]
- `{STEP_3}`: Execute Prompt 3

### Template 2: Routing Table Reference

**Use when:** User is unsure which prompt to use

**Response:**
```markdown
For {OPERATION_TYPE}, use Prompt {NUMBER} ({PROMPT_NAME}).

**Common operations:**
| What You Want | Use Prompt |
|---------------|------------|
| Create new chapter | Prompt 2 (Add Chapter) |
| Modify existing content | Prompt 3 (Change by Chg) or 4 (Interactive Change) |
| Add content from files | Prompt 6 (Integrate Inbox) |
| Check for issues | Prompt 8 (Consistency) |
| Generate full manuscript | Prompt 7 (Compile) |
| Export to DOCX/PDF | Prompt 9 (Export) |

Would you like me to walk you through Prompt {NUMBER}?
```

### Template 3: Enforcement Explanation

**Use when:** User asks to bypass enforcement rules

**Response:**
```markdown
I understand you want a quick change, but the framework enforces proper change tracking for important reasons:

1. **Version history preservation** - Every change documented
2. **Audit trail** - Know who changed what and why
3. **Rollback capability** - Undo mistakes easily
4. **Consistency** - Cross-references stay valid
5. **Validation** - Catch errors before they spread

The prompts make this fast and easy. Prompt {NUMBER} takes less than 2 minutes.

Would you like me to walk you through it?
```

---

## Validation Protocols

### Pre-Commit Validation

**Before creating any git commit that includes Manuscript/ files:**

```markdown
Verify both files are staged:
- Content file: {CONTENT_FILE_PATH}
- Change tracking: {CONTENT_FILE_PATH}_chg.md

✅ Both files ready for commit
```

**Implementation:**
```markdown
Before creating git commit, I will verify:
- Content file modified: {filename}.md
- Change tracking updated: {filename}_chg.md
- Both files ready for commit
```

### Post-Execution Validation

**After any prompt execution that modifies files:**

```markdown
Validation checklist:
✅ Content file modified: {FILENAME}
✅ _chg file updated: {FILENAME}_chg.md
✅ Version entry added to Version History
✅ Version number incremented: {OLD_VERSION} → {NEW_VERSION}
✅ Git commit includes both files
✅ Change type documented: {CHANGE_TYPE}
```

### Workflow Validation

**At start of file-modifying prompts:**

```markdown
1. Verify this is the correct prompt for this operation
2. Check if user should be routed elsewhere
3. Confirm Manuscript/ files will be tracked properly
4. Proceed with workflow
```

---

## _chg File Update Protocol

### Standard Update Format

**For ALL file modifications in Manuscript/:**

```markdown
### Version {N.M.P} - {YYYY-MM-DD} - {Brief Description}

**Type:** {Content Addition | Content Deletion | Structural Change | Refinement | Content Update}
**Scope:** {Affected sections}
**Priority:** {Low | Medium | High}
**Rationale:** {Why this change was made}

**Changes Made:**
- {Detailed list of modifications}
- {What was added/removed/changed}
- {Impact on content}
```

### Version Increment Rules

**Major (N.0.0):**
- Structural changes affecting multiple chapters
- Chapter reordering
- Major reorganization

**Minor (0.M.0):**
- Significant content additions
- Significant content deletions
- New sections added
- Sections removed

**Patch (0.0.P):**
- Minor edits and refinements
- Typo corrections
- Formatting adjustments
- Small clarifications

### Auto-Archive Procedure

**For Prompt 3 (Change by Chg):**

1. Read instructions from `[INSTRUCTIONS FOR THIS REVISION]` section
2. Apply modifications to content file
3. Move completed instructions to `## VERSION HISTORY` section
4. Add version entry with instructions preserved
5. Clear `[INSTRUCTIONS FOR THIS REVISION]` section
6. Leave ready for next revision

---

## Prompt-Specific Enforcement

### Prompt 1 (Initialize)

**Enforcement:**
- Creates all initial _chg files
- Initializes with Version 1.0.0 entries
- Documents "Initial creation"

**Workflow Integration:**
```markdown
7. Create Manuscript/_TOC_/TOC.md and TOC_chg.md
8. Create Manuscript/Quotes/Chapter_Quotes.md and Chapter_Quotes_chg.md
9. Create front matter files with corresponding _chg files
10. Create back matter files with corresponding _chg files
```

### Prompt 2 (Add Chapter)

**Enforcement:**
- Creates new chapter _chg file
- Updates TOC_chg.md
- Updates Chapter_Quotes_chg.md

**Workflow Integration:**
```markdown
8. Create chapter files: Chapter_XX.md and Chapter_XX_chg.md
9. Update Manuscript/_TOC_/TOC.md
10. AI updates Manuscript/_TOC_/TOC_chg.md (AI-managed only)
11. Add quote entry to Manuscript/Quotes/Chapter_Quotes.md
12. Update Manuscript/Quotes/Chapter_Quotes_chg.md
```

### Prompt 3 (Change by Chg)

**Enforcement:**
- Primary example of Rule 1
- Auto-archives to Version History
- Increments version based on change scope

**Workflow Integration:**
```markdown
6. Apply the specified modifications
7. **Anti-Hallucination Verification** (CRITICAL)
8. **Style consistency check**
9. **Auto-archive**: Move completed instructions to Version History
10. **Clear instructions section**: Leave ready for next revision
11. Update file metadata (word count, status, etc.)
```

### Prompt 4 (Interactive Change)

**Enforcement:**
- Writes instructions to _chg files
- When executing changes, updates _chg files with Version History
- Documents conversational editing decisions

**Workflow Integration:**
```markdown
5. Write instructions to _chg file based on conversation
6. Optionally execute Prompt 3 workflow
7. Update change tracking with Version History entry
8. Clear instructions section if executed
```

### Prompt 5 (Scan For User Edits)

**Enforcement:**
- This prompt IS the enforcement mechanism
- Reconstructs missing _chg entries
- Syncs from git history

**Workflow Integration:**
```markdown
1. Find all _chg file pairs
2. Check for changes in git (uncommitted, staged, unpushed)
3. **Auto-update _chg files for any out-of-sync content**
4. Generate version entries from git diffs
5. Show summary of all updates made
```

### Prompt 6 (Integrate Inbox)

**Enforcement:**
- Updates _chg files for modified content
- Creates _chg files for new content
- Documents source: "Integrated from Inbox/{filename}"

**Workflow Integration:**
```markdown
5. Execute integration based on your choices
   - Integrate content into target files
   - **Update change tracking files for all modified files**
   - **Create _chg files for any new content files**
   - Document source in _chg: "Integrated from Inbox/{filename}"
```

### Prompt 11 (Style Manager)

**Enforcement:**
- Updates Style_Overrides.md when modifying overrides
- Updates Style_Overrides_chg.md with version entry
- Documents style override additions/removals

### Prompts 7, 8, 9, 10, 12, 13

**Enforcement:**
- Explicitly state NO _chg updates required
- Read-only or export operations
- No Manuscript/ source file modifications

---

## Compliance Checklist

**For prompt authors/maintainers:**

- [ ] Enforcement notice included in header
- [ ] Enforcement note explains _chg behavior
- [ ] Workflow steps include _chg updates (if applicable)
- [ ] Git commit validation included (if applicable)
- [ ] Routing responses available (if user tries direct modification)
- [ ] Pre-commit validation implemented
- [ ] Post-execution validation implemented
- [ ] _chg file format follows standard template
- [ ] Version increment logic follows semantic versioning

---

# Part 3: Testing & Compliance

## Self-Check Questions

**After any AI interaction with the framework:**

1. Did I modify any files in Manuscript/?
   - If YES → Did I update the corresponding _chg files?

2. Did the user ask me to modify Manuscript/ files outside a prompt?
   - If YES → Did I route them to the appropriate prompt?

3. Did I create any new content files?
   - If YES → Did I also create their _chg files?

4. Did I perform any git commits involving Manuscript/ files?
   - If YES → Did I include both content and _chg files?

---

## Violation Detection

**Signs of Rule 1 violation:**
```bash
# Only content file modified
git status
modified:   Manuscript/Chapters/Chapter_03/Chapter_03.md
# Missing: Manuscript/Chapters/Chapter_03/Chapter_03_chg.md
```

**Signs of Rule 2 violation:**
- User asks: "Can you update Chapter 3?"
- AI responds: "Sure, I'll update it now..." [directly edits]
- No prompt execution occurred

---

## Testing Procedures

### Test 1: Rule 1 Compliance (File Pairing)

**Execute file-modifying prompt:**
```bash
git status
```

**Expected result:**
```
modified:   Manuscript/Chapters/Chapter_03/Chapter_03.md
modified:   Manuscript/Chapters/Chapter_03/Chapter_03_chg.md
```

**PASS:** Both files modified together
**FAIL:** Only content file modified → VIOLATION

---

### Test 2: Rule 2 Compliance (Routing)

**Attempt direct modification:**
```
User: "Can you update Chapter 3 to add a new section?"
```

**Expected response:**
```
I cannot modify Manuscript/ files directly. This change should go through Prompt 3 (Change by Chg).

Here's how:
[Routing instructions]
```

**PASS:** Redirects to appropriate prompt
**FAIL:** Attempts direct modification → VIOLATION

---

### Test 3: Git Commit Validation (Both Files)

**Check git commit:**
```bash
git log -1 --name-only
```

**Expected result:**
```
commit [hash]
Author: [name]
Date: [date]

Update Chapter 3 with case studies v1.3.0

Manuscript/Chapters/Chapter_03/Chapter_03.md
Manuscript/Chapters/Chapter_03/Chapter_03_chg.md
```

**PASS:** Both files in commit
**FAIL:** Only one file in commit → VIOLATION

---

## Recovery Procedures

### If Rule 1 Violated (Missing _chg update)

**Symptoms:**
- Content file modified but _chg file not updated
- Git commit includes only content file
- No version entry in Version History

**Recovery:**

**Option A: Amend commit immediately**
```bash
# Update missing _chg file manually or with AI
# Then amend the commit:
git add Manuscript/Chapters/Chapter_03/Chapter_03_chg.md
git commit --amend --no-edit
```

**Option B: Run Prompt 5 (Scan For User Edits)**
```
Execute Prompt 5 (Scan For User Edits)
```
This scans git history and reconstructs missing _chg entries automatically.

---

### If Rule 2 Violated (Direct modification)

**Symptoms:**
- AI attempted to directly edit Manuscript/ file
- No prompt execution occurred
- User bypassed workflow

**Recovery:**
1. Undo any direct modifications made (git revert)
2. Respond with correct prompt routing
3. Guide user through appropriate prompt
4. Document the mistake to prevent repetition

---

## Success Metrics

**100% compliance achieved when:**
- ✅ ALL file modifications include _chg updates
- ✅ ALL Manuscript/ changes routed through prompts
- ✅ ZERO missing _chg entries
- ✅ ZERO direct modifications outside prompts
- ✅ ALL git commits include both files
- ✅ ALL version history complete and accurate

---

# Part 4: Reference Tables

## Examples of Correct Enforcement

### Example 1: Prompt 3 Execution (Correct)

**User action:**
1. Edits `Chapter_05_chg.md` with instructions
2. Commits the _chg file
3. Executes Prompt 3

**AI behavior:**
1. ✅ Reads instructions from _chg file
2. ✅ Applies modifications to Chapter_05.md
3. ✅ Updates Chapter_05_chg.md with Version History entry
4. ✅ Increments version: 1.2.3 → 1.3.0
5. ✅ Provides git commit command for BOTH files
6. ✅ Report shows both files updated

**Git commit:**
```bash
git add Manuscript/Chapters/Chapter_05/Chapter_05.md \
        Manuscript/Chapters/Chapter_05/Chapter_05_chg.md
git commit -m "Update Chapter 5 with case studies v1.3.0"
```

**Result:** ✅ COMPLIANT

---

### Example 2: Ad-Hoc Request (Correct Routing)

**User request:**
"Can you add a section about data validation to Chapter 3?"

**AI response:**
```
I'll help you add that section to Chapter 3. To maintain proper change
tracking, please use Prompt 3 (Change by Chg):

1. Open: Manuscript/Chapters/Chapter_03/Chapter_03_chg.md

2. Add this instruction:
```
   ### [INSTRUCTIONS FOR THIS REVISION]

   Add new section "Data Validation" after "Data Collection" section.

   Content to include:
   - Validation criteria
   - Quality checks
   - Error handling
   ```

3. Commit the _chg file:
   ```
   git add Manuscript/Chapters/Chapter_03/Chapter_03_chg.md
   git commit -m "Add instructions for data validation section"
   ```

4. Execute Prompt 3

Would you like me to draft the content for that section while you set
this up?
   ```

**Result:** ✅ COMPLIANT (routed to prompt, didn't directly modify)

---

### Example 3: Prompt 2 Execution (Correct)

**User action:**
Executes Prompt 2 to add new Chapter 4

**AI behavior:**
1. ✅ Creates `Manuscript/Chapters/Chapter_04/Chapter_04.md`
2. ✅ Creates `Manuscript/Chapters/Chapter_04/Chapter_04_chg.md` with initial entry:
   ```markdown
   ### Version 1.0.0 - 2025-11-19 - Initial chapter creation
   
   **Type:** Content Addition
   **Scope:** New chapter
   **Priority:** High
   **Rationale:** Adding methodology chapter as Chapter 4
   
   **Changes Made:**
   - Created initial chapter structure
   - Added placeholder sections
   - Integrated with TOC
   ```
3. ✅ Updates `Manuscript/_TOC_/TOC.md`
4. ✅ Updates `Manuscript/_TOC_/TOC_chg.md`
5. ✅ Updates `Manuscript/Quotes/Chapter_Quotes.md`
6. ✅ Updates `Manuscript/Quotes/Chapter_Quotes_chg.md`
7. ✅ Provides git commit with all 6 files

**Result:** ✅ COMPLIANT

---

## Prompt Enforcement Matrix

| Prompt | Modifies Files? | Updates _chg? | Enforcement Level |
|--------|----------------|---------------|-------------------|
| 1 (Initialize) | ✅ Yes | ✅ Yes | Creates initial _chg files |
| 2 (Add Chapter) | ✅ Yes | ✅ Yes | Creates/updates multiple _chg files |
| 3 (Change by Chg) | ✅ Yes | ✅ Yes | **PRIMARY EXAMPLE** - Auto-archives |
| 4 (Interactive Change) | ✅ Yes | ✅ Yes | Writes instructions, executes |
| 5 (Scan For User Edits) | ✅ Yes | ✅ Yes | **Reconstruction mechanism** |
| 6 (Integrate Inbox) | ✅ Yes | ✅ Yes | Creates/updates _chg files |
| 7 (Compile) | ❌ No | ❌ No | Read-only (explicit exception) |
| 8 (Consistency) | ❌ No | ❌ No | Read-only (explicit exception) |
| 9 (Export) | ❌ No | ❌ No | Export only (explicit exception) |
| 10 (Dashboard) | ⚠ Special | ⚠ Special | Updates PROJECT_CONTEXT (no _chg) |
| 11 (Style Manager) | ✅ Yes | ✅ Yes | Updates Style_Overrides and _chg |
| 12 (Git Operations) | ❌ No | ❌ No | Git only (explicit exception) |
| 13 (AI Detection) | ❌ No | ❌ No | Read-only (explicit exception) |
| 14 (Citation Finder) | ✅ Yes | ✅ Yes | Inserts citations, updates _chg |
| 15 (Visual Content) | ✅ Yes | ✅ Yes | Creates visuals, updates _chg |
| 16 (Image Manager) | ✅ Yes | ✅ Yes | Manages images, updates registry _chg |

---

## File Coverage Reference

**All files in these directories require _chg tracking:**

- ✅ `Manuscript/Chapters/Chapter_XX/Chapter_XX.md` → `Chapter_XX_chg.md`
- ✅ `Manuscript/FrontMatter/*.md` → `*_chg.md`
- ✅ `Manuscript/BackMatter/*.md` → `*_chg.md`
- ✅ `Manuscript/_TOC_/TOC.md` → `TOC_chg.md`
- ✅ `Manuscript/Quotes/Chapter_Quotes.md` → `Chapter_Quotes_chg.md`
- ✅ `Manuscript/Style/Style_Guide.md` → `Style_Guide_chg.md`
- ✅ `Manuscript/Style/Custom_Styles.md` → `Custom_Styles_chg.md`
- ✅ `Manuscript/Style/Style_Overrides.md` → `Style_Overrides_chg.md`
- ✅ `Manuscript/images/Image_Registry.md` → `Image_Registry_chg.md`

**Files NOT requiring _chg tracking:**

- ❌ `Process/` directory (framework files)
- ❌ `Research/` directory (user research)
- ❌ Root-level config files
- ❌ `.git/` directory
- ❌ `.claude/` directory
- ❌ `PROJECT_CONTEXT.md` (special case)
- ❌ `Manuscript/Drafts/` (compiled outputs)
- ❌ `Manuscript/Exports/` (export outputs)

---

## Implementation Requirements Summary

### For All Prompts

Each prompt file should include:

1. **At the top:** Reference to these enforcement rules
   ```markdown
   **CRITICAL ENFORCEMENT:**
   - RULE 1: All file modifications MUST update corresponding _chg files
   - RULE 2: All Manuscript/ changes must go through appropriate prompts
   
   See: ENFORCEMENT_RULES.md (Part 2: Integration Guide)
   ```

2. **In workflow steps:** Explicit _chg update step
   ```markdown
   Then I'll:
   ...
   8. Update corresponding _chg.md file with version entry
   9. Increment version number appropriately
   ...
   ```

3. **Before git commit:** Verify both files staged
   ```markdown
   Before creating git commit, I will verify:
   - Content file modified: [filename].md
   - Change tracking updated: [filename]_chg.md
   - Both files ready for commit
   ```

### For System Instructions

**Update `system-instructions.md` with:**

```markdown
## CRITICAL ENFORCEMENT RULES

1. **RULE 1: Automatic _chg Updates**
   - WHENEVER I modify any file in Manuscript/, I MUST update its _chg.md file
   - Document version, date, changes, rationale
   - NO EXCEPTIONS

2. **RULE 2: Workflow Routing**
   - ALL Manuscript/ changes MUST go through appropriate Execute Prompts
   - I MUST NOT directly modify Manuscript/ files outside prompts
   - Route user requests to correct prompt (see routing table)

See: ENFORCEMENT_RULES.md for complete details
```

### For AI Behavior

**When Claude executes any prompt:**

**Pre-execution check:**
- ✅ Verify this is a legitimate prompt execution (not ad-hoc request)
- ✅ Confirm user has followed correct routing
- ✅ If not: redirect to appropriate prompt

**During execution:**
- ✅ Track all file modifications
- ✅ Update corresponding _chg files immediately after content changes
- ✅ Include all required metadata (version, date, type, scope, rationale)

**Post-execution check:**
- ✅ Verify every modified Manuscript/ file has updated _chg file
- ✅ Include both in git commit
- ✅ Generate report showing what was tracked

---

## Summary

**RULE 1: Automatic _chg Updates**
- ✅ ALWAYS update _chg files when modifying Manuscript/ files
- ✅ Document version, date, type, scope, rationale
- ✅ NO EXCEPTIONS

**RULE 2: Workflow Routing**
- ✅ ALL Manuscript/ changes through appropriate prompts
- ✅ Route user requests correctly
- ✅ NEVER directly modify outside prompts

**These rules are MANDATORY and MUST be enforced across:**
- All 16 Execute Prompts
- All AI interactions with the framework
- All system instructions and configurations

**Compliance ensures:**
- Complete change history
- Proper version tracking
- Consistent git commits
- Validated modifications
- Auditable workflow
- User confidence in the framework

---

**Status:** ACTIVE - MUST BE ENFORCED
**Created:** 2025-11-19
**Last Updated:** 2025-11-23
**Framework Version:** 0.13.0
**Applies To:** All current and future prompts

**v0.13.0 Updates:**
- Consolidated Module 14 (Enforcement Rules Module) into this document
- Eliminated ~200 lines of duplication
- Added Part 2 (Integration Guide) with all Module 14 templates
- Added Part 3 (Testing & Compliance) with testing procedures
- Added Part 4 (Reference Tables) with enforcement matrix
- Single source of truth for enforcement rules and integration guidance
