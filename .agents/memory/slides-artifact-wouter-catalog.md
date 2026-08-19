---
name: Slides artifact missing dependency gaps (wouter catalog, @supabase/supabase-js)
description: pnpm install / vite fails on freshly scaffolded slides artifacts because a dependency a sibling deck relies on isn't in the new scaffold's package.json.
---

## The gap
Newly scaffolded slides artifacts (e.g. via the slides skill) do not automatically
inherit dependencies that a hand-built sibling deck added later, even when new
slide files copy that sibling's patterns verbatim. Two concrete instances hit in
this workspace's "AI Testing Academy" lecture decks:

1. `wouter: "catalog:"` in a fresh scaffold's `package.json`, but the monorepo's
   root `pnpm-workspace.yaml` catalog has no `wouter` entry ->
   `ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC`.
2. A new deck's `src/lib/examplesClient.ts` imports `@supabase/supabase-js` to
   fetch Supabase-backed worked examples (copying an existing sibling deck's
   pattern), but the new scaffold's `package.json` never gained that dependency
   -> Vite fails at runtime with `Failed to resolve import "@supabase/supabase-js"`.

**Why:** other artifacts in this workspace (e.g. `ai-testing-academy`, `portfolio`,
`ai-testing-lecture-3/4`) depend on these packages with an explicit version
(`wouter@^3.3.5`, `@supabase/supabase-js@^2.112.3`) added by hand, not through the
shared pnpm catalog — so a freshly scaffolded sibling deck copying that deck's
source code doesn't automatically get the same `package.json` dependency.

**How to apply:** when building a new deck/artifact by copying an existing
sibling's patterns (bilingual helpers, Supabase fetch clients, etc.), always
diff the new `package.json` against the sibling's and add any dependency the
copied code imports, matching the sibling's exact version, rather than
"catalog:" or leaving it out. Check this *before* the first workflow restart —
it's the most common first-boot failure for a new slides deck built from a
Supabase-backed template.
