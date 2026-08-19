import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@playwright/test';

/**
 * `scripts/src/academy-content.json` is the canonical source that
 * `generate-academy-seed-sql.ts` turns into the Supabase seed — and, once
 * seeded, `/api/content/lecture-series` serves it straight to the Lecture
 * Series section, overriding the bundled `LectureSeries.tsx` fallback.
 *
 * A lecture marked `ready` with no `url` renders as a dead end: the card
 * claims to be live but has nothing to open. That happened for real once —
 * a seed had every AI Testing lecture past the first marked not-ready — so
 * this guards the seed input itself, not just the runtime fallback path.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.resolve(here, '..', '..', 'scripts', 'src', 'academy-content.json');

type LectureItem = { num: number; ready: boolean; title: string; desc: string; url?: string };
type Track = { title: string; lead: string; lectures: LectureItem[] };
type Content = { lectureSeries: { en: Track[]; he: Track[] } };

const content = JSON.parse(readFileSync(contentPath, 'utf-8')) as Content;
const allTracks = [
  ...content.lectureSeries.en.map(track => ({ lang: 'en', track })),
  ...content.lectureSeries.he.map(track => ({ lang: 'he', track })),
];

for (const { lang, track } of allTracks) {
  test(`every ready lecture in "${track.title}" (${lang}) has a non-empty url`, () => {
    for (const lecture of track.lectures) {
      if (lecture.ready) {
        expect(lecture.url, `lecture ${lecture.num} of "${track.title}" (${lang})`).toBeTruthy();
      }
    }
  });
}

test('the AI Testing track is fully ready end to end in both languages', () => {
  for (const lang of ['en', 'he'] as const) {
    const track = content.lectureSeries[lang].find(t => t.lectures.length === 10);
    expect(track, `an AI Testing track exists for ${lang}`).toBeTruthy();
    for (const lecture of track!.lectures) {
      expect(lecture.ready, `lecture ${lecture.num} (${lang}) is ready`).toBe(true);
      expect(lecture.url, `lecture ${lecture.num} (${lang}) has a url`).toBeTruthy();
    }
  }
});
