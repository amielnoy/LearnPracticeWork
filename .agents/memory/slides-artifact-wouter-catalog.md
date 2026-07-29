---
name: Slides artifact wouter catalog gap
description: pnpm install fails on freshly scaffolded slides artifacts because wouter is pinned to "catalog:" but not in the workspace catalog.
---

## The gap
Newly scaffolded slides artifacts (e.g. via the slides skill) generate a
`package.json` with `"wouter": "catalog:"`, but the monorepo's root
`pnpm-workspace.yaml` catalog does not include a `wouter` entry. Running
`pnpm install` in the artifact (or at the workspace root) fails with
`ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC`.

**Why:** other artifacts in this workspace (e.g. `ai-testing-academy`,
`portfolio`) depend on wouter with an explicit version (`^3.3.5`) rather
than through the catalog, so the catalog was never updated to include it.

**How to apply:** if `pnpm install` fails on a new slides (or other) artifact
citing a missing catalog entry for a package, check how existing sibling
artifacts pin that same package and switch the new artifact's
`package.json` to an explicit version matching them, rather than editing
the shared catalog (which would need to be intentional and change other
consumers).
