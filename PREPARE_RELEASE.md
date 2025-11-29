# Prepare Release

**Current Framework Version:** 0.16.1
**Last Updated:** 2025-11-28

---

## What This Does

This document guides Claude through preparing a new framework release by updating all version numbers across documentation files and verifying consistency.

**IMPORTANT:** This is a framework-only file. It should NOT be included in the release zip. It's used by maintainers in the development repository.

---

## Release Preparation Workflow

### Step 0: Verify Repository State (REQUIRED)

**Before starting ANY release work, verify the repository is clean:**

1. **Check for uncommitted changes:**
   ```bash
   git status
   ```

2. **If working tree is dirty (uncommitted changes exist):**
   - **STOP** - Do not proceed with release
   - Ask user: "There are uncommitted changes. Would you like to:
     - A) Commit them now before proceeding?
     - B) Stash them temporarily?
     - C) Abort the release process?"
   - Wait for user decision and execute chosen action

3. **If working tree is clean, verify remote sync (optional but recommended):**
   ```bash
   git fetch origin
   git status
   ```
   - If behind remote: `git pull`
   - If ahead of remote: Note this - changes will be pushed with release

4. **Confirm ready state:**
   ```
   ✓ Working tree clean
   ✓ No uncommitted changes
   ✓ Ready to proceed with release
   ```

**Only proceed to Step 1 after confirming clean repository state.**

---

### Step 1: Determine New Version Number

Ask the user:
- "What is the new version number?" (e.g., 0.9.2, 0.10.0, 1.0.0)
- Validate format: Must be semantic versioning (MAJOR.MINOR.PATCH)

Store as: `NEW_VERSION`

### Step 2: Update Version References

Update the version number in these files:

**Critical Files (MUST update):**

0. `VERSION` (root level) ← NEW for v0.15.0+ re-architecture
   - Single line containing version number (e.g., `0.15.0`)
   - No trailing newline
   - Used by update checking mechanism in /fw-init

1. `README.md` (root level)
   - Line ~3: `**Version X.X.X**`
   - Line ~30: Download link: `nonfiction-vX.X.X.zip`
   - Line ~41-47: Extract instructions: `nonfiction-vX.X.X.zip`
   - Line ~336: `**Framework Version**: X.X.X`
   - Line ~337: `**Release Date**: YYYY-MM-DD`
   - Review entire file for outdated prompt counts (should be "16 prompts" as of v0.12.1+)

2. `Process/FRAMEWORK_CORE.md` ← NEW
   - Line ~3: `**Framework Version:** X.X.X`
   - Line ~395: `**Framework Version:** X.X.X` (footer)
   - Line ~396: `**Release Date:** YYYY-MM-DD` (footer)
   - Line ~397: `**Token Efficiency:** [Note about token savings]`

3. `CLAUDE.md` (dev repo version - streamlined)
   - Line ~3: `**Framework Version:** X.X.X`
   - Line ~82: `**Framework Version:** X.X.X` (footer)
   - Line ~83: `**Last Updated:** YYYY-MM-DD` (footer)

4. `Documentation/AI-Assisted_Nonfiction_Authoring_Process.md` ← CRITICAL (GitHub Action verifies this)
   - Line ~3: `**Version:** X.X.X`

5. `configure.md`
   - Line ~5: `**AI-Assisted Nonfiction Authoring Framework vX.X.X**`
   - Line ~418: `*Framework Version: X.X.X*`

6. `INSTALLATION.md`
   - All references to `vX.X.X` or `X.X.X`
   - Download links: `nonfiction-vX.X.X.zip`

7. `PREPARE_RELEASE.md` (this file) ← STAYS at root
   - Line ~3: `**Current Framework Version:** X.X.X`
   - Line ~4: `**Last Updated:** YYYY-MM-DD`
   - Line ~end: `**Framework Version:** X.X.X` (footer)
   - Line ~end-1: `**Last Updated:** YYYY-MM-DD` (footer)

   **Self-Update:** This file updates its own version numbers as part of the release process.

8. `system-instructions.md`
   - Line ~3: `**Framework Version:** X.X.X`
   - Line ~552: `**Framework Version:** X.X.X` (footer)
   - Line ~553: `**Last Updated:** YYYY-MM-DD` (footer)

**.claude Files (Must update version footers):**

9. `.claude/commands/fw-init.md`
   - Footer: `**Framework Version:** X.X.X`
   - Footer: `**Last Updated:** YYYY-MM-DD`

