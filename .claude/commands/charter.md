---
version: "v0.21.1"
description: View, create, or manage project charter
argument-hint: "[update|refresh|validate]"
---

# /charter

Context-aware charter command. Shows summary if exists, starts creation if missing.

---

## Usage

| Command | Description |
|---------|-------------|
| `/charter` | Show charter summary (if exists) or start creation (if missing) |
| `/charter update` | Update specific charter sections |
| `/charter refresh` | Re-extract from code, merge with existing |
| `/charter validate` | Check current work against charter scope |

---

## Template Detection

When checking if `CHARTER.md` is a template vs a completed charter:

**Detection Pattern:**
```
Regex: /{[a-z][a-z0-9-]*}/
```

**Common Placeholders:**

| Pattern | Context |
|---------|---------|
| `{project-name}` | Title line |
| `{date}` | Last Updated field |
| `{language}` | Tech Stack table |
| `{framework}` | Tech Stack table |
| `{database}` | Tech Stack table |

**Edge Cases:**

| Scenario | Handling |
|----------|----------|
| ANY placeholder present | Treat as template |
| Literal braces in content | Regex avoids false positives (requires lowercase letter after `{`) |
| Empty sections, no placeholders | Treat as complete (user can elaborate later) |

---

## Workflow

### /charter (No Arguments)

**Step 1: Check for charter**

```bash
test -f CHARTER.md
```

**Step 2: If CHARTER.md exists, check for template placeholders**

Detect if the file is an unfilled template by checking for placeholder patterns:

```
Regex: /{[a-z][a-z0-9-]*}/
```

Common placeholders: `{project-name}`, `{date}`, `{language}`, `{framework}`, `{database}`

```bash
# Template detection (conceptual)
grep -E '\{[a-z][a-z0-9-]*\}' CHARTER.md
```

**If CHARTER.md is a TEMPLATE (has placeholders):**
→ Treat as "no charter" and proceed to Step 3 (Extraction/Inception)

**If CHARTER.md is COMPLETE (no placeholders):**
1. Read and display charter summary
2. Show: Project name, vision, current focus, tech stack
3. Mention: "Run `/charter update` to modify, `/charter validate` to check scope"

**Step 3: If no charter OR template detected**

1. Check if codebase has existing code
2. If has code → Offer extraction mode (analyze existing code)
3. If empty → Offer inception mode (guided questions)
4. Present options to user:
   - Create charter now
   - Skip for now
   - Never ask again (creates `.no-charter`)

---

### Inception Mode (New Projects)

When no code exists and user chooses to create charter, use guided questioning:

#### Essential Questions (Always Asked)

| # | Question | Maps To |
|---|----------|---------|
| 1 | What are you building? (1-2 sentences) | CHARTER.md Vision |
| 2 | What problem does it solve? | Inception/Charter-Details.md Problem Statement |
| 3 | What technology/language? | CHARTER.md Tech Stack, Inception/Tech-Stack.md |
| 4 | What's in scope for v1? (3-5 items) | CHARTER.md In Scope, Inception/Scope-Boundaries.md |

**Questioning Flow:**

```
Question 1: "What are you building? (1-2 sentences describing the project)"
  → User answers
  → Stored for CHARTER.md Vision

Question 2: "What problem does it solve for users?"
  → User answers
  → Stored for Charter-Details.md Problem Statement

Question 3: "What technology/language will you use?"
  → User answers
  → Stored for CHARTER.md Tech Stack

Question 4: "What's in scope for v1? (List 3-5 key features or capabilities)"
  → User answers (can be comma-separated or bulleted)
  → Stored for CHARTER.md In Scope
```

**After essential questions:**
- Check if answers suggest complexity (see Complexity-Triggered Questions)
- If simple project, proceed to artifact generation
- If complex indicators detected, ask follow-up questions

#### Complexity-Triggered Questions

Detect complexity from user's answers and ask relevant follow-ups:

