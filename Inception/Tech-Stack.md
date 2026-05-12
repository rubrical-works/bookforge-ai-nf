# Tech Stack: AI-Assisted Nonfiction Authoring Framework

**Last Updated:** 2026-01-05

---

## Core Stack

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Content Format | Markdown | CommonMark | Universal, versionable, convertible |
| Automation | Bash/Batch | N/A | Cross-platform, no dependencies |
| AI Interface | Claude Code | Latest | File access, git integration, reasoning |
| Version Control | Git | 2.x+ | Industry standard, distributed |
| Export Engine | Pandoc | 3.x+ | Universal document converter |

---

## Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Package Manager | N/A | No package dependencies |
| Build Tool | Shell scripts | Cross-platform automation |
| Linter | N/A | Markdown validation via AI |
| Formatter | N/A | Style guide enforcement via AI |
| Test Framework | Manual | Prompt-based workflow testing |

---

## Infrastructure

| Component | Technology | Environment |
|-----------|------------|-------------|
| Hosting | Local filesystem | User's machine |
| CI/CD | GitHub Actions | Release automation |
| Container | N/A | No containerization needed |
| Orchestration | N/A | Single-user tool |

---

## Key Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Git | 2.x+ | Version control, change history |
| Pandoc | 3.x+ | DOCX/PDF/EPUB export |
| LaTeX (optional) | Any | Advanced PDF formatting |
| Claude Code | Latest | AI-assisted authoring |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| GitHub CLI (gh) | Latest | Release management, issues |
| gh-pmu extension | Latest | Project management integration |

---

## Version Constraints

| Dependency | Constraint | Reason |
|------------|------------|--------|
| Pandoc | 3.x preferred | EPUB3 support, improved templates |
| Git | 2.20+ | Partial clone support |
| Claude Code | Latest | Latest prompt capabilities |

---

## Upgrade Plan

| Dependency | Current | Target | Timeline |
|------------|---------|--------|----------|
| Framework | 0.16.1 | 0.17.0 | Next release |
| IDPF integration | 0.20.3 | Latest | Ongoing |

---

*See also: Architecture.md, Constraints.md*