10. `.claude/agents/book-writing-assistant.md`
    - Footer: `**Framework Version:** X.X.X`
    - Footer: `**Last Updated:** YYYY-MM-DD`

11. `.claude/README.md`
    - Footer: `**Framework Version:** X.X.X`
    - Footer: `**Last Updated:** YYYY-MM-DD`

**Shell Scripts (Must update version headers):**
12. `scripts/init.sh`
    - Line ~5: `# Version: X.X.X`
    - Line ~227: Version in banner: `Nonfiction Framework Initialization Script vX.X.X`

13. `scripts/detect-tools.sh`
    - Line ~5: `# Version: X.X.X`
    - Line ~166: Version in banner: `Tool Detection Script vX.X.X`

14. `scripts/generate-usage-guide.sh`
    - Line ~5: `# Version: X.X.X`

15. `scripts/generate-content.sh`
    - Line ~3: `# Version: X.X.X`
    - Line ~232: Version in banner: `Batch Content Generator vX.X.X`

16. `Process/Scripts/compile-manuscript.sh`
   - No version number currently (add if needed)

**CHANGELOG.md:**

**First, review commits since last release to identify changes:**
```bash
# List all commits since last release tag
git log --oneline v0.13.12..HEAD

# For more detail including file changes
git log --stat v0.13.12..HEAD
```

**Then add new version entry at top with today's date:**
- Summarize commits into Added/Changed/Fixed/Technical categories
- Follow this format:

```markdown
## [X.X.X] - YYYY-MM-DD

### Added
- [New features]

### Changed
- [Changes to existing functionality]

### Fixed
- [Bug fixes]

### Technical
- [Technical improvements]

---
```

### Step 3: Review Critical Files for Content Updates

**IMPORTANT:** Before proceeding to version verification, manually review these files for outdated content:

**3A. Review README.md:**
- Check all prompt counts (should be "16 prompts" as of v0.12.1+)
- Verify download links match new version
- Check "The 16 Core Prompts" section - should list all 16 prompts
- Verify "What's Included" section lists current features
- Check "Writing Style System" description is current
- Verify footer version and date

**3B. Review CHANGELOG.md:**
- Run `git log --oneline v[PREV_VERSION]..HEAD` to see all commits
- Verify all commits are reflected in CHANGELOG entry
- Verify new version entry added at top
- Ensure version entry format is consistent
- Verify date is correct (YYYY-MM-DD)
- Check that Added/Changed/Fixed/Technical sections are complete

**3C. Review system-instructions.md:**
- Verify compatibility classifications are correct (as of v0.12.1+):
  - CLI-ONLY: Prompts 7, 8, 9, 12, 13, 14, 15, 16
  - DESKTOP-FRIENDLY: Prompts 2, 3, 4, 5, 6, 10
  - HYBRID: configure.md, Prompts 1, 11
- Check all 16 prompts are listed (lines ~117-133)
- Verify critical section (lines ~42-66) has correct CLI-ONLY prompts (7, 8, 9, 12, 13, 14, 15, 16)
- Check version numbers in header and footer

### Step 4: Verify All Updates

Run this grep command to find any remaining old version references:

```bash
grep -r "OLD_VERSION" --include="*.md" --include="*.json" --include="*.sh" . | grep -v ".git" | grep -v "node_modules" | grep -v "CHANGELOG.md"
```

**Note:** CHANGELOG.md will contain old versions in history - that's expected.

If any unexpected references found, update them.

### Step 4.5: Verify Migration Configuration

**Check that migrations configuration exists and is properly configured:**

1. **Verify file exists:**
   ```bash
   ls -la .nonfiction-migrations.json
   ls -la Process/Templates/.config/migrations.json
   ```

2. **Check migration entries are up to date:**
   - Read `.nonfiction-migrations.json` (root - for framework development)
   - Template at `Process/Templates/.config/migrations.json` copied to user projects
   - Verify the latest migration entry matches the new version
   - If releasing 0.10.1, there should be a migration from 0.10.0 → 0.10.1
   - If no changes need migrations this release, that's fine (not every release requires migrations)

3. **Validate migration structure:**
   - Each migration must have: `id`, `fromVersion`, `toVersion`, `date`, `description`, `changes`
   - Each change must have: `type`, `reason`, `manualSteps`
   - Verify all referenced files in migrations actually exist (e.g., README.md for rename operations)