| Trigger (Detected In Answers) | Follow-Up Questions | Maps To |
|-------------------------------|---------------------|---------|
| **Web app** (mentions "web", "frontend", "UI", "browser") | "Will users need to log in?" / "What data will you store?" | Inception/Constraints.md (Auth), Inception/Architecture.md |
| **API service** (mentions "API", "REST", "GraphQL", "service") | "Who will consume this API?" / "Any rate limiting needs?" | Inception/Charter-Details.md (Target Users), Inception/Constraints.md |
| **Multi-user** (mentions "users", "team", "roles", "permissions") | "What access levels are needed?" / "How are permissions managed?" | Inception/Constraints.md (Security) |
| **Data handling** (mentions "data", "database", "storage", "PII") | "Any sensitive/personal data?" / "Compliance requirements (GDPR, HIPAA)?" | Inception/Constraints.md (Compliance) |
| **External integrations** (mentions third-party services) | "What external services?" / "Any constraints from those services?" | Inception/Tech-Stack.md, Inception/Constraints.md |

**Trigger Detection:**
```
For each user answer:
  1. Check for trigger keywords
  2. If triggered, add relevant questions to queue
  3. Skip questions already answered indirectly
  4. Ask 1-2 complexity questions max (avoid overwhelming)
```

**Example Flow:**
```
User answers Q1: "A web app for tracking personal expenses"
  → Triggers: "web app" + "personal" (PII)

Follow-up Q5: "Will users need to log in?"
  → User: "Yes, email/password"
  → Stored for Constraints.md (Auth required)

Follow-up Q6: "Any compliance needs for personal financial data?"
  → User: "No, it's personal use only"
  → Stored for Constraints.md (No compliance)
```

#### Dynamic Follow-Up Generation

Generate context-specific follow-ups based on user's actual answers (NOT from static question banks):

**Generation Rules:**

1. **Analyze baseline answers** - Look for gaps, ambiguities, or implied requirements
2. **Project-type awareness** - CLI vs web vs API vs library have different needs
3. **Depth scaling** - Simple projects get 0-1 follow-ups, complex get 2-4
4. **No redundancy** - Skip questions already answered indirectly

**Follow-Up Categories:**

| Answer Pattern | Dynamic Follow-Up |
|----------------|-------------------|
| Vague scope item ("handle user data") | "What specifically happens with user data?" |
| Implicit constraint ("needs to be fast") | "Any specific performance requirements (response time, throughput)?" |
| Missing boundary ("file uploads") | "Any size limits or file type restrictions?" |
| Unclear priority ("reporting features") | "Is reporting core to v1 or a nice-to-have?" |

**Question Count Scaling:**

| Project Complexity | Total Questions |
|--------------------|-----------------|
| Simple (CLI tool, utility) | 4 essential only |
| Medium (web app, API) | 4-6 questions |
| Complex (multi-service, compliance) | 6-8 questions |

**Generation Prompt:**
```
Based on the user's answers:
1. Vision: "{answer1}"
2. Problem: "{answer2}"
3. Tech: "{answer3}"
4. Scope: "{answer4}"

Generate 0-2 follow-up questions to clarify:
- Ambiguous scope items
- Implied but unstated requirements
- Missing constraints for this project type
- Unclear priorities

Do NOT ask about topics already covered in answers.
```

#### Artifact Generation from Answers

After all questions answered, generate lifecycle artifacts:

**Answer-to-Artifact Mapping:**

| Answer | Primary Artifact | Secondary Artifacts |
|--------|------------------|---------------------|
| What are you building? | CHARTER.md → Vision | Inception/Charter-Details.md → Vision (Full) |
| What problem? | Inception/Charter-Details.md → Problem Statement | CHARTER.md → Vision (context) |
| What technology? | CHARTER.md → Tech Stack | Inception/Tech-Stack.md → Core Stack |
| What's in scope? | CHARTER.md → In Scope | Inception/Scope-Boundaries.md → In Scope |
| Auth requirements? | Inception/Constraints.md → Security | - |
| Data handling? | Inception/Constraints.md → Compliance | - |
| External services? | Inception/Tech-Stack.md → Dependencies | Inception/Constraints.md |

**Generation Process:**

