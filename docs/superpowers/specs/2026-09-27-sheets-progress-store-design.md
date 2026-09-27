# Learner progress in a Google Sheet, AI quota in Redis

**Date:** 2026-09-27
**Status:** approved design, not yet implemented

## Why

Each signed-in learner's progress — lectures viewed, coding challenges completed,
mock interview, resume review — is meant to follow them between devices. The code
for that has existed since `routes/progress.py` was written and has never once
run in production: `learner_progress` was only ever created by
`initialize_database()` at boot, boot-time DDL was removed when the API became a
Vercel function, and the Supabase project the table would have lived in no longer
answers.

Rather than revive a database for one small table, the store becomes the
`LearnPracticeWorkData` spreadsheet. That removes the last reason to own a
Supabase project.

Removing the database has a second consequence that this spec also fixes. In
production the AI quotas count in Postgres and are declared
`when_unavailable="refuse"`, because they guard a key that bills per call. With
`DATABASE_URL` set and the database unreachable, **every AI request is refused
with a 429 that reads to a visitor exactly like an exhausted quota** — verified
against production on 2026-09-27, first request of the day. Unsetting
`DATABASE_URL` does not help: `shared_quota_problem()` then returns a reason and
the same buckets still refuse. The quota needs a shared store that is not
Postgres.

## Decisions

| Decision | Chosen | Rejected, and why |
|---|---|---|
| Progress store | The spreadsheet, as system of record | Postgres mirror — keeps the Supabase dependency, which is the thing being removed |
| Sheet access | Apps Script web app called over HTTPS | Service account + Sheets REST: no locking, so two devices racing lose a write; also a private key in an env var and a JWT signer in a bundle already tuned against a 225 MB ceiling. Append-only event rows: unbounded growth and compaction, to avoid a mutex option A gives for free |
| Identity stored | Google `sub` only | Email — anyone the spreadsheet is shared with could read every learner's address, where Postgres had RLS and the anon key could not reach the table |
| AI quota store | Redis (Vercel Marketplace, slug `redis`) | Per-instance in-memory: turns 10/day into 10/day/instance against keys that bill per call |

## Architecture

`ProgressService` already takes its two operations as injected callables, so the
seam exists and nothing above it changes — not the client, not `routes/progress.py`,
not `ProgressBody`.

```
routes/progress.py
        │
        ▼
ProgressService(load, merge)          unchanged
        │
        ▼
sheets_store.py                       new
        │  httpx.post(SHEETS_WEBAPP_URL, token, {op, sub, progress})
        ▼
Apps Script web app                   new, bound to LearnPracticeWorkData
        │  LockService.getScriptLock()
        ▼
learner_progress tab
```

One interface narrows: `merge_progress(subject, email, incoming)` becomes
`merge_progress(subject, incoming)`, because email is no longer stored. That is
the `MergeProgress` type alias in `progress.py`, the call in
`ProgressService.merge_for_user`, and the injection in `dependencies.py`.

### The sheet

A new tab, `learner_progress`, one row per learner:

| Column | Type | Notes |
|---|---|---|
| `google_sub` | text | Primary key. The only identifier stored |
| `resume_started` | boolean | |
| `resume_completed` | boolean | |
| `interview_started` | boolean | |
| `interview_answers` | number | |
| `interview_completed` | boolean | |
| `practice_completed` | JSON array as text | Capped at 500 ids |
| `lectures_viewed` | JSON array as text | Capped at 500 ids |
| `last_tool` | text | `resume` \| `interview` \| `practice` \| empty |
| `updated_at` | ISO 8601 text | |

A Sheets cell holds at most 50,000 characters, and the accepted input can
exceed that: `ProgressBody` allows 500 ids of up to 200 characters each, so the
serialised array reaches about 101,500 characters — roughly twice the limit,
and more again if the ids contain characters JSON has to escape. Real ids are
lecture and practice-item keys of a few characters, so the realistic row is a
couple of kilobytes; the ceiling is a tampering bound, not a typical one, and it
is the cap at 500 that is doing the work rather than any headroom in the cell.

### The web app

`server/sheets/Progress.gs`, committed to the repository even though it is
deployed through the browser — otherwise the most important part of this feature
is reviewable by nobody. Deployed "execute as me / anyone with the link", so the
shared token is the only guard in front of the sheet: at least 32 random
characters, compared with a length-independent equality check rather than `===`,
and never logged.

