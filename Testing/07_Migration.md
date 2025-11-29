# Test Plan: Migration

**Last Updated:** 2025-11-29
**Covers Versions:** v0.16.0 - v0.16.1

---

## Prerequisites

- [ ] Previous version installation available for testing
- [ ] Understanding of migration paths

---

## Test Cases

### Version Detection

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| VER-01 | VERSION file read | 1. Run /fw-init | Framework version detected | v0.16.0 | [ ] |
| VER-02 | Update check | 1. Run /fw-init | Checks against latest version | v0.16.0 | [ ] |
| VER-03 | Update available notice | 1. Have older version<br>2. Run /fw-init | Update notice displayed | v0.16.0 | [ ] |

### Migration Guides

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| MIG-01 | Guide exists | 1. Check Process/migrations/ | README.md explains process | v0.16.0 | [ ] |
| MIG-02 | Version-specific guides | 1. Check migrations/ | migrate-X.X.X-to-Y.Y.Y.md files | v0.16.0 | [ ] |

### Framework Update

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| UPD-01 | Clone new version | 1. Pull latest dist | New files available | v0.16.0 | [ ] |
| UPD-02 | FW_ROOT update | 1. Replace FW_ROOT contents | Framework updated | v0.16.0 | [ ] |
| UPD-03 | User files preserved | 1. Update framework | BOOKS_ROOT unchanged | v0.16.0 | [ ] |
| UPD-04 | Config preserved | 1. Update framework | .config/ files unchanged | v0.16.0 | [ ] |

### Book Migration

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| BMG-01 | migrations.json tracked | 1. Check .config/ | migrations.json lists applied migrations | v0.16.0 | [ ] |
| BMG-02 | Migration not reapplied | 1. Apply migration<br>2. Rerun | Migration skipped (already applied) | v0.16.0 | [ ] |

---

## Migration Paths Tested

| From | To | Status | Notes |
|------|-----|--------|-------|
| v0.14.5 | v0.15.0 | [ ] | Legacy to multi-book |
| v0.15.x | v0.16.0 | [ ] | PROJECT_ROOT architecture |
| v0.16.0 | v0.16.1 | [ ] | Patch release (no migration) |

---

## Notes

- Patch releases (x.x.N) typically don't require migrations
- Major structural changes require specific migration guides
- Always backup before migrating
