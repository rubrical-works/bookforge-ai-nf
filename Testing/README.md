# Framework Testing

**Purpose:** Test plans for validating framework functionality before releases.
**Scope:** Framework developers only (NOT deployed to -dist)

---

## Test Plan Structure

Each test plan uses a consistent table-driven format:

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| TC-01 | Description | 1. Step one<br>2. Step two | Expected result | v0.16.1 | [ ] |

**Status:**
- `[ ]` - Not tested
- `[x]` - Passed
- `[!]` - Failed (add notes)

---

## Test Plans

| # | File | Coverage |
|---|------|----------|
| 01 | `01_Initial_Configuration.md` | /fw-init, configure scripts, project setup |
| 02 | `02_Core_Prompts.md` | Prompts 1-9 basic functionality |
| 03 | `03_Style_System.md` | Writing styles, hierarchical overrides, customization |
| 04 | `04_Quote_Management.md` | Quote tracking, verification, Chapter_Quotes.md |
| 05 | `05_Export_Pipeline.md` | Markdown compile, PDF, DOCX, EPUB export |
| 06 | `06_Multi_Book.md` | Multi-book setup, switching, registry |
| 07 | `07_Migration.md` | Version migration paths |
| 08 | `08_Scripts.md` | Shell scripts (init.sh, detect-tools.sh, etc.) |

---

## Testing Workflow

### Before Release

1. Review commits since last release for testable changes
2. Add new test cases with the release version number
3. Run relevant test plans
4. Mark deprecated test cases if features removed
5. Document any failures in issue tracker

### Running Tests

1. Start with a clean environment (new book project)
2. Execute test cases in order within each plan
3. Mark pass/fail status
4. Add notes for any failures or observations
5. Update "Covers Versions" range after testing

---

## Adding Test Cases

When adding a feature or fixing a bug:

1. Identify the appropriate test plan file
2. Add a new row to the relevant table
3. Include the version number where the test was added
4. Ensure steps are reproducible

**Example:**
```markdown
| TC-15 | Verify PDF export with custom template | 1. Configure Typst template<br>2. Run Prompt 9 PDF export | PDF generated with template styling | v0.16.1 | [ ] |
```

---

## Version Tracking

Each test plan header includes:
- **Last Updated:** Date of last modification
- **Covers Versions:** Range of versions this plan covers

When preparing a release, update "Covers Versions" to include the new version.

---

**Framework Version:** 0.16.1
**Last Updated:** 2025-11-29
