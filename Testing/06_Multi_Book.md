# Test Plan: Multi-Book Support

**Last Updated:** 2025-11-29
**Covers Versions:** v0.16.0 - v0.16.1

---

## Prerequisites

- [ ] Configured PROJECT_ROOT with multi-book architecture
- [ ] At least 2 books created
- [ ] books-registry.json exists

---

## Test Cases

### Book Registration

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| REG-01 | First book registered | 1. Create first book | Entry in books-registry.json | v0.16.0 | [ ] |
| REG-02 | Second book registered | 1. Create second book | Both books in registry | v0.16.0 | [ ] |
| REG-03 | Active book set | 1. Create book | activeBook field updated | v0.16.0 | [ ] |
| REG-04 | Registry path format | 1. Check registry | Paths relative to BOOKS_ROOT | v0.16.0 | [ ] |

### Book Switching (/switch-book)

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| SWI-01 | List available books | 1. Run /switch-book | All registered books shown | v0.16.0 | [ ] |
| SWI-02 | Switch to different book | 1. Select different book | Context updated to new book | v0.16.0 | [ ] |
| SWI-03 | Active book updated | 1. Switch book | activeBook in registry updated | v0.16.0 | [ ] |
| SWI-04 | Invalid book name | 1. Try non-existent book | Error: book not found | v0.16.0 | [ ] |

### Book Management (/manage-book)

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| MNG-01 | Archive book | 1. Run /manage-book archive | Book moved to Archive/ | v0.16.0 | [ ] |
| MNG-02 | Registry updated on archive | 1. Archive book | status: "archived" in registry | v0.16.0 | [ ] |
| MNG-03 | Restore archived book | 1. Run /manage-book restore | Book moved back to BOOKS_ROOT | v0.16.0 | [ ] |
| MNG-04 | Delete book | 1. Run /manage-book delete | Book removed (with confirmation) | v0.16.0 | [ ] |
| MNG-05 | Cannot delete active | 1. Try delete active book | Error: switch first | v0.16.0 | [ ] |

### Session Context

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| CTX-01 | Context persists | 1. Switch book<br>2. Run /fw-init | Correct book loaded | v0.16.0 | [ ] |
| CTX-02 | Prompts use active book | 1. Run any prompt | Operations on active book only | v0.16.0 | [ ] |
| CTX-03 | BOOK_PATH correct | 1. Check paths in session | Points to active book directory | v0.16.0 | [ ] |

### Settings

| ID | Test Case | Steps | Expected | Version | Pass |
|----|-----------|-------|----------|---------|------|
| SET-01 | Settings file exists | 1. Check .config/ | settings.json present | v0.16.0 | [ ] |
| SET-02 | BOOKS_ROOT path | 1. Check settings.json | booksRoot path correct | v0.16.0 | [ ] |
| SET-03 | Custom BOOKS_ROOT name | 1. Use custom name during configure | Custom name used throughout | v0.16.1 | [ ] |

---

## Notes

- Multi-book is the only supported architecture as of v0.15.4
- Legacy single-book mode has been removed
- Archive/ directory created automatically when first book archived
