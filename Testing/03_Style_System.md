# Test Plan: Style System

**Last Updated:** 2025-11-29
**Covers Versions:** v0.16.0 - v0.16.1

---

## Prerequisites

- [ ] Initialized book project with selected style
- [ ] Style_Guide.md exists
- [ ] Style_Overrides.md exists

---

## Test Cases

### Style Selection (Prompt 1)

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| STY-01 | Framework style selection | 1. Run Prompt 1<br>2. Choose framework style | Style_Guide.md contains selected style | v0.16.0 | [ ] |
| STY-02 | Style customization | 1. Run Prompt 1<br>2. Choose customize option | Custom_Styles.md created | v0.16.0 | [ ] |
| STY-03 | Style_Overrides.md created | 1. Complete Prompt 1 | Style_Overrides.md exists with template | v0.16.0 | [ ] |
| STY-04 | Book-level style recorded | 1. Complete Prompt 1 | Style_Overrides.md shows book-level style | v0.16.0 | [ ] |

### Chapter-Level Overrides (Prompt 2, 11)

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| CHO-01 | Add chapter with override | 1. Run Prompt 2<br>2. Select style override | Chapter_XX_style.md created | v0.16.0 | [ ] |
| CHO-02 | Add chapter without override | 1. Run Prompt 2<br>2. Skip style override | No chapter style file; inherits book style | v0.16.0 | [ ] |
| CHO-03 | Add override via Prompt 11 | 1. Existing chapter<br>2. Run Prompt 11 Add Override | Chapter_XX_style.md created retroactively | v0.16.0 | [ ] |
| CHO-04 | Remove override via Prompt 11 | 1. Chapter with override<br>2. Run Prompt 11 Remove | Style file removed; reverts to book style | v0.16.0 | [ ] |
| CHO-05 | Registry updated | 1. Add/remove override | Style_Overrides.md updated correctly | v0.16.0 | [ ] |

### Section-Level Overrides

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| SEC-01 | Section override markers | 1. Add STYLE_OVERRIDE markers<br>2. Run Prompt 11 scan | Section detected in registry | v0.16.0 | [ ] |
| SEC-02 | Prompt 3 respects sections | 1. Have section override<br>2. Run Prompt 3 | Correct style applied to section | v0.16.0 | [ ] |
| SEC-03 | Nested override error | 1. Create nested markers | Warning: nested not supported | v0.16.0 | [ ] |
| SEC-04 | Unclosed marker error | 1. Add marker without END tag | Error: unclosed marker detected | v0.16.0 | [ ] |

### Cascading Inheritance

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| INH-01 | Book → Chapter inheritance | 1. Chapter without override<br>2. Check style used | Uses book-level style | v0.16.0 | [ ] |
| INH-02 | Chapter → Section inheritance | 1. Section without override in overridden chapter<br>2. Check style | Uses chapter override | v0.16.0 | [ ] |
| INH-03 | Full override chain | 1. Book + Chapter + Section overrides<br>2. Verify each level | Each level uses correct style | v0.16.0 | [ ] |

### Style Validation (Prompt 11)

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| VAL-01 | Validate registry | 1. Run Prompt 11 Validate | Registry matches actual files | v0.16.0 | [ ] |
| VAL-02 | Undefined style error | 1. Reference non-existent style | Error: style not found | v0.16.0 | [ ] |
| VAL-03 | Missing file error | 1. Registry entry without file | Error: file not found | v0.16.0 | [ ] |
| VAL-04 | Orphaned file warning | 1. Style file without registry entry | Warning: orphaned file | v0.16.0 | [ ] |

### 30% Threshold Warning

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| THR-01 | Under threshold | 1. 2/10 chapters overridden (20%) | No warning | v0.16.0 | [ ] |
| THR-02 | Over threshold | 1. 4/10 chapters overridden (40%) | Warning: exceeds 30% threshold | v0.16.0 | [ ] |

### Style Transitions

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| TRN-01 | Chapter transition detection | 1. Adjacent chapters with different styles<br>2. Run analysis | Transition warning issued | v0.16.0 | [ ] |
| TRN-02 | Section transition detection | 1. Section overrides within chapter<br>2. Run analysis | Transition points identified | v0.16.0 | [ ] |

---

## Notes

- Style system tests require understanding of the hierarchical override model
- Registry validation is critical for maintaining consistency
