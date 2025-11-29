# Test Plan: Initial Configuration

**Last Updated:** 2025-11-29
**Covers Versions:** v0.16.0 - v0.16.1

---

## Prerequisites

- [ ] Clean environment (no existing PROJECT_ROOT)
- [ ] Git installed
- [ ] jq installed
- [ ] Claude Code CLI available

---

## Test Cases

### Configure Script Tests

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| CFG-01 | configure.bat launches Claude | 1. Clone dist repo<br>2. Run configure.bat | Claude opens with configure.md | v0.16.0 | [ ] |
| CFG-02 | configure.sh launches Claude | 1. Clone dist repo<br>2. Run configure.sh | Claude opens with configure.md | v0.16.0 | [ ] |
| CFG-03 | PROJECT_ROOT created | 1. Run configure<br>2. Provide path | Directory created with correct structure | v0.16.0 | [ ] |
| CFG-04 | FW_ROOT copied | 1. Complete configure | FW_ROOT/ contains framework files | v0.16.0 | [ ] |
| CFG-05 | .config/ created | 1. Complete configure | .config/ with fw-location.json, settings.json | v0.16.0 | [ ] |
| CFG-06 | BOOKS_ROOT created | 1. Complete configure | BOOKS_ROOT/ (or custom name) exists | v0.16.1 | [ ] |
| CFG-07 | Books dir name prompt | 1. Run configure<br>2. Accept default | "My-Books" directory created | v0.16.1 | [ ] |
| CFG-08 | Custom books dir name | 1. Run configure<br>2. Enter custom name | Custom directory created | v0.16.1 | [ ] |
| CFG-09 | Auto-chain to start-authoring | 1. Complete configure<br>2. Type /exit | start-authoring script launches | v0.16.0 | [ ] |

### /fw-init Tests

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| FWI-01 | Framework loaded | 1. Start session in .config/<br>2. Run /fw-init | FRAMEWORK_CORE.md loaded | v0.16.0 | [ ] |
| FWI-02 | Anti-Hallucination loaded | 1. Run /fw-init | Guidelines acknowledged | v0.16.0 | [ ] |
| FWI-03 | FW_ROOT detected | 1. Run /fw-init | FW_ROOT path resolved from fw-location.json | v0.16.0 | [ ] |
| FWI-04 | Active book detected | 1. Have active book<br>2. Run /fw-init | Book name and path displayed | v0.16.0 | [ ] |
| FWI-05 | No active book | 1. Fresh setup, no book<br>2. Run /fw-init | Prompts to create first book | v0.16.0 | [ ] |
| FWI-06 | Version displayed | 1. Run /fw-init | Framework version shown | v0.16.0 | [ ] |

### Tool Detection Tests

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| TDT-01 | Git detected | 1. Run detect-tools.sh | Git version shown, marked available | v0.16.0 | [ ] |
| TDT-02 | jq detected | 1. Run detect-tools.sh | jq version shown, marked available | v0.16.0 | [ ] |
| TDT-03 | Pandoc detected (if installed) | 1. Have pandoc installed<br>2. Run detect-tools.sh | Pandoc version shown | v0.16.0 | [ ] |
| TDT-04 | Typst detected (if installed) | 1. Have typst installed<br>2. Run detect-tools.sh | Typst version shown | v0.16.0 | [ ] |
| TDT-05 | Manifest updated | 1. Run detect-tools.sh<br>2. Check manifest.json | toolsAvailable updated | v0.16.0 | [ ] |

---

## Notes

- Tests should be run on both Windows (Git Bash) and macOS/Linux
- Configure scripts require user interaction; can't be fully automated
