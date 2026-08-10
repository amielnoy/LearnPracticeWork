---
name: pnpm packageManager pin causes self-install failures
description: Root package.json pinning "packageManager": "pnpm@X.Y.Z" can break all workflows and deployment builds simultaneously in this environment.
---

If the root `package.json` has a `"packageManager": "pnpm@X.Y.Z"` field that doesn't match the locally provisioned pnpm binary, pnpm auto-triggers a self-install step (`pnpm add pnpm@X.Y.Z ...`) on every invocation. In this Replit environment that self-install step can fail unconditionally and retry dozens of times, producing generic `exit code 1` errors — observed identically across workflow startup logs, deployment build logs, and manual shell `pnpm` invocations, with no code-level cause.

**Why:** This blocked every workflow and the deployment build at once even though nothing in the app code had changed since the last successful build — a strong signal to check the `packageManager` field before assuming a code regression.

**How to apply:** If workflows and deployment builds fail simultaneously with `pnpm add pnpm@<version>` errors in the logs (not errors from the app's own dependencies), remove or update the `packageManager` field in root `package.json` rather than debugging app code. After removing it, `pnpm -v` should resolve instantly instead of looping. Restart workflows one at a time afterward (not in parallel) to avoid a separate concurrent self-install pileup, and re-run `pnpm install` since a build that failed partway through the pin issue can leave `node_modules` half-populated (missing packages, dangling symlinks) even after the pin is removed.
