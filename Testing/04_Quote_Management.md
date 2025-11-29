# Test Plan: Quote Management

**Last Updated:** 2025-11-29
**Covers Versions:** v0.16.0 - v0.16.1

---

## Prerequisites

- [ ] Initialized book project
- [ ] Chapter_Quotes.md exists
- [ ] Chapter_Quotes_chg.md exists

---

## Test Cases

### Quote File Creation

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| QFC-01 | Initial creation | 1. Run Prompt 1 | Chapter_Quotes.md created with placeholders | v0.16.0 | [ ] |
| QFC-02 | Chapter placeholders | 1. Complete Prompt 1 | One entry per chapter | v0.16.0 | [ ] |
| QFC-03 | Change tracking file | 1. Complete Prompt 1 | Chapter_Quotes_chg.md created | v0.16.0 | [ ] |

### Quote Entry Management

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| QEM-01 | Add quote | 1. Edit Chapter_Quotes.md<br>2. Add quote text | Quote saved correctly | v0.16.0 | [ ] |
| QEM-02 | Add attribution | 1. Add author/source | Attribution displayed | v0.16.0 | [ ] |
| QEM-03 | Status tracking | 1. Update status field | Status reflects: Pending/Verified/Needs Citation | v0.16.0 | [ ] |

### Quote Verification

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| QVF-01 | Mark as verified | 1. Change status to Verified | ✓ symbol displayed | v0.16.0 | [ ] |
| QVF-02 | Mark needs citation | 1. Change status to Needs Citation | ⚠ symbol displayed | v0.16.0 | [ ] |
| QVF-03 | Mark pending | 1. Change status to Pending | ⏳ symbol displayed | v0.16.0 | [ ] |

### Quote Integration

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| QIN-01 | Export includes quotes | 1. Run Prompt 9 | Quotes appear as epigraphs | v0.16.0 | [ ] |
| QIN-02 | Compile includes quotes | 1. Run Prompt 7 | Quotes in compiled manuscript | v0.16.0 | [ ] |

### New Chapter Quotes

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| NCQ-01 | Add chapter adds quote | 1. Run Prompt 2 | New quote placeholder added | v0.16.0 | [ ] |
| NCQ-02 | Quote ordering | 1. Add chapters | Quotes in chapter order | v0.16.0 | [ ] |

---

## Notes

- Quote verification is manual; framework tracks status but doesn't verify sources
- Users should verify quotes independently using Citation Finder (Prompt 14)