4. **Check .gitignore configuration:**
   ```bash
   # Framework .gitignore should NOT exclude migrations file
   grep ".nonfiction-migrations.json" .gitignore
   # (Should return no results - file should be tracked in framework repo)

   # User project .gitignore template SHOULD exclude .config directory
   grep ".config/" Process/Templates/gitignore_template
   # (Should find it - .config/ is a framework-managed directory)
   ```
   - Framework: `.nonfiction-migrations.json` tracked at root for development
   - User projects: `.config/migrations.json` copied from template, excluded in .gitignore

**If migrations are needed for this release:**
- Ensure they're documented in `.nonfiction-migrations.json` BEFORE tagging
- Test the migration with `configure.md` on a test project
- Verify all change types work correctly
- Confirm manual steps are clear and accurate

**CRITICAL: Verify config templates will be included in release:**
- Check that `.github/workflows/release.yml` copies `Process/Templates/.config/` to build
- `.config/migrations.json` template MUST be included in release zip
- All 5 .config templates must be present (init, project, metadata, manifest, migrations)

### Step 4.6: Sync Framework Files Manifest (AUTOMATED)

**Automatically synchronize the manifest with actual framework files:**

The manifest lists all framework files that should exist in a clean installation. This step ensures the manifest is **always accurate** by scanning the filesystem and updating automatically.

**CRITICAL:** This step must ADD files that exist but aren't in the manifest, and REMOVE entries for files that no longer exist. Never rely on manual tracking.

#### 4.6.1: Scan Actual Framework Files

**Directories to include in manifest:**
- `Process/` - All subdirectories and files (excluding Documentation/)
- `scripts/` - Shell scripts for automation
- `.claude/` - Claude Code configuration
- Root config files: `INSTALLATION.md`, `CLAUDE.md`, `configure.md`, `system-instructions.md`, `.gitignore`

**Directories to EXCLUDE from manifest:**
- `Documentation/` - Maintainer docs, not in user releases
- `Proposal/` - Design proposals, not in user releases
- `.github/` - GitHub workflows, not in user releases
- `PREPARE_RELEASE.md` - Maintainer tool, not in user releases
- `CHANGELOG.md` - Maintainer file, not in user releases
- `.nonfiction-migrations.json` - Root migrations file (template is in Process/Templates/.config/)

#### 4.6.2: Perform Manifest Sync

**For each manifest section, compare filesystem against manifest entries:**

1. **Read current manifest:** `Process/Templates/framework_files_manifest.json`

2. **For each directory section in manifest:**

   a. **Scan actual files** in that directory

   b. **Compare against manifest entries:**
      - Files on disk but NOT in manifest → **ADD to manifest**
      - Files in manifest but NOT on disk → **REMOVE from manifest**

   c. **Report changes:**
      ```
      Manifest sync for [directory]:
        ADDED: [list of new files]
        REMOVED: [list of deleted files]
        UNCHANGED: [count] files
      ```

3. **Check for new directories** not yet in manifest:
   - Scan `Process/` for subdirectories not represented in manifest
   - Add new directory sections as needed

4. **Update metadata:**
   - Set `"version"` to `NEW_VERSION`
   - Set `"generatedDate"` to today's date (YYYY-MM-DD)

#### 4.6.3: Validation Checklist

After sync, verify:

- [ ] All files in `Process/Prompts/` are listed (16 prompts + references + README + QUICK_REFERENCE)
- [ ] All files in `Process/_COMMON/` are listed (modules 01-20+)
- [ ] All files in `Process/Templates/` are listed (all templates including .config/)
- [ ] All files in `Process/Styles/` and subdirectories are listed
- [ ] All files in `Process/Scripts/` are listed
- [ ] All files in `scripts/` are listed
- [ ] All files in `.claude/` and subdirectories are listed
- [ ] Root files match: INSTALLATION.md, CLAUDE.md, configure.md, system-instructions.md, .gitignore
- [ ] JSON is valid (no syntax errors)

#### 4.6.4: Report Summary

