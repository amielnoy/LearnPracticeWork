import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test, expect } from '../support/test';

/**
 * Three files describe the academy's content tables and none of them imports
 * the others: `content_store.py` asks PostgREST for exact `select=` lists,
 * `academy-schema.sql` creates the columns, and `academy-seed.sql` fills them.
 * `lecture_examples` is checked here too — the decks read it directly rather
 * than through the API, so it has no `select=` list, but it still has to be
 * created and filled by the same two files.
 *
 * A rename made in one of the three is not an error anywhere — the seed
 * succeeds, the tables exist, and the API returns a 503 that reads like an
 * outage. That is the failure this suite exists to make loud, and it needs no
 * database to do it.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const read = (p: string) => readFileSync(path.join(root, p), 'utf8');

const store = read('server/app/content_store.py');
const schema = read('scripts/src/academy-schema.sql');
const seed = read('scripts/src/academy-seed.sql');

/** Every `create table` in the schema, as table → column names. */
function schemaColumns(sql: string): Map<string, Set<string>> {
  const tables = new Map<string, Set<string>>();
  const re = /create table if not exists (\w+) \(([\s\S]*?)\n\);/g;
  for (const [, table, body] of sql.matchAll(re)) {
    const columns = body
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('--') && !line.startsWith('unique'))
      .map(line => line.split(/\s+/)[0]!)
      .filter(Boolean);
    tables.set(table, new Set(columns));
  }
  return tables;
}

/** Every `insert into` in the seed, as table → column names. */
function seedColumns(sql: string): Map<string, Set<string>> {
  const tables = new Map<string, Set<string>>();
  for (const [, table, cols] of sql.matchAll(/insert into (\w+) \(([\w, ]+)\)/g)) {
    tables.set(table!, new Set(cols!.split(',').map(c => c.trim())));
  }
  return tables;
}

/** Each collection in `content_store.py`, as the API's own view of its tables. */
interface Collection {
  parentTable: string;
  parentSelect: string[];
  childTable: string;
  childSelect: string[];
  foreignKey: string;
}

function collections(python: string): Collection[] {
  const found: Collection[] = [];
  const re =
    /parent_table="(\w+)",\s*parent_select="([\w,]+)",[\s\S]*?child_table="(\w+)",\s*child_select="([\w,]+)",[\s\S]*?child_foreign_key="(\w+)"/g;
  for (const [, parentTable, parentSelect, childTable, childSelect, foreignKey] of python.matchAll(
    re,
  )) {
    found.push({
      parentTable: parentTable!,
      parentSelect: parentSelect!.split(','),
      childTable: childTable!,
      childSelect: childSelect!.split(','),
      foreignKey: foreignKey!,
    });
  }
  return found;
}

const inSchema = schemaColumns(schema);
const inSeed = seedColumns(seed);
const specs = collections(store);

test('the schema covers all three collections, parents and children', () => {
  expect(specs).toHaveLength(3);
  expect([...inSchema.keys()].sort()).toEqual(
    [
      'coding_challenge_levels',
      'coding_challenges',
      'lecture_examples',
      'lecture_items',
      'lecture_tracks',
      'question_bank_items',
      'question_bank_stages',
    ].sort(),
  );
});

test.describe('every column the API selects exists in the schema', () => {
  for (const spec of collections(store)) {
    test(spec.parentTable, () => {
      const columns = inSchema.get(spec.parentTable);
      expect(columns, `${spec.parentTable} is not created by the schema`).toBeDefined();
      for (const column of spec.parentSelect)
        expect(columns!.has(column), `${spec.parentTable}.${column}`).toBe(true);
      // Parents carry the language: the API filters them with `lang=eq.<lang>`.
      expect(columns!.has('lang'), `${spec.parentTable}.lang`).toBe(true);
    });

    test(spec.childTable, () => {
      const columns = inSchema.get(spec.childTable);
      expect(columns, `${spec.childTable} is not created by the schema`).toBeDefined();
      for (const column of spec.childSelect)
        expect(columns!.has(column), `${spec.childTable}.${column}`).toBe(true);
      expect(columns!.has(spec.foreignKey), `${spec.childTable}.${spec.foreignKey}`).toBe(true);
    });
  }
});

test('every column the seed writes exists in the schema', () => {
  for (const [table, columns] of inSeed) {
    const defined = inSchema.get(table);
    expect(defined, `${table} is written by the seed but never created`).toBeDefined();
    for (const column of columns) expect(defined!.has(column), `${table}.${column}`).toBe(true);
  }
});

test('the seed fills every table the schema creates', () => {
  // A table created and never seeded is a collection the API will report as
  // unavailable — the same symptom as no database at all.
  for (const table of inSchema.keys())
    expect(inSeed.has(table), `${table} is created but never seeded`).toBe(true);
});

test('reads are granted to the anon role the API uses', () => {
  // The API reads with SUPABASE_ANON_KEY. Without the grant and the policy the
  // tables are full and every response is empty.
  expect(schema).toContain('grant select on table %I to anon');
  expect(schema).toContain('for select using (true)');
  expect(schema.match(/enable row level security/g) ?? []).toHaveLength(7);
});
