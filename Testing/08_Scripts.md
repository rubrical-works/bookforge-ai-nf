# Test Plan: Shell Scripts

**Last Updated:** 2025-11-29
**Covers Versions:** v0.16.0 - v0.16.1

---

## Prerequisites

- [ ] Git Bash (Windows) or bash (macOS/Linux)
- [ ] jq installed
- [ ] Framework installed

---

## Test Cases

### init.sh

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| INI-01 | Script executes | 1. Run init.sh with args | No syntax errors | v0.16.0 | [ ] |
| INI-02 | Directory structure | 1. Run init.sh | All Manuscript dirs created | v0.16.0 | [ ] |
| INI-03 | Templates copied | 1. Run init.sh | Image_Registry, Copyright, etc. copied | v0.16.0 | [ ] |
| INI-04 | Re-init safe | 1. Run init.sh twice | Existing files preserved | v0.16.0 | [ ] |
| INI-05 | Error on missing FW_ROOT | 1. Omit FW_ROOT param | Error message displayed | v0.16.0 | [ ] |
| INI-06 | Banner shows version | 1. Run init.sh | Version 0.16.1 in banner | v0.16.1 | [ ] |

### detect-tools.sh

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| DET-01 | Script executes | 1. Run detect-tools.sh | No syntax errors | v0.16.0 | [ ] |
| DET-02 | Git detection | 1. Have git installed | Git marked available | v0.16.0 | [ ] |
| DET-03 | jq detection | 1. Have jq installed | jq marked available | v0.16.0 | [ ] |
| DET-04 | Pandoc detection | 1. Have pandoc installed | Pandoc marked available | v0.16.0 | [ ] |
| DET-05 | Typst detection | 1. Have typst installed | Typst marked available | v0.16.0 | [ ] |
| DET-06 | Manifest updated | 1. Run with manifest path | toolsAvailable updated | v0.16.0 | [ ] |
| DET-07 | Windows paths | 1. Run in Git Bash | Windows pandoc/typst paths found | v0.16.0 | [ ] |
| DET-08 | Banner shows version | 1. Run detect-tools.sh | Version 0.16.1 in banner | v0.16.1 | [ ] |

### generate-content.sh

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| GEN-01 | Script executes | 1. Run with init.json | No syntax errors | v0.16.0 | [ ] |
| GEN-02 | Style_Guide created | 1. Run generate-content.sh | Style_Guide.md generated | v0.16.0 | [ ] |
| GEN-03 | TOC created | 1. Run generate-content.sh | TOC.md with chapters | v0.16.0 | [ ] |
| GEN-04 | Chapter files | 1. Run generate-content.sh | Chapter_XX.md files created | v0.16.0 | [ ] |
| GEN-05 | PROJECT_CONTEXT | 1. Run generate-content.sh | PROJECT_CONTEXT.md created | v0.16.0 | [ ] |
| GEN-06 | USAGE_GUIDE | 1. Run generate-content.sh | USAGE_GUIDE.md created | v0.16.0 | [ ] |
| GEN-07 | Banner shows version | 1. Run generate-content.sh | Version 0.16.1 in banner | v0.16.1 | [ ] |

### generate-usage-guide.sh

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| GUG-01 | Script executes | 1. Run with 5 args | No syntax errors | v0.16.0 | [ ] |
| GUG-02 | Placeholders replaced | 1. Check output | {{BOOK_TITLE}} etc. replaced | v0.16.0 | [ ] |
| GUG-03 | Missing args error | 1. Run with < 5 args | Usage message displayed | v0.16.0 | [ ] |

### Bootstrap Scripts

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| BST-01 | configure.bat runs | 1. Double-click on Windows | Claude launched | v0.16.0 | [ ] |
| BST-02 | configure.sh runs | 1. Execute on macOS/Linux | Claude launched | v0.16.0 | [ ] |
| BST-03 | start-authoring.bat | 1. After configure | Claude launched in .config/ | v0.16.0 | [ ] |
| BST-04 | start-authoring.sh | 1. After configure | Claude launched in .config/ | v0.16.0 | [ ] |

---

## Platform Testing

| Script | Windows (Git Bash) | macOS | Linux | Notes |
|--------|-------------------|-------|-------|-------|
| init.sh | [ ] | [ ] | [ ] | |
| detect-tools.sh | [ ] | [ ] | [ ] | Windows path handling |
| generate-content.sh | [ ] | [ ] | [ ] | |
| generate-usage-guide.sh | [ ] | [ ] | [ ] | |
| configure.bat | [ ] | N/A | N/A | Windows only |
| configure.sh | N/A | [ ] | [ ] | Unix only |

---

## Notes

- All .sh scripts should use LF line endings
- Windows testing requires Git Bash
- Scripts should handle paths with spaces (quoted)
