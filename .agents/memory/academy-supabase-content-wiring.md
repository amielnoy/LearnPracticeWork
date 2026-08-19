---
name: AI Testing Academy Supabase content wiring
description: Fetch-with-fallback contract for Supabase-backed site content, and a data-integrity lesson from a real seed bug.
---

Static site content served from Supabase (question bank, coding challenges, lecture series) is fetched client-side
and must always fall back silently to the bundled static content on any failure or empty response — never a loading
spinner or visible error for this kind of content, since the bundled copy is always a complete, valid answer on its
own.

**Why:** a third-party content store being briefly unreachable should never be a user-facing outage for content that
already ships in the bundle.

**Data-integrity lesson:** a seed can be structurally correct (right tables, right columns, no query errors) while
carrying wrong per-row values — a batch of rows were seeded as not-ready with no URL even though the equivalent
static content had always been live. Structural validation is not enough; the read path and the seed source both
need a check that "marked ready" implies "has real content," not just that the query succeeds.

**How to apply:** when a seed script exists as the canonical source for such a table, add a test against the seed's
own source data asserting that invariant, not only against the runtime fallback behavior — a passing runtime test
does not catch a seed that will regress the live data the next time it runs.
