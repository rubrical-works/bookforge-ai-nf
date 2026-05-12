---
version: "v0.21.1"
allowed-tools: Bash
description: Switch release/sprint context (project)
---

Switch between release and sprint contexts.

Run the switch-release script:

```bash
node .claude/scripts/shared/switch-release.js "$ARGUMENTS"
```

After switching, report the new context to the user.