```
1. Collect all answers into structured data

2. Generate CHARTER.md using Templates/Lifecycle/CHARTER.md
   - Fill Vision, Tech Stack, In Scope from answers
   - Set Status: Draft
   - Set Last Updated: today

3. Generate Inception/ artifacts:
   - Charter-Details.md (vision, problem, target users)
   - Tech-Stack.md (language, framework, dependencies)
   - Scope-Boundaries.md (in-scope items)
   - Constraints.md (any NFRs from complexity questions)
   - Architecture.md (basic structure if tech answered)
   - Test-Strategy.md (TBD placeholder)
   - Milestones.md (TBD placeholder)

4. Create Construction/ directories (empty):
   - Construction/Test-Plans/.gitkeep
   - Construction/Design-Decisions/.gitkeep
   - Construction/Sprint-Retros/.gitkeep
   - Construction/Tech-Debt/.gitkeep
   - Construction/README.md (describes subdirectory purposes)

5. Create Transition/ directory (empty templates):
   - Transition/Deployment-Guide.md (TBD template)
   - Transition/Runbook.md (TBD template)
   - Transition/User-Documentation.md (TBD template)

6. Use "TBD" for sections without answers:
   - "TBD - To be determined during development"
   - Highlights what still needs input

7. Commit all artifacts in single commit:
   - "Initialize project charter and lifecycle structure"
```

**Example Output:**

CHARTER.md:
```markdown
# Project Charter: Expense Tracker

**Status:** Draft
**Last Updated:** 2025-01-15

## Vision
A web app for tracking personal expenses to help users understand spending patterns.

## Tech Stack
| Layer | Technology |
|-------|------------|
| Language | TypeScript |
| Framework | Next.js |
| Database | PostgreSQL |

## In Scope (v1)
- Expense entry with categories
- Monthly spending reports
- Budget setting and alerts
```

---

### /charter update

Updates specific sections of the charter.

**Step 1: Read current charter**

```bash
cat CHARTER.md
cat Inception/Charter-Details.md
```

**Step 2: Ask what to update**

Present sections:
- Vision
- Current Focus
- Tech Stack
- Scope (In/Out)
- Milestones

**Step 3: Apply updates**

1. Update `Inception/Charter-Details.md` with changes
2. If vision changes, sync to `CHARTER.md`
3. Update `Last Updated` date
4. Commit changes

---

### /charter refresh

Re-extracts project info from code and merges with existing charter.

**Step 1: Analyze codebase**

Use `extract-prd` skill patterns:
- Parse manifest files (package.json, go.mod, etc.)
- Analyze source structure
- Extract from README.md
- Identify test patterns

**Step 2: Compare with existing**

1. Read current `Inception/` artifacts
2. Identify differences:
   - New dependencies
   - Changed architecture
   - Missing scope items

**Step 3: Present diff**

Show user what changed and ask for confirmation.

**Step 4: Merge changes**

1. Update relevant `Inception/` files
2. Sync `CHARTER.md` if vision/focus changed
3. Commit with "Charter refresh" message

---

### /charter validate

Checks current work against charter scope.

**Step 1: Load charter context**

```bash
cat CHARTER.md
cat Inception/Scope-Boundaries.md
```

**Step 2: Identify current work**

Check:
- Current issue being worked (from conversation)
- Recent commits
- Staged changes

**Step 3: Validate alignment**

Compare work against:
- In-scope items
- Out-of-scope items
- Current focus

**Step 4: Report**

| Finding | Action |
|---------|--------|
| Aligned with scope | Proceed normally |
| Possibly out of scope | Ask user to confirm intent |
| Clearly out of scope | Suggest updating charter or revising work |

---

## Token Budget

| Artifact | Loaded | Tokens |
|----------|--------|--------|
| `CHARTER.md` | Always for /charter | ~150-200 |
| `Inception/Charter-Details.md` | For update/validate | ~1,200-1,500 |
| `Inception/Scope-Boundaries.md` | For validate | ~500-800 |

---

## Related Commands

- `/charter update` - Modify charter sections
- `/charter refresh` - Sync charter with codebase
- `/charter validate` - Check scope alignment

---

**End of /charter Command**
