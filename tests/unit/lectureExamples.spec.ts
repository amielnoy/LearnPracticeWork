import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test, expect } from '../support/test';

/**
 * The lecture decks fetch their worked-example slides out of Supabase, and a
 * missing row is not a blank space — `fetchLectureExample` calls `.single()`,
 * so nothing to return is an error and the slide renders "Example content
 * unavailable" over an empty panel.
 *
 * That is exactly how the table came to be live and empty: the decks were
 * written against a Supabase project that had the content, the content never
 * reached this repository, and no build, test or type ever mentioned it. Two
 * numbers decide whether a slide finds its row — `LECTURE_ITEM_ID` in the
 * deck's `examplesClient.ts` and the position each slide passes — and both are
 * literals sitting far away from the seed that has to match them.
 *
 * So this reads the call sites and checks them against the content file. It
 * needs no database: the failure it exists to catch is a disagreement between
 * two files, and it is visible in the two files.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const read = (p: string) => readFileSync(path.join(root, p), 'utf8');

interface Example {
  deck: number;
  slide: string;
  position: number;
  en: { title: string; bullets: string[]; panels: { rows: { label: string }[] }[] };
  he: { title: string; bullets: string[]; panels: { rows: { label: string }[] }[] };
}

const content = JSON.parse(read('scripts/src/lecture-examples.json')) as { examples: Example[] };
const seed = read('scripts/src/academy-seed.sql');

/** Every slide that fetches an example, as deck number → positions it asks for. */
function callSites(): Map<number, { position: number; slide: string }[]> {
  const found = new Map<number, { position: number; slide: string }[]>();
  for (const entry of readdirSync(path.join(root, 'artifacts'))) {
    const deck = /^ai-testing-lecture-(\d+)$/.exec(entry);
    const slides = path.join(root, 'artifacts', entry, 'src/pages/slides');
    if (!deck || !existsSync(slides)) continue;
    for (const file of readdirSync(slides).filter(name => name.endsWith('.tsx'))) {
      const source = readFileSync(path.join(slides, file), 'utf8');
      const call = /fetchLectureExample\((\d+)\)/.exec(source);
      if (!call) continue;
      const list = found.get(Number(deck[1])) ?? [];
      list.push({ position: Number(call[1]), slide: path.basename(file, '.tsx') });
      found.set(Number(deck[1]), list);
    }
  }
  return found;
}

/** The `lecture_item_id` each deck pins for itself, per language. */
function pinnedItemIds(deck: number): { en: number; he: number } {
  const client = read(`artifacts/ai-testing-lecture-${deck}/src/lib/examplesClient.ts`);
  const match = /LECTURE_ITEM_ID[^=]*=\s*\{\s*en:\s*(\d+),\s*he:\s*(\d+)\s*\}/.exec(client);
  if (!match) throw new Error(`ai-testing-lecture-${deck} does not pin a LECTURE_ITEM_ID`);
  return { en: Number(match[1]), he: Number(match[2]) };
}

/** `(lecture_item_id, lang, position)` for every row the seed writes. */
const seeded = new Set(
  [
    ...seed.matchAll(
      /insert into lecture_examples \([^)]*\) values \((\d+), (\d+), '(en|he)', (\d+),/g,
    ),
  ].map(([, , itemId, lang, position]) => `${itemId}/${lang}/${position}`),
);

const sites = callSites();

test('every deck that fetches examples has content for every slide that asks', () => {
  const missing: string[] = [];
  for (const [deck, slides] of sites) {
    for (const { position, slide } of slides) {
      const has = content.examples.some(e => e.deck === deck && e.position === position);
      if (!has) missing.push(`lecture ${deck} position ${position} (${slide})`);
    }
  }
  expect(missing, `no content for: ${missing.join(', ')}`).toEqual([]);
});

test('no example is written for a slide that never asks for one', () => {
  const orphans = content.examples.filter(
    example => !(sites.get(example.deck) ?? []).some(site => site.position === example.position),
  );
  expect(
    orphans.map(o => `lecture ${o.deck} position ${o.position} (${o.slide})`),
    'content with no call site is content nobody will ever see',
  ).toEqual([]);
});

test.describe('the seed writes the row each deck goes looking for', () => {
  for (const [deck, slides] of callSites()) {
    test(`ai-testing-lecture-${deck}`, () => {
      const pinned = pinnedItemIds(deck);
      const absent: string[] = [];
      for (const { position, slide } of slides) {
        for (const lang of ['en', 'he'] as const) {
          const key = `${pinned[lang]}/${lang}/${position}`;
          if (!seeded.has(key)) absent.push(`${slide} → ${key}`);
        }
      }
      expect(absent, `the seed has no row at: ${absent.join(', ')}`).toEqual([]);
    });
  }
});

test('every example carries both languages, with bullets and a panel', () => {
  for (const example of content.examples) {
    const where = `lecture ${example.deck} position ${example.position}`;
    for (const lang of ['en', 'he'] as const) {
      const text = example[lang];
      expect(text.title.trim(), `${where} has no ${lang} title`).not.toBe('');
      expect(text.bullets.length, `${where} has no ${lang} bullets`).toBeGreaterThan(0);
      expect(text.panels[0]?.rows.length, `${where} has no ${lang} panel rows`).toBeGreaterThan(0);
    }
    // The panels are rendered side by side by language; a row present in one
    // and absent in the other is a slide that changes shape when it is
    // translated, which is a content bug rather than a rendering one.
    expect(
      example.en.panels[0]?.rows.map(row => row.label),
      `${where} has different panel rows in each language`,
    ).toEqual(example.he.panels[0]?.rows.map(row => row.label));
  }
});