**Display sync summary:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Framework Files Manifest Sync Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Version: [NEW_VERSION]
Generated: [TODAY'S DATE]

Files Added:   [count] ([list if any])
Files Removed: [count] ([list if any])
Total Files:   [count]

Manifest saved: Process/Templates/framework_files_manifest.json
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 4.7: Review Test Plans

**Review and update test plans in Testing/ directory:**

1. **Check for new test cases:**
   - Review commits since last release for testable changes
   - Add new test cases with the release version number

2. **Update version coverage:**
   - Update "Covers Versions" range in affected test plan headers
   - Example: `v0.16.0 - v0.16.1` → `v0.16.0 - v0.17.0`

3. **Mark deprecated tests:**
   - If features removed, mark test cases as deprecated
   - Don't delete historical tests; add note for removal reason

**Note:** Testing/ directory is developer-only (NOT deployed to -dist). It contains modular test plans organized by feature area.

---

**IMPORTANT: Step 4.8 - Documentation/ Directory Exclusion**

The `Documentation/` directory contains maintainer documentation and is NOT included in user release packages:
- Documentation/ is excluded in `.github/workflows/release.yml` build step
- Only Process/, scripts/, .claude/, and root config files are included in releases
- PREPARE_RELEASE.md stays at root (actively used for every release)
- Users get FRAMEWORK_CORE.md (instant load) + on-demand docs from Process/

**Example manifest structure:**
```json
{
  "version": "0.15.0",
  "generatedDate": "2025-11-27",
  "files": {
    "root": ["VERSION", "INSTALLATION.md", "CLAUDE.md", "configure.md", "system-instructions.md", ".gitignore"],
    "Process": ["FRAMEWORK_CORE.md", "Anti-Hallucination_Guidelines.md", ...],
    "Process/Prompts": ["Prompt_1_Initialize.md", "Prompt_1_Reference.md", ..., "README.md", "QUICK_REFERENCE.md"],
    "Process/_COMMON": ["01_Prompt_Structure_Template.md", ..., "README.md"],
    "Process/Templates": ["Image_Registry_template.md", "Image_Registry_Master_template.md", "Image_Registry_Chapter_template.md", ...],
    "Process/Templates/.config": ["init.json", "project.json", "metadata.json", "manifest.json", "migrations.json", "README.md"],
    "Process/Styles": ["README.md", "Style_Catalog.md"],
    "Process/Styles/Academic": ["Academic_Authority.md", ...],
    "Process/Scripts": ["compile-manuscript.sh", "README.md"],
    "Process/migrations": ["README.md", "migrate-0.14.5-to-0.15.0.md"],
    ".claude": ["README.md", "hooks.json"],
    ".claude/agents": ["book-writing-assistant.md"],
    ".claude/commands": ["fw-init.md"]
  }
}
```

**Note:** Documentation/, Proposal/, Testing/, .github/, PREPARE_RELEASE.md, CHANGELOG.md are NOT in manifest - excluded from user releases

**Why this matters:**
- During framework updates, configure.md will:
  1. Read this manifest to know what files SHOULD exist
  2. Compare against what files DO exist in user's Process/ directory
  3. Remove files NOT in manifest (outdated from previous versions)
  4. Preserve user content (Manuscript/, etc. - never touched)
- Prevents accumulation of obsolete framework files
- Keeps installation clean and up-to-date
- **Automated sync prevents missing files like the Image_Registry templates issue**

**Commit the updated manifest:**
```bash
git add Process/Templates/framework_files_manifest.json
# (Will be committed with other version updates in Step 5)
```

### Step 5: Commit Version Updates

```bash
git add -A
git commit -m "Update all documentation to version X.X.X

UPDATED:
- README.md (root level)
- Process/FRAMEWORK_CORE.md
- CLAUDE.md
- configure.md
- INSTALLATION.md
- PREPARE_RELEASE.md
- system-instructions.md
- .claude/commands/fw-init.md
- .claude/agents/book-writing-assistant.md
- .claude/README.md
- Documentation/AI-Assisted_Nonfiction_Authoring_Process.md
- CHANGELOG.md
- scripts/init.sh
- scripts/detect-tools.sh
- scripts/generate-usage-guide.sh
- scripts/generate-content.sh

Prepared for vX.X.X release.

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

git push
```

### Step 6: Create and Push Tag

```bash
# Delete existing tag if it exists (for re-releases)
git tag -d vX.X.X 2>/dev/null
git push origin :refs/tags/vX.X.X 2>/dev/null

# Create annotated tag with release notes
git tag -a vX.X.X -m "Release vX.X.X: [Brief Description]

[Detailed release notes - copy from CHANGELOG.md]
"

# Push tag (triggers GitHub Actions workflow)
git push --tags
```

### Step 7: Monitor GitHub Actions

```bash
# Wait for workflow to start
sleep 15

# Watch workflow execution
gh run list --limit 1

# If successful, verify release
gh release view vX.X.X
```

### Step 8: Verify Release Assets

Check that the release includes:
- ✅ Release page created on GitHub
- ✅ Changelog from CHANGELOG.md
- ✅ Installation instructions (clone-based for v0.15.0+)

**v0.16.0+ Verification (unified PROJECT_ROOT architecture):**
- ✅ `VERSION` file at root (contains version string only)
- ✅ `configure.bat` and `configure.sh` at root (bootstrap scripts)
- ✅ Minimal `CLAUDE.md` (CONFIG_ROOT template for project use)
- ✅ All templates in `Process/Templates/`:
  - `configure.bat` and `configure.sh` (bootstrap scripts for FW_ROOT)
  - `start-authoring.bat/.sh` (startup scripts for PROJECT_ROOT)
  - `bp-start-authoring.bat/.sh` (bypass permissions scripts)
  - `FW_ROOT_CLAUDE_template.md`
  - `CONFIG_ROOT_CLAUDE_template.md`
  - `Archive_README_template.md`
  - `PROJECT_ROOT_gitignore_template`
  - `books-registry_template.json`
  - `fw-location_template.json`
  - `settings_template.json`
  - `.claude/commands/fw-init.md`
  - `.claude/commands/switch-book.md`
  - `.claude/commands/manage-book.md`
  - `.claude/agents/book-writing-assistant.md`
- ✅ `Process/migrations/` directory with README.md
- ✅ No `Documentation/` directory (maintainer-only)
- ✅ No `Proposal/` directory (maintainer-only)
- ✅ No `.github/` directory (maintainer-only)

---

## Dist Repo vs Main Repo (v0.16.0+)

The unified PROJECT_ROOT architecture separates framework distribution from development:

### What goes in author-nonfiction-dist (user releases):
- `Process/` - All framework files (prompts, styles, templates, migrations)
- `Process/Templates/.claude/` - Slash commands and agents for CONFIG_ROOT
- `scripts/` - Shell scripts for automation
- `.claude/` - Minimal slash commands (fw-init, switch-book, manage-book)
- `VERSION` - Semantic version for update checking
- `CLAUDE.md` - Minimal FW_ROOT instructions
- `configure.bat` / `configure.sh` - Bootstrap scripts (at root)
- `configure.md` - Configuration prompt
- `LICENSE` - MIT license
- `INSTALLATION.md` - User installation guide
- `system-instructions.md` - Claude Desktop instructions

### What stays in author-nonfiction (maintainer only):
- `Documentation/` - Maintainer documentation
- `Proposal/` - Development proposals (including Implemented/)
- `.github/` - CI/CD workflows
- `.claude/commands/gh-workflow.md` - Maintainer-only command
- `PREPARE_RELEASE.md` - This file
- `CHANGELOG.md` - Release history (copied to dist for reference)

### New v0.16.0 Architecture Notes:
- **PROJECT_ROOT** contains everything: FW_ROOT/, BOOKS_ROOT/, .config/
- **configure.bat/sh** bootstraps initial setup from cloned FW_ROOT
- **Templates** include .claude/ subdirectory for CONFIG_ROOT setup
- Users start Claude from CONFIG_ROOT (.config/), not FW_ROOT

---

## Files That Should Contain Version Numbers

This list helps verify all version references are updated:

### Framework Documentation (User-Facing)
- `README.md` - Root level readme (header, footer, download links, prompt counts)
- `Process/FRAMEWORK_CORE.md` - Header and footer version and date
- `CLAUDE.md` - Header and footer version and date
- `configure.md` - Header and footer version
- `INSTALLATION.md` - All download links and references
- `system-instructions.md` - Header and footer version, token efficiency note

### .claude Directory (User-Facing)
- `.claude/commands/fw-init.md` - Footer version and date
- `.claude/agents/book-writing-assistant.md` - Footer version and date
- `.claude/README.md` - Footer version and date

### Shell Scripts (Framework Automation)
- `scripts/init.sh` - Header version comment and banner display
- `scripts/detect-tools.sh` - Header version comment and banner display
- `scripts/generate-usage-guide.sh` - Header version comment
- `scripts/generate-content.sh` - Header version comment and banner display (NEW v0.14.1)

### Maintainer Tools (Root Level - Actively Used)
- `PREPARE_RELEASE.md` - This file's header and footer version and date (stays at root)

### Maintainer Documentation (NOT in user releases)
- `Documentation/AI-Assisted_Nonfiction_Authoring_Process.md` - Header version and date

### Generated During Installation (v0.12.1+)
- `.config/init.json` - Created by Prompt 1 Q&A session
- `.config/project.json` - Created by Prompt 1 (replaces Project_Config.md)
- `.config/metadata.json` - Created by Prompt 1 (replaces Project_Metadata.md)
- `.config/manifest.json` - Created by configure.md (replaces .nonfiction-manifest.json)
- `.config/migrations.json` - Copied from template during initialization

### Release Artifacts
- `CHANGELOG.md` - New version entry added
- Git tag - `vX.X.X`
- GitHub Release - Title and assets
- ZIP filename - `nonfiction-vX.X.X.zip`

---

## Version Numbering Guidelines

Follow semantic versioning (https://semver.org/):

**MAJOR version (X.0.0):**
- Breaking changes requiring migration
- Incompatible API changes
- Major structural reorganization

**MINOR version (0.X.0):**
- New features (backwards compatible)
- Significant enhancements
- New prompts or major prompt changes

**PATCH version (0.0.X):**
- Bug fixes
- Documentation improvements
- Small enhancements
- Performance improvements

---

## Pre-Release Checklist

Before creating a release, verify:

- [ ] All prompts tested and working
- [ ] **README.md reviewed** for prompt counts, version numbers, download links
- [ ] **CHANGELOG.md reviewed** for complete, accurate release notes
- [ ] **system-instructions.md reviewed** for correct compatibility classifications
- [ ] **`.nonfiction-migrations.json` verified** with correct migrations for this release
- [ ] **Migration testing completed** if migrations are included in this release
- [ ] All version numbers updated consistently across 14 files (8 docs + 3 .claude files + 3 shell scripts)
- [ ] **Shell scripts verified** (init.sh, detect-tools.sh, generate-usage-guide.sh)
- [ ] **Repository state verified** (Step 0 completed - no uncommitted changes)
- [ ] GitHub Actions workflow is functioning
- [ ] Previous release (if any) completed successfully

---

## Rollback Procedure

If a release needs to be rolled back:

1. **Delete bad release:**
   ```bash
   gh release delete vX.X.X -y
   git push origin :refs/tags/vX.X.X
   git tag -d vX.X.X
   ```

2. **Fix issues in code**

3. **Re-run this PREPARE_RELEASE.md workflow**

---

## Example: Releasing v0.11.0

**User:** "Prepare release 0.11.0"

**Claude:**
1. Updates version to 0.11.0 in all 8 documentation files and 3 shell scripts listed in Step 2
2. Updates dates to today's date
3. **Reviews README.md** for prompt counts ("16 prompts" as of v0.12.1), download links, features
4. **Reviews CHANGELOG.md** entry for 0.11.0 completeness
5. **Reviews system-instructions.md** for correct compatibility classifications (CLI-ONLY: 7,8,9,12,13,14,15,16 as of v0.12.1+)
6. Runs grep to verify no 0.10.3 references remain (except CHANGELOG history)
7. Commits with message: "Update all documentation to version 0.11.0"
8. Creates tag v0.11.0 with release notes from CHANGELOG.md
9. Pushes tag
10. Monitors GitHub Actions
11. Verifies release created successfully with nonfiction-v0.11.0.zip

---

## Quick Command Reference

**Check current version in files:**
```bash
grep -h "Version:" README.md Process/FRAMEWORK_CORE.md CLAUDE.md configure.md PREPARE_RELEASE.md system-instructions.md Documentation/AI-Assisted_Nonfiction_Authoring_Process.md scripts/*.sh | head -12
```

**Find all version references:**
```bash
grep -r "0\.10\.0" --include="*.md" --include="*.sh" . | grep -v ".git" | grep -v "CHANGELOG.md" | grep -v "Documentation/"
```

**Review critical files for content:**
```bash
# Check README.md for outdated prompt counts (should be 16 as of v0.12.1)
grep -n "[0-9][0-9].*[Pp]rompts" README.md

# Check system-instructions.md for compatibility
grep -n "CLI-ONLY\|DESKTOP-FRIENDLY\|HYBRID\|DESKTOP-READY" system-instructions.md
```

**List recent releases:**
```bash
gh release list --limit 5
```

**View specific release:**
```bash
gh release view vX.X.X
```

**Check workflow status:**
```bash
gh run list --limit 3
```

---

**Framework Version:** 0.16.1
**Last Updated:** 2025-11-28

*This file is for framework maintainers only - not included in release packages*