```
POST  { op: "load",  sub }                     → { progress }
POST  { op: "merge", sub, progress }           → { progress }   // the union
header: X-Academy-Token: <SHEETS_WEBAPP_TOKEN>
```

Both operations run inside `LockService.getScriptLock()` with a bounded wait, so
read-modify-write is serialised. The response body is the same camelCase shape
`validateProgress()` on the client already accepts:

```json
{ "progress": { "resumeStarted": false, "resumeCompleted": false,
                "interviewStarted": false, "interviewAnswers": 0,
                "interviewCompleted": false, "practiceCompleted": [],
                "lecturesViewed": [], "lastTool": null } }
```

A `sub` with no row loads as that object rather than an error, matching
`EMPTY_PROGRESS` today.

### Merge semantics

Identical to the SQL being replaced, because the client adopts whatever comes
back and a weaker rule silently loses work:

| Field | Rule |
|---|---|
| the five booleans | `stored OR incoming` |
| `interviewAnswers` | `max(stored, incoming)` |
| `practiceCompleted`, `lecturesViewed` | union, then capped at 500 |
| `lastTool` | incoming when set, else stored |
| `updated_at` | now |

Last-write-wins is the bug this prevents: finish three challenges on a laptop,
open a phone holding the older copy, and a plain write erases them.

### AI quota on Redis

`api_rate_limits` becomes `INCR` plus `EXPIRE` on the same HMAC digest key, so no
raw identity reaches Redis. `SharedRateLimiter` keeps its buckets and its
`when_unavailable` policies exactly as they are; only the backing store and the
one question `shared_quota_problem()` asks change — from "is `DATABASE_URL` set"
to "is `REDIS_URL` set".

`hit_rate_limit(bucket, key_hash, limit, window_seconds)` and
`release_rate_limit(bucket, key_hash)` keep their signatures, so the
`SharedRateLimiter` class itself needs no change — only the two module functions
it calls, and the one question `shared_quota_problem()` asks in the same file.

## Error handling

`ProgressService._call` already distinguishes the two cases and the client
already treats both as "keep using localStorage". `sheets_store` preserves that
contract:

| Condition | Result |
|---|---|
| `SHEETS_WEBAPP_URL` unset | `None` → 503, *"Progress is not available on this server."* |
| HTTP error, timeout, malformed body | raises → 500 |
| Unknown `sub` | the empty progress object, 200 |

Apps Script cold starts are seconds, not milliseconds, so the client timeout
must tolerate that; a slow sync is invisible because the UI renders from
`localStorage` regardless.

## Testing

| Layer | Covers |
|---|---|
| `tests/unit/progressMerge.spec.ts` | The merge function, read out of `Progress.gs` and exercised in Node — the trick `hreflang.spec.ts` and `contentSchema.spec.ts` already use to hold a non-TypeScript artifact to its contract. Table-driven over the same cases the SQL merge had |
| `server/tests/test_sheets_store.py` | `load`/`merge` against a fake transport: the empty-row case, the 503 when unconfigured, the 500 on a bad response, and that email never appears in a request body |
| `server/tests/test_rate_limit_config.py` | Redis-backed counting, window expiry, and that each bucket's `when_unavailable` policy is unchanged |
| `server/tests/test_progress.py` | Already covers `ProgressService` against injected fakes; it should keep passing untouched, which is the check that the seam held |

## Rollout

No data to migrate: `learner_progress` never held a row.

1. Create the `learner_progress` tab and deploy `Progress.gs` as a web app.
2. Set `SHEETS_WEBAPP_URL` and `SHEETS_WEBAPP_TOKEN` on the Vercel project.
3. Provision Redis through `vercel integration add redis`, which sets its own variables.
4. Swap the injection in `dependencies.py`; delete the Postgres progress functions and `learner_progress` from `server/app/schema.sql`.
5. Deploy, then verify a real round trip by signing in on two browsers and confirming the union.

## Out of scope

- **Content.** `/api/content/*` reads Supabase REST and will answer 503 without it, so the academy renders its bundled content modules — which is what it does today and what a visitor already sees. No regression, but the content API becomes decorative until separately decided.
- **Purchases, entitlements, login events.** Still Postgres-shaped. `SALES_ENABLED` is `false`, so nothing breaks; leaving that code alone keeps this change's blast radius to progress and quota.
- **Reporting on the sheet.** A learner-facing view, charts, or aggregation across rows.
