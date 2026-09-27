import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '../support/test';

/**
 * The deployment documentation is the only place a variable exists before it is
 * set, so a statement that has gone false there is not a cosmetic problem: an
 * operator configures what the table names and nothing else. Two of these are
 * invisible from outside by construction — an unconfigured progress store 503s
 * and the client keeps using `localStorage`, and a table the README forgets is
 * a table nobody applies — so the claims are pinned here instead.
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (p: string) => readFileSync(path.join(root, p), 'utf8');

const readme = read('deploy/README.md');
const apiSchema = read('server/app/schema.sql');
const seedScript = read('scripts/src/seed-academy-content.ts');

test('every table the API schema creates is named in the ownership table', () => {
  const created = [...apiSchema.matchAll(/CREATE TABLE IF NOT EXISTS (\w+)/g)].map(m => m[1]);
  const ownership = readme
    .split('\n')
    .filter(line => line.includes('`server/app/schema.sql`') && line.startsWith('|'));

  expect(created.length).toBeGreaterThan(0);
  expect(ownership).toHaveLength(1);
  for (const table of created) {
    expect(ownership[0], `${table} is created but not listed as owned`).toContain(table);
  }
});

/**
 * Unconfigured, `/api/progress` answers 503 and the client carries on from
 * `localStorage` — so a deployment with no progress store looks exactly like a
 * working one to a visitor and to whoever deployed it.
 */
test('both variables the progress store needs are documented', () => {
  for (const name of ['SHEETS_WEBAPP_URL', 'SHEETS_WEBAPP_TOKEN']) {
    const row = readme.split('\n').find(line => line.startsWith(`| \`${name}\``));
    expect(row, `${name} has no row in the environment table`).toBeTruthy();
  }
  expect(readme).toContain('ACADEMY_TOKEN');
});

/** Both tables were deleted by the move to Redis and to a spreadsheet. */
test('nothing still claims the API schema owns progress or quota tables', () => {
  for (const [name, text] of [
    ['deploy/README.md', readme],
    ['scripts/src/seed-academy-content.ts', seedScript],
  ] as const) {
    expect(text, `${name} still credits schema.sql with learner progress`).not.toMatch(
      /schema\.sql` (?:is|owns)[^|\n]*learner progress/i,
    );
    expect(text, `${name} still credits schema.sql with quota rows`).not.toContain('quota rows');
  }
});
