# Proposal: Claude Agent SDK Integration for Web-Based Authoring Application

**Issue:** #124
**Status:** Draft
**Created:** 2025-11-29

---

## Executive Summary

This proposal explores building a web-based authoring application using the Claude Agent SDK (TypeScript) to expose the full 17-prompt AI-Assisted Nonfiction Authoring Framework workflow through an interactive GUI.

---

## Table of Contents

1. [Claude Agent SDK Overview](#claude-agent-sdk-overview)
2. [Architecture Options](#architecture-options)
3. [Framework Integration Approach](#framework-integration-approach)
4. [Technical Considerations](#technical-considerations)
5. [Implementation Phases](#implementation-phases)
6. [Open Questions](#open-questions)

---

## Claude Agent SDK Overview

### What the SDK Provides

The Claude Agent SDK (TypeScript) enables building autonomous AI agents that can:

1. **Multi-turn Conversations**: Maintain context across multiple interactions
2. **Tool Use**: Define custom tools the agent can invoke (file read/write, API calls, etc.)
3. **Streaming**: Real-time response streaming for better UX
4. **Message History**: Manage conversation state programmatically
5. **System Prompts**: Configure agent behavior with system-level instructions

### Core SDK Components

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Basic agent loop pattern
async function agentLoop(userMessage: string) {
  const messages = [{ role: "user", content: userMessage }];

  while (true) {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: "Your system prompt here",
      tools: definedTools,
      messages,
    });

    // Handle tool use, continue loop, or return final response
  }
}
```

### SDK Capabilities Relevant to This Framework

| Capability | Framework Application |
|------------|----------------------|
| Tool definitions | File operations (read/write chapters, configs) |
| System prompts | Load prompt-specific instructions (Prompt 1-17) |
| Message history | Track session state, chapter progress |
| Streaming | Real-time draft generation feedback |
| Multi-turn | Interactive refinement of outlines/drafts |

---

## Architecture Options

### Option A: Electron Desktop App

```
┌─────────────────────────────────────────────┐
│           Electron Application              │
├─────────────────────────────────────────────┤
│  React/Vue Frontend                         │
│  ┌─────────────────────────────────────┐   │
│  │  - Project browser                   │   │
│  │  - Chapter editor                    │   │
│  │  - Prompt workflow UI                │   │
│  │  - Progress dashboard                │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  Node.js Backend (Main Process)             │
│  ┌─────────────────────────────────────┐   │
│  │  Claude Agent SDK                    │   │
│  │  - Prompt orchestration              │   │
│  │  - File system tools                 │   │
│  │  - State management                  │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  Local File System                          │
│  - Book project directories                 │
│  - Framework Process/ files                 │
└─────────────────────────────────────────────┘
```

**Pros:**
- Full file system access (native)
- Works offline (once API key configured)
- Single installable package
- No server infrastructure needed

**Cons:**
- Desktop-only (no mobile/tablet)
- Larger distribution size
- Platform-specific builds needed

### Option B: Web App with Backend API

```
┌──────────────────┐     ┌──────────────────────────┐
│   Browser UI     │────▶│   Node.js API Server     │
│   (React/Vue)    │◀────│                          │
└──────────────────┘     │  ┌────────────────────┐  │
                         │  │ Claude Agent SDK   │  │
                         │  │ - Prompt handlers  │  │
                         │  │ - Session manager  │  │
                         │  └────────────────────┘  │
                         │                          │
                         │  ┌────────────────────┐  │
                         │  │ Storage Layer      │  │
                         │  │ - Cloud storage    │  │
                         │  │ - Database         │  │
                         │  └────────────────────┘  │
                         └──────────────────────────┘
```

**Pros:**
- Access from any device
- Centralized storage/backup
- Easier updates (server-side)
- Collaboration potential

**Cons:**
- Requires hosting infrastructure
- API key management complexity
- Ongoing server costs
- Internet required

### Option C: Hybrid (Recommended for Exploration)

Start with a **local-first architecture** that can evolve:

```
Phase 1: Local CLI with web UI (localhost)
Phase 2: Electron packaging
Phase 3: Optional cloud sync
```

---

## Framework Integration Approach

### Mapping Prompts to Agent Tools

Each of the 17 prompts becomes an "agent mode" with specific tools and system prompts:

```typescript
interface PromptConfig {
  id: number;
  name: string;
  systemPrompt: string;      // Loaded from Process/Prompts/
  requiredTools: Tool[];     // Tools this prompt needs
  inputFiles: string[];      // Files the prompt reads
  outputFiles: string[];     // Files the prompt modifies
}

const promptConfigs: PromptConfig[] = [
  {
    id: 1,
    name: "Configure",
    systemPrompt: loadPrompt("Prompt_1_Configure.md"),
    requiredTools: [readFileTool, writeFileTool, askUserTool],
    inputFiles: ["Templates/Project_Config.md"],
    outputFiles: [".config/Project_Config.md", ".config/start-authoring.*"],
  },
  // ... prompts 2-17
];
```

### Tool Definitions for File Operations

```typescript
const tools: Tool[] = [
  {
    name: "read_file",
    description: "Read a file from the book project",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Relative path within project" }
      },
      required: ["path"]
    }
  },
  {
    name: "write_file",
    description: "Write content to a file in the book project",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string" },
        content: { type: "string" }
      },
      required: ["path", "content"]
    }
  },
  {
    name: "list_chapters",
    description: "List all chapter files in Chapters/ directory",
    input_schema: { type: "object", properties: {} }
  },
  {
    name: "get_project_config",
    description: "Read the current project configuration",
    input_schema: { type: "object", properties: {} }
  },
  {
    name: "ask_user",
    description: "Ask the user a question and wait for response",
    input_schema: {
      type: "object",
      properties: {
        question: { type: "string" },
        options: { type: "array", items: { type: "string" } }
      },
      required: ["question"]
    }
  }
];
```

### Session State Management

```typescript
interface AuthoringSession {
  projectPath: string;
  currentPrompt: number;
  conversationHistory: Message[];
  projectConfig: ProjectConfig;
  chapterStatus: Map<string, ChapterStatus>;
  lastModified: Date;
}

