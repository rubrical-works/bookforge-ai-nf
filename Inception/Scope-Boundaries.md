# Scope Boundaries: AI-Assisted Nonfiction Authoring Framework

**Last Updated:** 2026-01-05

---

## In Scope (Current Release)

### Features

- [x] **16 Core Prompts:** Complete authoring workflow from initialization to export
- [x] **Change Tracking:** _chg.md file system with version history
- [x] **Style System:** 19 curated styles + custom style support
- [x] **Export Formats:** DOCX, PDF, EPUB via Pandoc
- [x] **Git Integration:** Automatic commits, tags, remote backup
- [x] **Quote Management:** Web search verification, attribution tracking
- [x] **Visual Content:** Text-based placeholders, image management
- [x] **Multi-Book Support:** Book registry, project switching
- [x] **Anti-Hallucination:** Guidelines preventing AI fabrication

### Capabilities

| Capability | Priority | Status |
|------------|----------|--------|
| Initialize book project | P0 | Done |
| Add/manage chapters | P0 | Done |
| Change tracking (automated) | P0 | Done |
| Change tracking (interactive) | P0 | Done |
| Consistency checking | P1 | Done |
| Manuscript compilation | P0 | Done |
| Multi-format export | P0 | Done |
| Progress dashboard | P1 | Done |
| Style management | P1 | Done |
| Git operations | P1 | Done |
| AI detection analysis | P2 | Done |
| Citation management | P1 | Done |
| Visual content suggestions | P2 | Done |
| Image management | P1 | Done |
| Multi-book support | P1 | Done |

---

## Out of Scope

### Explicitly Excluded

| Item | Reason | Future Consideration? |
|------|--------|----------------------|
| Real-time collaboration | Complexity, single-author focus | Maybe |
| Cloud storage integration | Git remotes sufficient | No |
| AI training/fine-tuning | Out of project scope | No |
| Direct platform publishing | External service complexity | Maybe |
| Fiction-specific features | Nonfiction focus | Maybe (separate framework) |

### Deferred to Future Releases

| Item | Target Release | Dependencies |
|------|----------------|--------------|
| Enhanced citation formats | v0.18+ | Citation management refinement |
| Advanced PDF templates | v0.18+ | LaTeX template development |
| Localization | v1.0+ | Community contribution |

---

## User Workflows

### Primary Workflow

**Name:** Daily Writing Session

1. User starts Claude Code session (`/fw-init`)
2. System loads book context and displays dashboard
3. User writes revision instructions in _chg.md OR uses interactive mode
4. System executes changes, archives instructions, commits to git
5. User reviews changes and continues or ends session

### Secondary Workflows

| Workflow | Description | Priority |
|----------|-------------|----------|
| Weekly Review | Consistency check, compile manuscript | P1 |
| Milestone Workflow | Full QA, AI detection, tag release | P1 |
| Export Workflow | Generate DOCX/PDF/EPUB for review | P1 |
| Style Customization | Modify writing style at book/chapter level | P2 |
| Quote Verification | Find and verify citations | P2 |

---

## Boundaries with External Systems

| System | We Handle | They Handle |
|--------|-----------|-------------|
| Claude Code | Prompt execution, file operations | AI reasoning, conversation |
| Git | Commits, tags, branches | Remote hosting, collaboration |
| Pandoc | Export commands, templates | Document conversion |
| GitHub | Issues via gh-pmu | Repository hosting, CI/CD |

---

## Scope Change Process

Changes to scope require:
1. Update this document (Scope-Boundaries.md)
2. Update CHARTER.md if vision/focus changes
3. Create GitHub issue for tracking
4. Update CHANGELOG.md when implemented

---

*See also: Charter-Details.md, Milestones.md*
