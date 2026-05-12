# Session Startup

**Version:** 0.21.1
**Framework:** IDPF-Agile
**Domain Specialist:** Backend-Specialist

---

## Startup Sequence

When starting a new session:

1. **Confirm Date**: State the date from environment info
2. **Charter Detection**: Check project charter status (see Charter Detection below)
3. **Load Specialist**: Read `E:\Projects\idpf-praxis-dist/System-Instructions/Domain/Base/Backend-Specialist.md`
4. **Report Ready**: Confirm initialization with charter status and "Active Role: Backend-Specialist"
5. **Ask**: What would you like to work on?

---

## Charter Detection

At startup, check for project charter:

### Step 1: Check for Opt-Out

```bash
test -f .no-charter
```

**If `.no-charter` exists:** Skip all charter prompting, proceed to specialist loading.

### Step 2: Check for CHARTER.md

```bash
test -f CHARTER.md
```

**If CHARTER.md does not exist:** Go to Step 4 (Extraction/Inception prompt).

### Step 3: Template Detection

Check if CHARTER.md contains unfilled template placeholders:

```
Regex: /{[a-z][a-z0-9-]*}/
```

**If placeholders found (template):** Go to Step 4 (Extraction/Inception prompt).
**If no placeholders (complete):** Display charter summary:

```
📋 Project: {project-name} (from CHARTER.md)
   Vision: {vision summary}
   Current focus: {current focus}
```

Then proceed to specialist loading.

### Step 4: Extraction/Inception Prompt

When no charter or template detected, offer to create one:

**If existing code found:**
```
📁 I found code in this project but no charter files.

A charter helps me understand your project's goals.
Would you like me to:

  1. Analyze the code and draft a charter
  2. Skip for now
  3. Never ask for this project
```

**If no code (new project):**
```
📁 This looks like a new project.

A charter helps me understand your goals.
Would you like me to:

  1. Guide you through charter creation
  2. Skip for now
  3. Never ask for this project
```

### User Response Handling

| Choice | Action |
|--------|--------|
| **Option 1** | Run `/charter` command (Extraction or Inception mode) |
| **Option 2** | Skip, proceed to specialist loading (don't ask again this session) |
| **Option 3** | Create `.no-charter` file, add to `.gitignore`, proceed |

---

## On-Demand Loading

| When Needed | Load From |
|-------------|-----------|
| Framework workflow | `E:\Projects\idpf-praxis-dist/IDPF-Agile/` |
| Domain specialist | `E:\Projects\idpf-praxis-dist/System-Instructions/Domain/Base/{specialist}.md` |
| Skill usage | `.claude/skills/{skill-name}/SKILL.md` |
| Charter management | Run `/charter` command |

---

**End of Session Startup**
