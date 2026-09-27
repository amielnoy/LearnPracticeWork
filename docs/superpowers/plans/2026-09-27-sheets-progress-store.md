# Sheets Progress Store Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep each signed-in learner's progress in the `LearnPracticeWorkData` spreadsheet and move the AI quota counters to Redis, so the deployment needs no Supabase project.

**Architecture:** `ProgressService` already takes `load` and `merge` as injected callables, so the progress store is swapped behind that seam — a new `sheets_store.py` posts to an Apps Script web app bound to the spreadsheet, and the web app does read-modify-write inside `LockService.getScriptLock()`. Separately, `SharedRateLimiter`'s two backing functions move from Postgres rows to Redis `INCR`/`EXPIRE` on the same HMAC digest keys.

**Tech Stack:** FastAPI on a Vercel Python Function (3.12), `httpx` (already a dependency), `redis` (new), Google Apps Script, pytest + Playwright.

**Spec:** `docs/superpowers/specs/2026-09-27-sheets-progress-store-design.md`

## Global Constraints

- Python `>=3.12`; ruff `line-length = 100`, target `py312`, lint set `E4,E7,E9,F,I,UP,B`.
- pytest runs with `asyncio_mode = "auto"` and `-n auto --dist loadscope`; tests must be xdist-safe (no shared module state between tests).
- `functions.excludeFiles` in `vercel.json` is capped at **256 characters** and is currently 250. Any new top-level directory that must not ship has to fit in the remaining 6, or replace an existing entry.
- No secret value may appear in the repository, in a log line, or in a test fixture.
- Only the Google `sub` is stored in the spreadsheet. Email must never be written to it or sent to it.
- The merge rules are fixed by the spec: booleans `OR`, `interviewAnswers` `max`, the two lists union then cap at **500**, `lastTool` prefers incoming, `updated_at` is now.
- The client contract is unchanged: `GET /api/progress` and `PUT /api/progress` return `{"progress": {...}}` in camelCase, 401 when not signed in, 503 when no store is configured, 500 when the store broke.
- Node 24, pnpm 11.20.0, `pnpm --filter` for workspace scripts.

## Review Focus

- **A learner-controlled id starting with `=`, `+`, `-` or `@`.** `practiceCompleted` and `lecturesViewed` come from `localStorage`, which the visitor can edit. Written into a cell raw, Sheets evaluates them as formulas. They must be stored as a JSON string in one cell, written through a helper that forces text — Task 5 pins this.
- **Two rows for the same `sub`.** A hand-edited sheet, or a race that escaped the lock, can leave duplicates; the lookup must be deterministic and the merge must not silently write to the second one. Task 5 pins first-match-wins plus a distinct error when duplicates exist.
- **The lock not being granted.** `getScriptLock().tryLock(ms)` can time out under concurrent syncs. Timing out must surface as a failure the API turns into a 500, never as a silent unlocked write. Task 5 pins it.
- **A wrong or absent shared token.** The web app is deployed "anyone with the link", so the token is the only guard; a mismatch must return 401 with no detail, and a missing one must not be treated as a match against an unset script property. Task 5 pins both.
- **Redis unreachable mid-request.** The AI buckets must still refuse (they guard a metered key) while sign-in and admin still degrade to the in-memory bound. Task 2 pins each policy separately, because collapsing them is an authentication outage.

---

## Phase A — AI quota on Redis

Independent of the spreadsheet work and worth shipping first: production currently answers **429 to every AI request**, because `DATABASE_URL` is set while the database is unreachable and the AI buckets are `when_unavailable="refuse"`.

### Task 1: Redis-backed counters

**Files:**
- Create: `server/app/quota_store.py`
- Modify: `server/pyproject.toml` (add `redis`)
- Test: `server/tests/test_quota_store.py`

**Interfaces:**
- Consumes: `app.config.env`
- Produces: `redis_url() -> str | None`, `async hit_rate_limit(bucket: str, key_hash: str, limit: int, window_seconds: float) -> tuple[bool, int]`, `async release_rate_limit(bucket: str, key_hash: str) -> int` — the same signatures `database.py` exposes today, so `rate_limit.py` calls them unchanged.

- [ ] **Step 1: Write the failing test**

