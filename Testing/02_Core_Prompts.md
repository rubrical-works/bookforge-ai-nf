# Test Plan: Core Prompts

**Last Updated:** 2025-11-29
**Covers Versions:** v0.16.0 - v0.16.1

---

## Prerequisites

- [ ] Initialized book project
- [ ] /fw-init completed
- [ ] Active book selected

---

## Test Cases

### Prompt 1: Initialize Project

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| P1-01 | New book creation | 1. Run Prompt 1<br>2. Provide book details | init.json created, directories created | v0.16.0 | [ ] |
| P1-02 | Style selection | 1. Run Prompt 1<br>2. Select writing style | Style_Guide.md created with selected style | v0.16.0 | [ ] |
| P1-03 | Chapter structure | 1. Run Prompt 1<br>2. Define chapters | TOC.md and chapter directories created | v0.16.0 | [ ] |
| P1-04 | Manifest created | 1. Complete Prompt 1 | .config/manifest.json populated | v0.16.0 | [ ] |
| P1-05 | PROJECT_CONTEXT.md | 1. Complete Prompt 1 | PROJECT_CONTEXT.md created with book info | v0.16.0 | [ ] |

### Prompt 2: Add Chapter

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| P2-01 | Add single chapter | 1. Run Prompt 2<br>2. Provide chapter title | Chapter directory and files created | v0.16.0 | [ ] |
| P2-02 | TOC updated | 1. Add chapter | TOC.md includes new chapter | v0.16.0 | [ ] |
| P2-03 | Chapter numbering | 1. Add chapter after existing | Correct chapter number assigned | v0.16.0 | [ ] |
| P2-04 | Chapter_Quotes updated | 1. Add chapter | Quote placeholder added | v0.16.0 | [ ] |

### Prompt 3: Change by Chg

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| P3-01 | Basic modification | 1. Add instructions to _chg file<br>2. Run Prompt 3 | Chapter modified per instructions | v0.16.0 | [ ] |
| P3-02 | Version incremented | 1. Run Prompt 3 | _chg version incremented | v0.16.0 | [ ] |
| P3-03 | Multiple changes | 1. Multiple instructions<br>2. Run Prompt 3 | All changes applied | v0.16.0 | [ ] |
| P3-04 | Style respected | 1. Have style override<br>2. Run Prompt 3 | Changes follow style guide | v0.16.0 | [ ] |

### Prompt 4: Interactive Change

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| P4-01 | Conversational edit | 1. Request change conversationally<br>2. Iterate | Changes made through dialogue | v0.14.0 | [ ] |
| P4-02 | Undo request | 1. Make change<br>2. Request undo | Previous version restored | v0.14.0 | [ ] |

### Prompt 5: Scan for User Edits

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| P5-01 | Detect manual edits | 1. Edit chapter manually<br>2. Run Prompt 5 | Changes detected and reported | v0.16.0 | [ ] |
| P5-02 | No changes | 1. No manual edits<br>2. Run Prompt 5 | Reports no changes detected | v0.16.0 | [ ] |

### Prompt 6: Integrate Inbox

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| P6-01 | Process inbox file | 1. Add file to Inbox/<br>2. Run Prompt 6 | Content integrated into chapters | v0.16.0 | [ ] |
| P6-02 | Lock detection | 1. Have locked chapter<br>2. Run Prompt 6 | Locked chapters skipped with warning | v0.16.0 | [ ] |

### Prompt 7: Compile Manuscript

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| P7-01 | Full compile | 1. Run Prompt 7 | Complete_Manuscript.md created | v0.16.0 | [ ] |
| P7-02 | Front matter included | 1. Run Prompt 7 | Title page, copyright included | v0.16.0 | [ ] |
| P7-03 | Chapter order | 1. Run Prompt 7 | Chapters in TOC order | v0.16.0 | [ ] |

### Prompt 8: Consistency Checker

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| P8-01 | Run analysis | 1. Run Prompt 8 | Consistency report generated | v0.16.0 | [ ] |
| P8-02 | Style violations | 1. Have inconsistent content<br>2. Run Prompt 8 | Violations identified | v0.16.0 | [ ] |

### Prompt 9: Export

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| P9-01 | Markdown export | 1. Run Prompt 9 Markdown | Markdown file in Exports/ | v0.16.0 | [ ] |
| P9-02 | DOCX export | 1. Have pandoc<br>2. Run Prompt 9 DOCX | DOCX file created | v0.16.0 | [ ] |
| P9-03 | PDF export (Typst) | 1. Have typst<br>2. Run Prompt 9 PDF | PDF file created | v0.16.0 | [ ] |
| P9-04 | EPUB export | 1. Have pandoc<br>2. Run Prompt 9 EPUB | EPUB file created | v0.16.0 | [ ] |

---

## Notes

- Core prompts should work in both Claude Code CLI and Claude Desktop (with MCP)
- Export tests require respective tools installed
