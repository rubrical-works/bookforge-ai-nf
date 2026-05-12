# Architecture: AI-Assisted Nonfiction Authoring Framework

**Last Updated:** 2026-01-05

---

## Overview

A document-centric framework that orchestrates AI-assisted book authoring through structured prompts, change tracking files, and export pipelines. The framework operates entirely on the local filesystem with Git for version control and Pandoc for document conversion.

## Architecture Style

**Style:** Document-Centric Framework (CLI-based)

**Rationale:** Books are fundamentally documents. Rather than building a traditional application with databases and servers, this framework embraces a file-first approach where:
- Content lives in Markdown files (portable, versionable)
- Change instructions live in _chg.md files (auditable, explicit)
- Configuration lives in JSON files (structured, readable)
- AI provides the "runtime" through Claude Code prompts

---

## System Context

```
┌─────────────────────────────────────────────────────────────┐
│              AI-Assisted Nonfiction Framework                │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Process/  │  │ Manuscript/│  │  Scripts/  │            │
│  │  (Prompts) │  │  (Content) │  │  (Automate)│            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
         │                │                │
         ▼                ▼                ▼
   Claude Code          Git             Pandoc
   (AI Runtime)    (Version Control)  (Export Engine)
```

---

## Component Overview

| Component | Responsibility | Technology |
|-----------|----------------|------------|
| Process/Prompts/ | AI interaction patterns, workflows | Markdown prompts |
| Process/Styles/ | Writing style definitions | JSON + Markdown |
| Process/Templates/ | Document structure templates | Markdown |
| Manuscript/ | Book content and metadata | Markdown |
| Scripts/ | Automation utilities | Bash/Batch |
| .config/ | Framework and book configuration | JSON |

---

## Data Flow

The framework follows a unidirectional flow for content changes:

### Primary Data Path (Change Workflow)

1. **User writes instructions** in `Chapter_XX_chg.md`
2. **Claude reads instructions** via Prompt 3
3. **Claude modifies content** in `Chapter_XX.md`
4. **Claude archives instructions** to `Chapter_XX_version_history.md`
5. **Claude commits changes** to Git with descriptive message

### Export Data Path

1. **Claude compiles manuscript** (Prompt 7) → `Drafts/`
2. **User requests export** (Prompt 9)
3. **Pandoc converts** Markdown → DOCX/PDF/EPUB
4. **Output saved** to `Exports/`

---

## External Integrations

| System | Type | Purpose |
|--------|------|---------|
| Claude Code | AI Runtime | Execute prompts, file operations, reasoning |
| Git | Version Control | Track changes, enable rollback, remote backup |
| Pandoc | Document Converter | Export to DOCX, PDF, EPUB |
| GitHub | Issue Tracking | Project management via gh-pmu |
| Claude Desktop | Alternative UI | Conversational authoring (optional) |

---

## Key Architectural Decisions

| Decision | Choice | Alternatives Considered | Rationale |
|----------|--------|------------------------|-----------|
| Content format | Markdown | DOCX, LaTeX | Portable, versionable, universal |
| Change tracking | _chg.md files | Database, inline comments | Explicit, auditable, git-friendly |
| AI interface | Prompts in Markdown | Custom CLI, API wrapper | Leverages Claude Code directly |
| Export engine | Pandoc | Custom converters | Mature, well-maintained, flexible |
| Version control | Git | Custom versioning | Industry standard, distributed |

---

## Directory Structure

```
PROJECT_ROOT/
├── FW_ROOT/                    # Framework (gitignored)
│   ├── Process/
│   │   ├── Prompts/            # 16 core prompts
│   │   ├── Styles/             # Writing style library
│   │   └── Templates/          # Document templates
│   ├── scripts/                # Automation utilities
│   └── VERSION                 # Framework version
├── BOOKS_ROOT/                 # User's books
│   └── [Book-Name]/
│       ├── Manuscript/
│       │   ├── Chapters/       # Chapter content + _chg files
│       │   ├── _TOC_/          # Table of contents
│       │   ├── FrontMatter/    # Title, copyright, preface
│       │   ├── BackMatter/     # Appendices, bibliography
│       │   ├── Quotes/         # Quote management
│       │   ├── Style/          # Book-specific styles
│       │   ├── images/         # Visual assets
│       │   ├── Drafts/         # Compiled manuscripts
│       │   └── Exports/        # Publication formats
│       └── PROJECT_CONTEXT.md  # Book metadata
└── .config/                    # Configuration
    ├── fw-location.json        # Framework path
    ├── settings.json           # User settings
    └── books-registry.json     # Multi-book registry
```

---

## Non-Functional Considerations

| Aspect | Approach |
|--------|----------|
| Scalability | Single-user design; books are independent projects |
| Security | Local filesystem only; no network services |
| Performance | File I/O bound; Pandoc export can be slow for large books |
| Observability | Git history provides complete audit trail |
| Portability | Markdown + Git works on any platform |
| Maintainability | Prompts are human-readable; framework updates via git pull |

---

*See also: Tech-Stack.md, Constraints.md*
