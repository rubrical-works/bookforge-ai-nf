---
version: "v0.21.1"
allowed-tools: Bash, AskUserQuestion
description: Assign issues to a release (project)
---

Assign issues to a release.

Run the assign-release script:

```bash
node .claude/scripts/shared/assign-release.js "$ARGUMENTS"
```

## Handling "NO_RELEASE_FOUND" Output

If the script outputs `NO_RELEASE_FOUND`, it means no open releases exist. The script will also output:

1. **CONTEXT:** - Information about last version, issue labels, user input
2. **SUGGESTIONS:** - Formatted as `number|branch|description`

When you see this output:

1. Parse the SUGGESTIONS lines to extract branch options
2. Use `AskUserQuestion` to let the user select a branch:
   - Present options with the `(recommended)` one first
   - Include descriptions to help user decide
   - "Other" option allows custom branch name
3. After user selects, create the release:
   ```bash
   gh pmu release start --branch "<selected-branch>"
   ```
4. Then re-run the original assign-release command with the new release

## Example Flow

Script output:
```
NO_RELEASE_FOUND
SUGGESTIONS:
1|patch/v0.15.1|Next patch version (bug fixes only) (recommended)
2|release/v0.16.0|Next minor version (new features)
```

Claude should:
1. Use AskUserQuestion with options: "patch/v0.15.1 (Recommended)", "release/v0.16.0"
2. User selects → run `gh pmu release start --branch "patch/v0.15.1"`
3. Re-run original command to complete assignment

## Normal Output

If releases exist, report the result to the user directly.