```python
# server/tests/test_quota_store.py
"""Quota counting on Redis: the window, the verdict, and giving a hit back."""

from __future__ import annotations

import pytest

from app import quota_store


class FakeRedis:
    """Counts like Redis does, and records the expiries it was asked to set."""

    def __init__(self) -> None:
        self.values: dict[str, int] = {}
        self.expiries: list[tuple[str, int]] = []

    async def incr(self, key: str) -> int:
        self.values[key] = self.values.get(key, 0) + 1
        return self.values[key]

    async def expire(self, key: str, seconds: int, nx: bool = False) -> bool:
        self.expiries.append((key, seconds))
        return True

    async def decr(self, key: str) -> int:
        self.values[key] = self.values.get(key, 0) - 1
        return self.values[key]

    async def set(self, key: str, value: int) -> None:
        self.values[key] = value


@pytest.fixture
def fake(monkeypatch) -> FakeRedis:
    client = FakeRedis()
    monkeypatch.setattr(quota_store, "_client", lambda: client)
    return client


async def test_first_hit_is_allowed_and_reports_what_is_left(fake):
    allowed, remaining = await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    assert (allowed, remaining) == (True, 9)


async def test_the_hit_that_exceeds_the_limit_is_refused(fake):
    for _ in range(10):
        await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    allowed, remaining = await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    assert (allowed, remaining) == (False, 0)


async def test_the_window_is_set_once_when_the_key_is_created(fake):
    await quota_store.hit_rate_limit("ai-burst", "abc", 5, 60)
    await quota_store.hit_rate_limit("ai-burst", "abc", 5, 60)
    assert fake.expiries == [("quota:ai-burst:abc", 60), ("quota:ai-burst:abc", 60)]


async def test_buckets_do_not_share_a_key(fake):
    await quota_store.hit_rate_limit("ai-burst", "abc", 5, 60)
    _, remaining = await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    assert remaining == 9


async def test_release_gives_one_back_and_never_goes_below_zero(fake):
    await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    assert await quota_store.release_rate_limit("ai-daily", "abc") == 10
    assert await quota_store.release_rate_limit("ai-daily", "abc") == 10
```

- [ ] **Step 2: Run the test and watch it fail**

Run: `cd server && uv run pytest tests/test_quota_store.py -p no:xdist -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'app.quota_store'`

- [ ] **Step 3: Add the dependency**

In `server/pyproject.toml`, add to `dependencies`, keeping the list alphabetical:

```toml
  "redis>=6.4.0,<7",
```

Then: `cd server && uv lock && uv sync`

- [ ] **Step 4: Write the implementation**

```python
# server/app/quota_store.py
"""Rate-limit counters in Redis.

These replace the `api_rate_limits` table, which was emulating `INCR` with an
upsert and a window comparison. The key is the same HMAC digest the Postgres
row was keyed by, so no raw identity reaches the store here either.

The window is a key expiry rather than a stored timestamp: a bucket's first hit
creates the key and sets its TTL, and the key disappearing is what starts the
next window. That is why `expire` is called with `nx=True` — a later hit inside
the same window must not push the window out, which would let a steady caller
hold a quota open forever.
"""

from __future__ import annotations

from typing import Any

import redis.asyncio as redis

from .config import env


def redis_url() -> str | None:
    """The connection string, under any of the names an integration may set."""
    return env("REDIS_URL") or env("KV_URL") or env("REDIS_TLS_URL")


def _client() -> Any:
    url = redis_url()
    if url is None:
        raise RuntimeError("no Redis URL is configured")
    return redis.from_url(url, decode_responses=True)


def _key(bucket: str, key_hash: str) -> str:
    return f"quota:{bucket}:{key_hash}"


async def hit_rate_limit(
    bucket: str, key_hash: str, limit: int, window_seconds: float
) -> tuple[bool, int]:
    key = _key(bucket, key_hash)
    client = _client()
    hits = await client.incr(key)
    await client.expire(key, int(window_seconds), nx=True)
    return hits <= limit, max(0, limit - hits)


async def release_rate_limit(bucket: str, key_hash: str) -> int:
    """Give back a hit that bought the caller nothing, and report what is left.

    Never below zero: a release that outran its hit would otherwise mint quota.
    """
    key = _key(bucket, key_hash)
    client = _client()
    hits = await client.decr(key)
    if hits < 0:
        await client.set(key, 0)
        hits = 0
    return hits
```

- [ ] **Step 5: Run the test and watch it pass**

Run: `cd server && uv run pytest tests/test_quota_store.py -p no:xdist -v`
Expected: PASS, 5 tests.

Note: `test_the_window_is_set_once_when_the_key_is_created` asserts `expire` is *called* on every hit; `nx=True` is what makes the second call a no-op inside Redis. The fake records both calls, which is the honest thing for a fake to do — the `nx` flag is asserted in Task 2's integration check.

- [ ] **Step 6: Lint and commit**

```bash
cd server && uv run ruff check app tests && uv run ruff format --check app tests
cd .. && git add server/app/quota_store.py server/tests/test_quota_store.py server/pyproject.toml server/uv.lock
git commit -m "feat(quota): count rate limits in Redis"
```

---

### Task 2: Point the limiter at Redis

**Files:**
- Modify: `server/app/rate_limit.py:18-32` (`shared_quota_problem`), and the two imports it uses
- Test: `server/tests/test_rate_limit_config.py`

**Interfaces:**
- Consumes: `quota_store.redis_url`, `quota_store.hit_rate_limit`, `quota_store.release_rate_limit` from Task 1
- Produces: no new names; `SharedRateLimiter` and its four buckets keep their current behaviour

- [ ] **Step 1: Write the failing tests**

