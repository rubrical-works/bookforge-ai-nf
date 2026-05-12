---
version: "v0.20.3"
description: Change domain specialist for this project
argument-hint: [specialist-name] (optional)
---

# /change-domain-expert

Change the active domain specialist for this project.

---

## Prerequisites

- Framework v0.17.0+ installed
- `framework-config.json` exists in project root

---

## Available Base Experts

| # | Specialist | Focus Area |
|---|------------|------------|
| 1 | Full-Stack-Developer | End-to-end web development |
| 2 | Backend-Specialist | Server-side systems and APIs |
| 3 | Frontend-Specialist | UI/UX and client-side development |
| 4 | Mobile-Specialist | iOS, Android, cross-platform apps |
| 5 | Desktop-Application-Developer | Native desktop applications |
| 6 | Embedded-Systems-Engineer | Hardware-software integration |
| 7 | Game-Developer | Game engines and graphics |
| 8 | ML-Engineer | Machine learning and AI systems |
| 9 | Data-Engineer | Data pipelines and warehousing |
| 10 | Cloud-Solutions-Architect | Cloud infrastructure design |
| 11 | SRE-Specialist | Reliability and operations |
| 12 | Systems-Programmer-Specialist | Low-level systems programming |

---

## Workflow

### Step 1: Read Current Configuration

```bash
cat framework-config.json
```

Extract `frameworkPath` and current `projectType.domainSpecialist`.

### Step 2: Select New Specialist

**If argument provided:** Use the specified specialist name.

**If no argument:** Present the numbered list above and ask user to select (1-12) or type the specialist name.

### Step 3: Validate Selection

The specialist must be one of the 12 Base Experts listed above.
If invalid, report error and stop.

### Step 4: Update framework-config.json

Read the file, update `projectType.domainSpecialist` to the new value, and write back:

```bash
cat framework-config.json
```

Update the JSON object, setting `projectType.domainSpecialist` to the new specialist name.

### Step 5: Update CLAUDE.md

Find and replace the `**Domain Specialist:**` line:

```
**Domain Specialist:** [new-specialist]
```

Also update the On-Demand Documentation table row for domain specialist to reflect the new path.

### Step 6: Update .claude/rules/03-startup.md

Update three elements:
1. The `**Domain Specialist:**` metadata line
2. The specialist file path in the startup sequence: `Read \`{frameworkPath}/System-Instructions/Domain/Base/{new-specialist}.md\``
3. The "Active Role" confirmation message

### Step 7: Load New Specialist

Read the new domain specialist file to activate it:

```bash
cat "{frameworkPath}/System-Instructions/Domain/Base/{new-specialist}.md"
```

### Step 8: Report Completion

```
Domain specialist changed successfully.

Previous: {old-specialist}
New: {new-specialist}

The new specialist profile has been loaded and is now active.
```

---

## Example Usage

```
/change-domain-expert
→ Displays numbered list, prompts for selection

/change-domain-expert Backend-Specialist
→ Directly switches to Backend-Specialist

/change-domain-expert 2
→ Switches to specialist #2 (Backend-Specialist)
```

---

**End of Change Domain Expert**
