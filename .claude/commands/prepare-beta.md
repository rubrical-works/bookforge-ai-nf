---
version: "v0.21.1"
description: Tag beta from feature branch (no merge to main)
argument-hint: [--skip-coverage] [--dry-run] [--help]
---

<!-- EXTENSIBLE: v0.17.0 -->
# /prepare-beta

Tag a beta release from feature branch without merging to main.

## Available Extension Points

| Point | Location | Purpose |
|-------|----------|---------|
| `post-analysis` | After Phase 1 | Commit analysis |
| `pre-validation` | Before Phase 2 | Setup test environment |
| `post-validation` | After Phase 2 | Beta validation |
| `post-prepare` | After Phase 3 | Additional updates |
| `pre-tag` | Before Phase 4 tagging | Final gate |
| `post-tag` | After Phase 4 | Beta monitoring |

---

## Arguments

| Argument | Description |
|----------|-------------|
| `--skip-coverage` | Skip coverage gate |
| `--dry-run` | Preview without changes |
| `--help` | Show extension points |

---

## Pre-Checks

### Verify NOT on Main

```bash
BRANCH=$(git branch --show-current)
if [ "$BRANCH" = "main" ]; then
  echo "Error: Cannot create beta from main."
  exit 1
fi
```

### Verify Config

```bash
node .claude/scripts/open-release/verify-config.js
```

**If the script returns `success: false`, STOP and report the error.**

---

## Phase 1: Analysis

```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

<!-- USER-EXTENSION-START: post-analysis -->
### Analyze Commits

```bash
node .claude/scripts/framework/analyze-commits.js
```

### Recommend Version

```bash
node .claude/scripts/framework/recommend-version.js
```

Recommend beta version (e.g., `v1.0.0-beta.1`).
<!-- USER-EXTENSION-END: post-analysis -->

**ASK USER:** Confirm beta version before proceeding.

---

## Phase 2: Validation

<!-- USER-EXTENSION-START: pre-validation -->
<!-- Setup: prepare test environment for beta validation -->
<!-- USER-EXTENSION-END: pre-validation -->

```bash
go test ./...
```

<!-- USER-EXTENSION-START: post-validation -->
### Coverage Gate (Optional for Beta)

**If `--skip-coverage` was passed, skip this section.**

```bash
node .claude/scripts/prepare-release/coverage.js
```

**If `success` is false, STOP and report the error.**
<!-- USER-EXTENSION-END: post-validation -->

**ASK USER:** Confirm validation passed before proceeding.

---

## Phase 3: Prepare

Update CHANGELOG.md with beta section.

<!-- USER-EXTENSION-START: post-prepare -->
<!-- USER-EXTENSION-END: post-prepare -->

---

## Phase 4: Tag (No Merge)

### Step 4.1: Commit Changes

```bash
git add -A
git commit -m "chore: prepare beta $VERSION"
git push origin $(git branch --show-current)
```

<!-- USER-EXTENSION-START: pre-tag -->
<!-- Final gate: sign-off checks before beta tag -->
<!-- USER-EXTENSION-END: pre-tag -->

### Step 4.2: Create Beta Tag

**ASK USER:** Confirm ready to tag beta.

```bash
git tag -a $VERSION -m "Beta $VERSION"
git push origin $VERSION
```

**Note:** Beta tags feature branch. No merge to main.

<!-- USER-EXTENSION-START: post-tag -->
### Monitor Beta Build

```bash
node .claude/scripts/close-release/monitor-release.js
```

Monitor beta build and asset upload.
<!-- USER-EXTENSION-END: post-tag -->

---

## Next Step

Beta is tagged. When ready for full release:
1. Merge feature branch to main
2. Run `/prepare-release` for official release

---

**End of Prepare Beta**