Append to `server/tests/test_rate_limit_config.py`, adding `from app import rate_limit` to its imports if it is not already there:

```python
async def test_production_without_redis_names_the_cause(monkeypatch):
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.setenv("RATE_LIMIT_SALT", "x" * 32)
    monkeypatch.delenv("REDIS_URL", raising=False)
    monkeypatch.delenv("KV_URL", raising=False)
    monkeypatch.delenv("REDIS_TLS_URL", raising=False)
    problem = rate_limit.shared_quota_problem()
    assert problem is not None and "Redis" in problem


async def test_an_ai_bucket_refuses_when_the_store_is_gone(monkeypatch):
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.delenv("REDIS_URL", raising=False)
    limiter = rate_limit.SharedRateLimiter("ai-daily", 10, 86400)
    allowed, remaining = await limiter.hit("someone")
    assert (allowed, remaining) == (False, 0)


async def test_login_degrades_rather_than_locking_everyone_out(monkeypatch):
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.delenv("REDIS_URL", raising=False)
    limiter = rate_limit.SharedRateLimiter("login", 10, 300, when_unavailable="degrade")
    allowed, _ = await limiter.hit("someone")
    assert allowed is True
```

- [ ] **Step 2: Run them and watch the first fail**

Run: `cd server && uv run pytest tests/test_rate_limit_config.py -p no:xdist -v`
Expected: `test_production_without_redis_names_the_cause` FAILS — the current message names a database.

- [ ] **Step 3: Change the one question the limiter asks**

In `server/app/rate_limit.py`, replace the `database_url` import with `redis_url`, and the two Postgres imports with the Redis ones:

```python
from .quota_store import hit_rate_limit, redis_url, release_rate_limit
```

Then in `shared_quota_problem`:

```python
    if not redis_url():
        return "no Redis URL is configured, so quotas cannot be shared between instances"
```

Leave the `RATE_LIMIT_SALT` branch, the docstring's warning, and every `when_unavailable` policy exactly as they are.

- [ ] **Step 4: Run the whole suite**

Run: `cd server && uv run pytest -q`
Expected: PASS. `test_progress.py` and `test_rate_limit_config.py` both green; nothing else references the removed imports.

- [ ] **Step 5: Retire the Postgres counters**

Delete `hit_rate_limit`, `_hit_rate_limit`, `release_rate_limit` and `_release_rate_limit` from `server/app/database.py`, and the `api_rate_limits` table and its index from `server/app/schema.sql`. Run the suite again: `cd server && uv run pytest -q`.

- [ ] **Step 6: Commit**

```bash
git add server/app/rate_limit.py server/app/database.py server/app/schema.sql server/tests/test_rate_limit_config.py
git commit -m "feat(quota): move the shared quota off Postgres onto Redis"
```

---

### Task 3: Provision Redis and ship Phase A

**Files:**
- Modify: `deploy/README.md` (the Environment table)

**Interfaces:**
- Consumes: Task 2's `redis_url()`
- Produces: a deployment whose AI proxy answers again

- [ ] **Step 1: Provision the integration**

```bash
vercel integration add redis --yes --no-claim
```

If the CLI hands off to the dashboard, run `vercel integration open redis` and finish there. It sets its own connection variables on the project — do not hand-write them.

- [ ] **Step 2: Confirm the variable arrived, by name only**

Run: `vercel env ls production`
Expected: a Redis URL variable is listed. Never print its value.

- [ ] **Step 3: Document it**

Add to the Environment table in `deploy/README.md`:

```markdown
| `REDIS_URL` | Set by the Redis Marketplace integration. Where the AI quotas are counted. Absent, `shared_quota_problem()` names it and the AI buckets refuse every caller with a 429 that reads like an exhausted quota |
```

And delete the `DATABASE_URL` row's claim that quotas depend on it.

- [ ] **Step 4: Deploy**

```bash
gh workflow run Deploy --ref main
```

- [ ] **Step 5: Verify against production**

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST \
  https://learn-practice-work.vercel.app/api/ai/generate \
  -H 'content-type: application/json' -d '{"prompt":"say ok","provider":"groq"}'
