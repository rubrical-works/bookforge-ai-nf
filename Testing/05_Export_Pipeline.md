# Test Plan: Export Pipeline

**Last Updated:** 2025-11-29
**Covers Versions:** v0.16.0 - v0.16.1

---

## Prerequisites

- [ ] Initialized book project with content
- [ ] Manuscript compiled (Prompt 7)
- [ ] For PDF/DOCX/EPUB: pandoc installed
- [ ] For PDF (Typst): typst installed

---

## Test Cases

### Markdown Compile (Prompt 7)

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| MDC-01 | Full compile | 1. Run Prompt 7 | Complete_Manuscript.md created | v0.16.0 | [ ] |
| MDC-02 | Front matter order | 1. Check output | Title → Copyright → Dedication → TOC | v0.16.0 | [ ] |
| MDC-03 | Chapter ordering | 1. Check output | Chapters in TOC order | v0.16.0 | [ ] |
| MDC-04 | Back matter | 1. Check output | Bibliography → About Author | v0.16.0 | [ ] |
| MDC-05 | Epigraphs included | 1. Have chapter quotes<br>2. Compile | Quotes appear before chapters | v0.16.0 | [ ] |

### Markdown Export (Prompt 9)

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| MDE-01 | Export markdown | 1. Run Prompt 9 Markdown | File in Exports/ | v0.16.0 | [ ] |
| MDE-02 | Filename format | 1. Check filename | BookTitle_YYYY-MM-DD.md | v0.16.0 | [ ] |

### DOCX Export (Prompt 9)

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| DOC-01 | Basic DOCX export | 1. Run Prompt 9 DOCX | .docx file created | v0.16.0 | [ ] |
| DOC-02 | Reference template | 1. Have reference.docx<br>2. Export | Styles from template applied | v0.16.0 | [ ] |
| DOC-03 | Opens in Word | 1. Open exported file | Opens without errors | v0.16.0 | [ ] |

### PDF Export - Pandoc/LaTeX

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| PDF-01 | Basic PDF export | 1. Run Prompt 9 PDF (LaTeX) | .pdf file created | v0.16.0 | [ ] |
| PDF-02 | Page numbers | 1. Check PDF | Page numbers present | v0.16.0 | [ ] |
| PDF-03 | Table of contents | 1. Check PDF | TOC with page numbers | v0.16.0 | [ ] |

### PDF Export - Typst

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| TYP-01 | Basic Typst export | 1. Run Prompt 9 PDF (Typst) | .pdf file created | v0.16.0 | [ ] |
| TYP-02 | Custom template | 1. Have book-template.typ<br>2. Export | Template styling applied | v0.16.0 | [ ] |
| TYP-03 | Headers/footers | 1. Check PDF | Running headers with book/chapter | v0.16.0 | [ ] |
| TYP-04 | Typography | 1. Check PDF | Proper fonts, justified text | v0.16.0 | [ ] |

### EPUB Export (Prompt 9)

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| EPB-01 | Basic EPUB export | 1. Run Prompt 9 EPUB | .epub file created | v0.16.0 | [ ] |
| EPB-02 | Custom CSS | 1. Have epub-style.css<br>2. Export | Styles applied | v0.16.0 | [ ] |
| EPB-03 | Opens in reader | 1. Open in e-reader | Displays correctly | v0.16.0 | [ ] |
| EPB-04 | Chapter navigation | 1. Check TOC | Chapters navigable | v0.16.0 | [ ] |

### Export Location

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| LOC-01 | Exports directory | 1. Run any export | File in Manuscript/Exports/ | v0.16.0 | [ ] |
| LOC-02 | Directory created | 1. No Exports/ dir<br>2. Run export | Directory created automatically | v0.16.0 | [ ] |

---

## Notes

- PDF via LaTeX requires full LaTeX installation (large)
- Typst is lighter alternative for PDF
- EPUB validation can use epubcheck tool
