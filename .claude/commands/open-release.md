---
version: "v0.21.1"
description: Open a new release with branch and tracker
argument-hint: <branch> (e.g., release/v1.2.0, patch/v1.9.1)
---

<!-- EXTENSIBLE: v0.17.0 -->
# /open-release

Opens a new release branch and creates a tracker issue.

## Available Extension Points

| Point | Location | Purpose |
|-------|----------|---------|
| `pre-create` | Before branch creation | Custom validation |
| `post-create` | After release created | Notifications, CI triggers |

---

## Prerequisites

- `gh pmu` extension installed
- `.gh-pmu.yml` configured
- Git working directory clean

---

## Workflow

### Step 1: Validate Arguments

Branch name must follow `[prefix]/[name]` format:
- Exactly one `/` separator required
- Both prefix and name must be non-empty

**Valid:** `release/v1.2.0`, `patch/v1.9.1`, `idpf/domain-reorg`, `hotfix/auth-bypass`
**Invalid:** `v1.2.0` (no `/`), `release/` (empty name), `a/b/c` (multiple `/`)

If invalid, report error and stop.

### Step 2: Check Working Directory

```bash
git status --porcelain
```

<!-- USER-EXTENSION-START: pre-create -->
### Verify Config

```bash
node .claude/scripts/open-release/verify-config.js
```

The script outputs JSON: `{"success": true/false, "message": "..."}`

**If `success` is false, STOP and report the error.**
<!-- USER-EXTENSION-END: pre-create -->

### Step 3: Create Release

```bash
gh pmu release start --branch "$BRANCH"
```

### Step 4: Switch to Release Branch

```bash
git checkout "$BRANCH"
```

<!-- USER-EXTENSION-START: post-create -->
<!-- USER-EXTENSION-END: post-create -->

### Step 5: Report Completion

```
Release opened.

Branch: $BRANCH
Tracker: #[issue-number]

Next steps:
1. Assign issues: gh pmu move [#] --release current
2. Work issues: work #N
3. When ready: /prepare-release
4. After deploy: /close-release
```

---

**End of Open Release**