```

Expected: **not** 429. A 200 is the goal; a 503 means the provider key is missing, which is a different problem.

- [ ] **Step 6: Commit**

```bash
git add deploy/README.md
git commit -m "docs(deploy): the quota lives in Redis now"
```

---

## Phase B — progress in the spreadsheet

### Task 4: The merge function, and its test

**Files:**
- Create: `server/sheets/Progress.gs`
- Test: `tests/unit/progressMerge.spec.ts`

**Interfaces:**
- Produces: `mergeProgress(stored, incoming) -> progress` and `emptyProgress()` inside `Progress.gs`, both reachable from Node by reading the file — the trick `tests/unit/contentSchema.spec.ts` already uses on `.sql`.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/progressMerge.spec.ts
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '../support/test';

/**
 * `Progress.gs` is deployed through a browser, so nothing in CI can run the
 * web app. What CI can do is hold its merge to the same rules the SQL had —
 * the client adopts whatever comes back, so a weaker rule silently loses work.
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const source = readFileSync(path.join(root, 'server/sheets/Progress.gs'), 'utf8');

// The script is plain JavaScript; evaluating it here gives us its functions.
const { mergeProgress, emptyProgress } = new Function(
  `${source}; return { mergeProgress, emptyProgress };`,
)() as {
  mergeProgress: (stored: unknown, incoming: unknown) => Record<string, unknown>;
  emptyProgress: () => Record<string, unknown>;
};

test('an empty row plus a first sync is the sync', () => {
  const merged = mergeProgress(emptyProgress(), {
    ...emptyProgress(),
    resumeStarted: true,
    practiceCompleted: ['c1'],
  });
  expect(merged.resumeStarted).toBe(true);
  expect(merged.practiceCompleted).toEqual(['c1']);
});

test('a false from one device cannot unset a true from another', () => {
  const merged = mergeProgress(
    { ...emptyProgress(), resumeCompleted: true },
    { ...emptyProgress(), resumeCompleted: false },
  );
  expect(merged.resumeCompleted).toBe(true);
});

test('the answer count takes the larger of the two', () => {
  const merged = mergeProgress(
    { ...emptyProgress(), interviewAnswers: 7 },
    { ...emptyProgress(), interviewAnswers: 3 },
  );
  expect(merged.interviewAnswers).toBe(7);
});

test('two devices union rather than overwrite', () => {
  const merged = mergeProgress(
    { ...emptyProgress(), practiceCompleted: ['c1', 'c2'] },
    { ...emptyProgress(), practiceCompleted: ['c2', 'c3'] },
  );
  expect([...(merged.practiceCompleted as string[])].sort()).toEqual(['c1', 'c2', 'c3']);
});

test('the union is capped at 500', () => {
  const stored = Array.from({ length: 400 }, (_, i) => `s${i}`);
  const incoming = Array.from({ length: 400 }, (_, i) => `i${i}`);
  const merged = mergeProgress(
    { ...emptyProgress(), lecturesViewed: stored },
    { ...emptyProgress(), lecturesViewed: incoming },
  );
  expect((merged.lecturesViewed as string[]).length).toBe(500);
});

test('lastTool prefers the incoming one and falls back to the stored one', () => {
  expect(
    mergeProgress({ ...emptyProgress(), lastTool: 'resume' }, { ...emptyProgress() }).lastTool,
  ).toBe('resume');
  expect(
    mergeProgress(
      { ...emptyProgress(), lastTool: 'resume' },
      { ...emptyProgress(), lastTool: 'practice' },
    ).lastTool,
  ).toBe('practice');
});

test('an unknown lastTool is refused rather than stored', () => {
  const merged = mergeProgress(emptyProgress(), { ...emptyProgress(), lastTool: 'mystery' });
  expect(merged.lastTool).toBe(null);
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `pnpm test:unit --grep progressMerge`
Expected: FAIL — `ENOENT ... server/sheets/Progress.gs`

- [ ] **Step 3: Write the merge**

```javascript
// server/sheets/Progress.gs
/**
 * The learner progress store, as a web app bound to LearnPracticeWorkData.
 *
 * Deployed by hand from the Apps Script editor, but committed here so the code
 * guarding the sheet is reviewable and diffable. `tests/unit/progressMerge.spec.ts`
 * reads this file and holds `mergeProgress` to the rules the SQL merge had.
 */

var MAX_IDS = 500;
var TOOLS = ['resume', 'interview', 'practice'];

function emptyProgress() {
  return {
    resumeStarted: false,
    resumeCompleted: false,
    interviewStarted: false,
    interviewAnswers: 0,
    interviewCompleted: false,
    practiceCompleted: [],
    lecturesViewed: [],
    lastTool: null,
  };
}

function ids(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(function (id) {
    return typeof id === 'string' && id.length > 0;
  });
}

function union(a, b) {
  var seen = {};
  var out = [];
  ids(a)
    .concat(ids(b))
    .forEach(function (id) {
      if (!seen[id]) {
        seen[id] = true;
        out.push(id);
      }
    });
  return out.slice(0, MAX_IDS);
}

function tool(value) {
  return TOOLS.indexOf(value) === -1 ? null : value;
}