// Persist session state between interactions
class SessionManager {
  async save(session: AuthoringSession): Promise<void>;
  async load(projectPath: string): Promise<AuthoringSession>;
  async getActivePrompt(session: AuthoringSession): Promise<PromptConfig>;
}
```

### Prompt Orchestration Flow

```typescript
async function runPrompt(
  session: AuthoringSession,
  promptId: number,
  userInput: string
): Promise<AgentResponse> {
  const config = promptConfigs[promptId];

  // Load the full prompt text
  const systemPrompt = await loadSystemPrompt(config);

  // Add project context
  const contextualPrompt = injectProjectContext(systemPrompt, session);

  // Run agent loop
  const response = await agentLoop({
    systemPrompt: contextualPrompt,
    tools: config.requiredTools,
    messages: [...session.conversationHistory, { role: "user", content: userInput }],
    onToolUse: async (toolName, input) => {
      // Execute tool and return result
      return executeToolInProject(session.projectPath, toolName, input);
    }
  });

  // Update session state
  session.conversationHistory.push(
    { role: "user", content: userInput },
    { role: "assistant", content: response.content }
  );

  return response;
}
```

---

## Technical Considerations

### 1. Context Window Management

**Challenge:** Full prompt files + chapter content can exceed context limits.

**Solutions:**
- Chunked processing for long chapters
- Summary-based context for multi-chapter operations
- Smart context selection (only relevant sections)

```typescript
async function prepareContext(prompt: PromptConfig, session: AuthoringSession) {
  const baseContext = await loadPromptFile(prompt);
  const projectContext = await getProjectSummary(session);

  // If working on specific chapter, include full content
  // Otherwise, include summaries only
  if (prompt.scope === "chapter") {
    return baseContext + await loadChapter(session.currentChapter);
  }
  return baseContext + projectContext;
}
```

### 2. File System Security

**Challenge:** Agent needs file access but must be constrained to project directory.

**Solution:** Sandboxed file operations:

```typescript
function createSandboxedTools(projectRoot: string): Tool[] {
  const resolvePath = (relativePath: string) => {
    const resolved = path.resolve(projectRoot, relativePath);
    if (!resolved.startsWith(projectRoot)) {
      throw new Error("Path traversal attempt blocked");
    }
    return resolved;
  };

  return [
    {
      name: "read_file",
      execute: async (input) => {
        const safePath = resolvePath(input.path);
        return fs.readFile(safePath, "utf-8");
      }
    },
    // ... other sandboxed tools
  ];
}
```

### 3. API Key Management

**Options:**
1. **User provides key**: Stored locally (encrypted), user pays API costs
2. **App provides key**: Subscription model, app owner pays API costs
3. **Hybrid**: Free tier with user key, premium with managed key

### 4. Streaming UX

For long-running operations (drafting), stream responses:

```typescript
async function* streamPromptResponse(
  session: AuthoringSession,
  promptId: number,
  userInput: string
): AsyncGenerator<string> {
  const stream = await client.messages.stream({
    model: "claude-sonnet-4-20250514",
    system: loadPrompt(promptId),
    messages: session.conversationHistory,
  });

  for await (const chunk of stream) {
    if (chunk.type === "content_block_delta") {
      yield chunk.delta.text;
    }
  }
}
```

### 5. Anti-Hallucination Integration

The SDK integration must respect `Anti-Hallucination_Guidelines.md`:

```typescript
// Always include anti-hallucination guidelines in system prompt
const systemPrompt = `
${await loadFile("Process/Anti-Hallucination_Guidelines.md")}

---

${await loadPromptFile(promptConfig)}
`;
```

---

## Implementation Phases

### Phase 1: Proof of Concept (CLI)

**Goal:** Validate SDK can run framework prompts

**Deliverables:**
- Node.js CLI that runs Prompt 1 (Configure)
- Basic file read/write tools
- Session persistence (JSON file)

**Validation:**
- [ ] Can load and execute prompt instructions
- [ ] Can create project config via tool use
- [ ] State persists between runs

### Phase 2: Core Prompt Engine

**Goal:** Support all 17 prompts programmatically

**Deliverables:**
- Prompt orchestration system
- Full tool suite (file ops, user interaction)
- Context management for large documents

**Validation:**
- [ ] All prompts executable via API
- [ ] Chapter drafting works with streaming
- [ ] Cross-prompt state maintained

### Phase 3: Web UI (localhost)

**Goal:** Browser-based interface for local use

**Deliverables:**
- React/Vue frontend
- WebSocket connection for streaming
- Project browser and editor
- Progress dashboard

**Validation:**
- [ ] Full workflow completable via UI
- [ ] Real-time feedback during generation
- [ ] Clean project management UX

### Phase 4: Packaging & Distribution

**Goal:** Installable application

**Deliverables:**
- Electron packaging
- Auto-update mechanism
- Documentation and onboarding

---

## Open Questions

### Technical
1. **Token costs**: What's the estimated API cost per chapter? Per full book?
2. **Model selection**: Claude Sonnet for speed vs Opus for quality - configurable?
3. **Offline mode**: Cache prompts locally, queue operations when offline?

### UX
4. **Learning curve**: How to onboard users unfamiliar with the prompt system?
5. **Error recovery**: How to handle failed generations gracefully?
6. **Progress visibility**: How to show multi-step operations (Prompt 5 compilation)?

### Business
7. **Licensing**: Open source? Commercial? Freemium?
8. **API costs**: User-provided keys vs subscription model?
9. **Support**: Self-service docs vs community vs paid support?

### Framework
10. **Prompt modifications**: Can prompts be customized per-user or per-project?
11. **Style system**: How to expose the 19 writing styles in UI?
12. **Export formats**: PDF generation in browser (Typst) feasible?

---

## Next Steps

1. **Research**: Deep dive into Claude Agent SDK documentation and examples
2. **Prototype**: Build Phase 1 CLI proof-of-concept
3. **Validate**: Test with real authoring workflow
4. **Decide**: Choose architecture path based on findings

---

## References

- [Claude Agent SDK Documentation](https://docs.anthropic.com/en/docs/agents-and-tools/claude-agent-sdk)
- [Anthropic API Reference](https://docs.anthropic.com/en/api)
- Framework: `Process/Prompts/` (17 prompt files)
- Framework: `Process/Anti-Hallucination_Guidelines.md`

---

**End of Proposal**
