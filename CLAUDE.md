# AI-Assisted Nonfiction Authoring Framework - Development Repository

**Framework Version:** 0.16.1
**Repository:** https://github.com/scooter-indie/author-nonfiction (development)
**Distribution:** https://github.com/scooter-indie/author-nonfiction-dist (user releases)

---

## FIRST ACTION - Read Anti-Hallucination Guidelines

**At session startup, immediately read:** `Process/Anti-Hallucination_Guidelines.md`

This is mandatory before any other work.

---

## GitHub Workflow (MANDATORY)

**Triggers - Create issue IMMEDIATELY, then WAIT:**
- "finding:" / "bug:" / "issue:" → Create issue with `finding` label
- "enhancement:" / "can you add" → Create issue with `enhancement` label
- "proposal:" → Create Proposal/ doc + issue

**Flow:** Create issue → WAIT for "work on it" → Fix → Commit with #issue → WAIT for "Done" → Close

**Never** fix bugs without creating an issue first.

See `/gh-workflow` for detailed procedures.

---

## Repository Structure

```
author-nonfiction/           # Development repo (THIS REPO)
├── Process/                 # Framework files (deployed to dist)
│   ├── Prompts/            # 17 prompts + references
│   ├── Styles/             # 19 writing styles
│   ├── Templates/          # All templates including .config/
│   ├── _COMMON/            # Shared modules
│   └── migrations/         # Version migration guides
├── scripts/                 # Shell scripts (deployed to dist)
├── .claude/                 # Claude Code config
│   └── commands/           # Slash commands (gh-workflow.md is maintainer-only)
├── Testing/                 # Test plans (NOT deployed)
├── Documentation/           # Maintainer docs (NOT deployed)
├── Proposal/               # Design proposals (NOT deployed)
│   └── Implemented/        # Completed proposals
├── .github/workflows/      # CI/CD (NOT deployed)
└── PREPARE_RELEASE.md      # Release checklist (NOT deployed)
```

---

## Key Commands

- `/fw-init` - Load framework context (for testing prompts)
- `/gh-workflow` - GitHub issue management (maintainer)
- `PREPARE_RELEASE.md X.X.X` - Prepare a release

---

## Release Process

1. Update version in all files via `PREPARE_RELEASE.md`
2. Create tag: `git tag -a vX.X.X -m "Release vX.X.X"`
3. Push tag: `git push origin vX.X.X`
4. Create GitHub release → triggers deploy-dist.yml
5. Dist repo auto-updated via PR

---

## Links

- **Issues:** https://github.com/scooter-indie/author-nonfiction/issues
- **Project Board:** https://github.com/users/scooter-indie/projects/9/views/1
- **Releases:** https://github.com/scooter-indie/author-nonfiction/releases
- **Dist Repo:** https://github.com/scooter-indie/author-nonfiction-dist

---

**Framework Version:** 0.16.1
**Last Updated:** 2025-11-28