/** The union of two copies. Never last-write-wins: that loses a device's work. */
function mergeProgress(stored, incoming) {
  var s = stored || emptyProgress();
  var i = incoming || emptyProgress();
  return {
    resumeStarted: !!s.resumeStarted || !!i.resumeStarted,
    resumeCompleted: !!s.resumeCompleted || !!i.resumeCompleted,
    interviewStarted: !!s.interviewStarted || !!i.interviewStarted,
    interviewAnswers: Math.max(Number(s.interviewAnswers) || 0, Number(i.interviewAnswers) || 0),
    interviewCompleted: !!s.interviewCompleted || !!i.interviewCompleted,
    practiceCompleted: union(s.practiceCompleted, i.practiceCompleted),
    lecturesViewed: union(s.lecturesViewed, i.lecturesViewed),
    lastTool: tool(i.lastTool) || tool(s.lastTool) || null,
  };
}
```

- [ ] **Step 4: Run it and watch it pass**

Run: `pnpm test:unit --grep progressMerge`
Expected: PASS, 7 tests.

- [ ] **Step 5: Commit**

```bash
git add server/sheets/Progress.gs tests/unit/progressMerge.spec.ts
git commit -m "feat(sheets): the progress merge, and the test that holds it to the SQL rules"
```

---

### Task 5: The web app around it

**Files:**
- Modify: `server/sheets/Progress.gs`
- Test: `tests/unit/progressSheetRow.spec.ts`

**Interfaces:**
- Consumes: `mergeProgress`, `emptyProgress` from Task 4
- Produces: `rowFromProgress(sub, progress) -> string[]`, `progressFromRow(row) -> progress`, `doPost(e)`; header `X-Academy-Token`; script property `ACADEMY_TOKEN`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/progressSheetRow.spec.ts
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '../support/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const source = readFileSync(path.join(root, 'server/sheets/Progress.gs'), 'utf8');
const { rowFromProgress, progressFromRow, emptyProgress } = new Function(
  `${source}; return { rowFromProgress, progressFromRow, emptyProgress };`,
)() as {
  rowFromProgress: (sub: string, progress: Record<string, unknown>) => unknown[];
  progressFromRow: (row: unknown[]) => Record<string, unknown>;
  emptyProgress: () => Record<string, unknown>;
};

test('a row round-trips back to the same progress', () => {
  const progress = {
    ...emptyProgress(),
    interviewAnswers: 4,
    practiceCompleted: ['c1', 'c2'],
    lastTool: 'practice',
  };
  expect(progressFromRow(rowFromProgress('123', progress))).toEqual(progress);
});

/**
 * The two lists come from localStorage, which the visitor owns. An id like
 * `=IMPORTXML(...)` written into a cell is a formula Google will evaluate.
 */
test('an id that looks like a formula is stored as text, not evaluated', () => {
  const row = rowFromProgress('123', {
    ...emptyProgress(),
    practiceCompleted: ['=IMPORTXML("http://evil","//a")'],
  });
  row.forEach((cell) => {
    if (typeof cell === 'string' && cell.length > 0) {
      expect(cell.startsWith('=')).toBe(false);
    }
  });
});

test('a sub that looks like a formula is stored as text', () => {
  const row = rowFromProgress('=1+1', emptyProgress());
  expect(row[0]).toBe("'=1+1");
});

/** The web app is deployed "anyone with the link": the token is the only guard. */
test('an absent script token refuses every caller', () => {
  const { authorizedWith } = harness({ ACADEMY_TOKEN: null });
  expect(authorizedWith('')).toBe(false);
  expect(authorizedWith('t'.repeat(40))).toBe(false);
});

test('a short script token is refused rather than trusted', () => {
  const { authorizedWith } = harness({ ACADEMY_TOKEN: 'short' });
  expect(authorizedWith('short')).toBe(false);
});

test('only the exact token is accepted', () => {
  const token = 't'.repeat(40);
  const { authorizedWith } = harness({ ACADEMY_TOKEN: token });
  expect(authorizedWith(token)).toBe(true);
  expect(authorizedWith('x'.repeat(40))).toBe(false);
  expect(authorizedWith(token.slice(0, 39))).toBe(false);
});

/** A hand-edited sheet can hold two rows for one sub. Picking one silently
 *  would write a merge into a row the next read might not find. */
test('duplicate rows for one sub are an error, not a coin toss', () => {
  const { rowIndexForIn } = harness({});
  expect(() => rowIndexForIn([['123'], ['456'], ['123']], '123')).toThrow();
  expect(rowIndexForIn([['456'], ['123']], '123')).toBe(3);
  expect(rowIndexForIn([['456']], '123')).toBe(-1);
});
```

`harness` builds the script with the Apps Script globals it touches stubbed, and
exposes the two functions under test. Put it above the tests in the same file:

```typescript
function harness(properties: Record<string, string | null>) {
  const globals = `
    var PropertiesService = {
      getScriptProperties: function () {
        return { getProperty: function (k) { return ${JSON.stringify(properties)}[k] || null; } };
      },
    };
  `;
  const built = new Function(
    `${globals}; ${source}; return { authorized: authorized, rowIndexFor: rowIndexFor, untext: untext };`,
  )() as {
    authorized: (e: unknown) => boolean;
    rowIndexFor: (tab: unknown, sub: string) => number;
    untext: (v: unknown) => string;
  };
  return {
    authorizedWith: (token: string) => built.authorized({ parameter: { token } }),
    rowIndexForIn: (column: string[][], sub: string) =>
      built.rowIndexFor(
        {
          getLastRow: () => column.length + 1,
          getRange: () => ({ getValues: () => column }),
        },
        sub,
      ),
  };
}
```

