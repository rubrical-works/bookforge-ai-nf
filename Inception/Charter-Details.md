# Project Charter Details: AI-Assisted Nonfiction Authoring Framework

**Generated:** 2026-01-05
**Last Updated:** 2026-01-05

---

## 1. Vision (Full)

### Problem Statement

Writing a professional nonfiction book is a complex, multi-month process requiring organization, consistency, and rigorous fact-checking. Authors struggle with maintaining coherent structure, tracking revisions, ensuring factual accuracy, and managing the technical aspects of manuscript preparation and export.

### Target Users

- **Nonfiction authors** writing books on any subject
- **Technical writers** creating comprehensive documentation
- **Subject matter experts** authoring professional guides
- **Self-publishers** needing structured workflows and export capabilities

### Value Proposition

Unlike general-purpose AI writing tools, this framework provides:
- **Structured authoring process** with change tracking and version history
- **Anti-hallucination guidelines** ensuring AI maintains factual accuracy
- **Professional export formats** (DOCX, PDF, EPUB) ready for publication
- **Complete version control** via Git integration
- **Hierarchical style system** supporting book/chapter/section customization

### Success Criteria

- Authors can complete a full nonfiction book using the framework
- Change tracking provides full audit trail of all revisions
- Export formats meet professional publishing standards
- Anti-hallucination guidelines prevent AI fabrication of facts/quotes
- Framework is maintainable and extensible

---

## 2. Scope (Full)

### In Scope (Current Release)

- [x] 16 conversational prompts covering full authoring workflow
- [x] Change tracking system with _chg.md files
- [x] 19 curated writing styles across 5 categories
- [x] Export to DOCX, PDF, EPUB formats
- [x] Git version control integration
- [x] Anti-hallucination guidelines
- [x] Quote management with verification status
- [x] Visual content management (text-based placeholders, images)
- [x] Multi-book support with book registry
- [x] Claude Code and Claude Desktop integration

### Out of Scope

- Real-time collaboration (multi-user editing)
- Cloud storage integration (beyond Git remotes)
- AI training or fine-tuning
- Direct publishing platform integration (Amazon KDP, etc.)

### Key User Workflows

1. **Daily Writing Session:** Start session, review dashboard, write/revise using Prompt 3/4, commit changes
2. **Weekly Review:** Check progress, run consistency check, compile manuscript, fix issues
3. **Milestone Workflow:** Full consistency check, AI detection analysis, compile final, tag release

---

## 3. Technical Approach (Full)

### Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Content Format | Markdown | Universal, version-control friendly, easy to convert |
| Automation | Bash/Batch scripts | Cross-platform, no runtime dependencies |
| AI Integration | Claude Code | Advanced reasoning, file access, git integration |
| Version Control | Git | Industry standard, distributed, full history |
| Export | Pandoc | Universal document converter, supports all targets |

### Architecture Style

**Document-Centric Framework** - Not a traditional application, but a structured collection of prompts, templates, scripts, and conventions that guide AI-assisted authoring.

### Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Content format | Markdown | Portable, versionable, convertible to any format |
| Change tracking | _chg.md files | Explicit instructions, auditable, git-friendly |
| AI interface | Claude Code prompts | Conversational, contextual, powerful file access |
| Style system | Hierarchical JSON | Supports book/chapter/section overrides |

### Technical Risks

| Risk | Probability | Mitigation |
|------|-------------|------------|
| AI model changes | Medium | Anti-hallucination guidelines, version-specific testing |
| Pandoc compatibility | Low | Pin Pandoc versions, test export formats |
| Cross-platform issues | Low | Test on Windows, macOS, Linux |

---

## 4. Quality Approach

### Testing Strategy

- **Manual testing:** Test each prompt workflow end-to-end
- **Export validation:** Verify DOCX/PDF/EPUB output quality
- **Consistency checks:** Built-in Prompt 8 for content consistency

### Coverage Target

All 16 prompts tested with representative book content

### Definition of Done

A feature is complete when:
- [x] Prompt executes correctly with expected output
- [x] Documentation updated in QUICK_REFERENCE.md
- [x] Anti-hallucination guidelines preserved
- [x] Cross-platform compatibility verified

---

## 5. Constraints

### Timeline

Ongoing maintenance and enhancement (no fixed deadline)

### Resources

Solo developer with AI assistance

### Technical Constraints

- Must work with Claude Code (primary interface)
- Must support Claude Desktop (optional interface)
- Must use Git for version control
- Must not require complex runtime dependencies

### Compliance

None - personal/professional authoring tool

---

## 6. Milestones

### Current Target

**v0.17.0:** Framework maintenance, Claude Code integration improvements

### Milestone Roadmap

| Milestone | Target | Criteria |
|-----------|--------|----------|
| v0.16.1 | Released | Multi-book support, image management |
| v0.17.0 | Next | Framework integration, maintenance |
| v1.0.0 | Future | Production-stable release |

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-01-05 | Initial charter extracted from codebase | Claude |

---

*Generated by IDPF Framework*