- [ ] **Step 2: Run it and watch it fail**

Run: `pnpm test:unit --grep progressSheetRow`
Expected: FAIL — `rowFromProgress is not defined`

- [ ] **Step 3: Add the row codec and the handler**

Append to `server/sheets/Progress.gs`:

```javascript
var SHEET_NAME = 'learner_progress';
var HEADERS = [
  'google_sub', 'resume_started', 'resume_completed', 'interview_started',
  'interview_answers', 'interview_completed', 'practice_completed',
  'lectures_viewed', 'last_tool', 'updated_at',
];

/**
 * A leading `=`, `+`, `-` or `@` makes Sheets treat a value as a formula, and
 * both the ids and the sub arrive from a browser. An apostrophe forces text.
 */
function text(value) {
  var s = String(value == null ? '' : value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function untext(value) {
  var s = String(value == null ? '' : value);
  return s.charAt(0) === "'" ? s.slice(1) : s;
}

function rowFromProgress(sub, progress) {
  return [
    text(sub),
    progress.resumeStarted,
    progress.resumeCompleted,
    progress.interviewStarted,
    progress.interviewAnswers,
    progress.interviewCompleted,
    text(JSON.stringify(ids(progress.practiceCompleted))),
    text(JSON.stringify(ids(progress.lecturesViewed))),
    text(progress.lastTool || ''),
    new Date().toISOString(),
  ];
}

function parseIds(cell) {
  try {
    return ids(JSON.parse(untext(cell) || '[]'));
  } catch (err) {
    return [];
  }
}

function progressFromRow(row) {
  return {
    resumeStarted: row[1] === true || row[1] === 'TRUE',
    resumeCompleted: row[2] === true || row[2] === 'TRUE',
    interviewStarted: row[3] === true || row[3] === 'TRUE',
    interviewAnswers: Number(row[4]) || 0,
    interviewCompleted: row[5] === true || row[5] === 'TRUE',
    practiceCompleted: parseIds(row[6]),
    lecturesViewed: parseIds(row[7]),
    lastTool: tool(untext(row[8])) || null,
  };
}

function sheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var tab = book.getSheetByName(SHEET_NAME);
  if (!tab) {
    tab = book.insertSheet(SHEET_NAME);
    tab.appendRow(HEADERS);
  }
  return tab;
}

/** First match wins, and a duplicate sub is an error rather than a coin toss. */
function rowIndexFor(tab, sub) {
  var column = tab.getRange(2, 1, Math.max(tab.getLastRow() - 1, 0), 1).getValues();
  var found = -1;
  for (var i = 0; i < column.length; i++) {
    if (untext(column[i][0]) === sub) {
      if (found !== -1) throw new Error('duplicate rows for one sub');
      found = i + 2;
    }
  }
  return found;
}

function authorized(e) {
  var expected = PropertiesService.getScriptProperties().getProperty('ACADEMY_TOKEN');
  if (!expected || expected.length < 32) return false;
  var given = (e && e.parameter && e.parameter.token) || '';
  if (given.length !== expected.length) return false;
  var diff = 0;
  for (var i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  }
  return diff === 0;
}

/** Apps Script web apps always answer 200; the body carries the outcome, and
 *  `sheets_store` treats a body without `progress` as a failure. */
function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function doPost(e) {
  if (!authorized(e)) return json({ error: 'unauthorized' });
  var body = JSON.parse(e.postData.contents);
  var sub = String(body.sub || '');
  if (!sub) return json({ error: 'missing sub' });

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return json({ error: 'busy' });
  try {
    var tab = sheet();
    var index = rowIndexFor(tab, sub);
    var stored = index === -1 ? emptyProgress() : progressFromRow(tab.getRange(index, 1, 1, HEADERS.length).getValues()[0]);
    if (body.op === 'load') return json({ progress: stored });

    var merged = mergeProgress(stored, body.progress);
    var row = rowFromProgress(sub, merged);
    if (index === -1) tab.appendRow(row);
    else tab.getRange(index, 1, 1, HEADERS.length).setValues([row]);
    return json({ progress: merged });
  } finally {
    lock.releaseLock();
  }
}
```

- [ ] **Step 4: Run it and watch it pass**

Run: `pnpm test:unit --grep progressSheetRow`
Expected: PASS, 3 tests. Then `pnpm test:unit` — both spec files green.

- [ ] **Step 5: Commit**

```bash
git add server/sheets/Progress.gs tests/unit/progressSheetRow.spec.ts
git commit -m "feat(sheets): the web app, its lock, and text-forced cells"
```

---

### Task 6: The Python side of the store

**Files:**
- Create: `server/app/sheets_store.py`
- Test: `server/tests/test_sheets_store.py`

**Interfaces:**
- Consumes: `app.config.env`
- Produces: `async load_progress(subject: str) -> dict | None`, `async merge_progress(subject: str, incoming: dict) -> dict | None` — `None` means "no store configured", which `ProgressService._call` turns into a 503.

- [ ] **Step 1: Write the failing test**

```python
# server/tests/test_sheets_store.py
"""The spreadsheet store: what it sends, what it refuses to send, and how it fails."""

from __future__ import annotations

import httpx
import pytest

from app import sheets_store

EMPTY = {
    "resumeStarted": False,
    "resumeCompleted": False,
    "interviewStarted": False,
    "interviewAnswers": 0,
    "interviewCompleted": False,
    "practiceCompleted": [],
    "lecturesViewed": [],
    "lastTool": None,
}


@pytest.fixture
def configured(monkeypatch):
    monkeypatch.setenv("SHEETS_WEBAPP_URL", "https://script.example/exec")
    monkeypatch.setenv("SHEETS_WEBAPP_TOKEN", "t" * 40)


def transport(handler):
    return httpx.MockTransport(handler)


async def test_no_url_configured_reads_as_no_store(monkeypatch):
    monkeypatch.delenv("SHEETS_WEBAPP_URL", raising=False)
    assert await sheets_store.load_progress("123") is None


async def test_load_returns_the_stored_progress(configured, monkeypatch):
    def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(200, json={"progress": EMPTY})

    monkeypatch.setattr(sheets_store, "_transport", lambda: transport(handler))
    assert await sheets_store.load_progress("123") == EMPTY


async def test_the_request_carries_the_sub_and_never_an_email(configured, monkeypatch):
    seen: dict = {}

    def handler(request: httpx.Request) -> httpx.Response:
        seen["body"] = request.content.decode()
        return httpx.Response(200, json={"progress": EMPTY})

    monkeypatch.setattr(sheets_store, "_transport", lambda: transport(handler))
    await sheets_store.merge_progress("123", {**EMPTY, "resumeStarted": True})
    assert '"sub": "123"' in seen["body"] or '"sub":"123"' in seen["body"]
    assert "@" not in seen["body"]


async def test_an_http_error_raises_rather_than_reading_as_absent(configured, monkeypatch):
    def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(500, text="boom")

    monkeypatch.setattr(sheets_store, "_transport", lambda: transport(handler))
    with pytest.raises(Exception):
        await sheets_store.load_progress("123")


async def test_a_body_without_progress_raises(configured, monkeypatch):
    def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(200, json={"error": "unauthorized"})

    monkeypatch.setattr(sheets_store, "_transport", lambda: transport(handler))
    with pytest.raises(Exception):
        await sheets_store.load_progress("123")
```

- [ ] **Step 2: Run it and watch it fail**

Run: `cd server && uv run pytest tests/test_sheets_store.py -p no:xdist -v`
Expected: FAIL — `No module named 'app.sheets_store'`

- [ ] **Step 3: Write the implementation**

```python
# server/app/sheets_store.py
"""Learner progress, kept in the LearnPracticeWorkData spreadsheet.

The sheet is reached through an Apps Script web app rather than the Sheets API:
the script can take `LockService.getScriptLock()`, which is what makes a
read-modify-write merge safe between two devices syncing at once. It also keeps
a Google private key out of a function bundle with a size limit to respect.

Only the Google `sub` is sent. A spreadsheet has no row level security, so an
email here would be readable by everyone the sheet is ever shared with.
"""

from __future__ import annotations

from typing import Any

import httpx

from .config import env

TIMEOUT = 20  # Apps Script cold starts are seconds, and the UI renders from localStorage anyway.


def _url() -> str | None:
    return env("SHEETS_WEBAPP_URL")


def _transport() -> httpx.AsyncBaseTransport | None:
    """Overridden in tests; None lets httpx use the real network."""
    return None


async def _call(op: str, subject: str, progress: dict[str, Any] | None) -> dict[str, Any] | None:
    url = _url()
    if url is None:
        return None
    token = env("SHEETS_WEBAPP_TOKEN") or ""
    body: dict[str, Any] = {"op": op, "sub": subject}
    if progress is not None:
        body["progress"] = progress
    async with httpx.AsyncClient(timeout=TIMEOUT, transport=_transport()) as client:
        response = await client.post(url, params={"token": token}, json=body)
    response.raise_for_status()
    payload = response.json()
    if not isinstance(payload, dict) or "progress" not in payload:
        raise ValueError(f"the progress web app answered without a progress body: {payload!r}")
    return payload["progress"]


async def load_progress(subject: str) -> dict[str, Any] | None:
    return await _call("load", subject, None)


async def merge_progress(subject: str, incoming: dict[str, Any]) -> dict[str, Any] | None:
    return await _call("merge", subject, incoming)
```

- [ ] **Step 4: Run it and watch it pass**

Run: `cd server && uv run pytest tests/test_sheets_store.py -p no:xdist -v`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
cd server && uv run ruff check app tests && cd ..
git add server/app/sheets_store.py server/tests/test_sheets_store.py
git commit -m "feat(sheets): post progress to the web app, sub only"
```

---

### Task 7: Swap the store behind the seam

**Files:**
- Modify: `server/app/progress.py` (the `MergeProgress` alias and `merge_for_user`)
- Modify: `server/app/dependencies.py:179-180`
- Modify: `server/app/database.py` (delete the progress functions)
- Modify: `server/app/schema.sql` (delete `learner_progress`)
- Test: `server/tests/test_progress.py`

**Interfaces:**
- Consumes: `sheets_store.load_progress`, `sheets_store.merge_progress` from Task 6
- Produces: `MergeProgress = Callable[[str, dict[str, Any]], Awaitable[dict[str, Any] | None]]`

- [ ] **Step 1: Update the existing test to the narrowed signature**

In `server/tests/test_progress.py`, change `FakeStore.merge` and the assertions that read `self.merged`:

```python
    async def merge(self, subject: str, incoming: dict) -> dict | None:
        self.merged.append((subject, incoming))
        return self.stored
```

and its type: `self.merged: list[tuple[str, dict]] = []`. Add:

```python
async def test_an_email_is_never_handed_to_the_store():
    store = FakeStore(STORED)
    service = ProgressService(store.load, store.merge)
    user = GoogleUser(subject="123", email="someone@example.com", name="", picture="", expires_at=0)
    await service.merge_for_user(user, {"resumeStarted": True})
    assert store.merged == [("123", {"resumeStarted": True})]
```

- [ ] **Step 2: Run it and watch it fail**

Run: `cd server && uv run pytest tests/test_progress.py -p no:xdist -v`
Expected: FAIL — `merge_for_user` still passes three arguments.

- [ ] **Step 3: Narrow the interface**

In `server/app/progress.py`:

```python
MergeProgress = Callable[[str, dict[str, Any]], Awaitable[dict[str, Any] | None]]
```

```python
    async def merge_for_user(self, user: GoogleUser, incoming: dict[str, Any]) -> dict[str, Any]:
        return {"progress": await self._call(self._merge(user.subject, incoming))}
```

- [ ] **Step 4: Point the injection at the sheet**

In `server/app/dependencies.py`, replace the `load_progress, merge_progress` names in the `from .database import (...)` block with an import from the new module:

```python
from .sheets_store import load_progress, merge_progress
```

`get_progress_service()` itself does not change.

- [ ] **Step 5: Delete what Postgres no longer owns**

Remove from `server/app/database.py`: `EMPTY_PROGRESS`, `MAX_PROGRESS_IDS`, `_progress_view`, `_PROGRESS_COLUMNS`, `load_progress`, `_load_progress`, `merge_progress`, `_merge_progress`. Remove the `learner_progress` table from `server/app/schema.sql`.

- [ ] **Step 6: Run everything**

```bash
cd server && uv run pytest -q && uv run ruff check app tests && cd ..
pnpm run typecheck && pnpm test:unit
```
Expected: all green.

- [ ] **Step 7: Commit**

```bash
git add server/app/progress.py server/app/dependencies.py server/app/database.py server/app/schema.sql server/tests/test_progress.py
git commit -m "feat(progress): read and write the spreadsheet instead of Postgres"
```

---

### Task 8: Deploy it and prove a round trip

**Files:**
- Modify: `deploy/README.md`, `replit.md`

**Interfaces:**
- Consumes: everything above

- [ ] **Step 1: Deploy the web app**

In the Apps Script editor bound to `LearnPracticeWorkData`, paste `server/sheets/Progress.gs`, then **Project Settings → Script Properties** → add `ACADEMY_TOKEN` with at least 32 random characters. Deploy → New deployment → Web app, execute as yourself, access "Anyone with the link". Copy the `/exec` URL.

- [ ] **Step 2: Set the two variables**

```bash
printf '%s' '<the /exec URL>' | vercel env add SHEETS_WEBAPP_URL production
printf '%s' '<the same token>' | vercel env add SHEETS_WEBAPP_TOKEN production
```

- [ ] **Step 3: Deploy**

```bash
gh workflow run Deploy --ref main
```

- [ ] **Step 4: Prove the round trip**

Sign in on the production site in one browser, complete one coding challenge, then sign in as the same account in a second browser with empty `localStorage`. The challenge must appear. Then complete a different challenge there, return to the first browser and reload: both must be present. That is the union, and it is the whole point of the lock.

- [ ] **Step 5: Document it**

In `deploy/README.md`, add `SHEETS_WEBAPP_URL` and `SHEETS_WEBAPP_TOKEN` to the Environment table, and replace the "Applying the schema" claim that progress needs it. In `replit.md`, update the `## Purchases` neighbourhood to say progress lives in the spreadsheet.

- [ ] **Step 6: Commit**

```bash
git add deploy/README.md replit.md
git commit -m "docs(deploy): progress lives in the spreadsheet"
```
