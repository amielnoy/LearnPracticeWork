/**
 * One-off extraction of AI Testing Academy content (question bank, coding
 * challenges, lecture series) from hardcoded TS sources into JSON, so it can
 * be seeded into Supabase. Not part of the app's runtime — run manually with
 * `pnpm --filter @workspace/scripts exec tsx src/extract-academy-content.ts`.
 */
import { writeFileSync } from 'node:fs';
import { EN_BANK, HE_BANK } from '../../artifacts/ai-testing-academy/src/lib/questionBank';
import { en } from '../../artifacts/ai-testing-academy/src/lib/locales/en';
import { he } from '../../artifacts/ai-testing-academy/src/lib/locales/he';
import {
  EN as LECTURE_EN,
  HE as LECTURE_HE,
  lectureHref,
  type LectureData,
  type TrackData,
} from '../../artifacts/ai-testing-academy/src/lib/lectures';

/**
 * A lecture stores a deck number, not a URL — the client turns one into the
 * other at render time with `lectureHref()`, against whatever origin that build
 * was given. The database has no such moment: `/api/content/lecture-series`
 * returns a `url` or the card has nothing to open, so the href is resolved here
 * and the origin is frozen into the row.
 *
 * That is why `VITE_SITE_ORIGIN` matters when generating a seed, and why it is
 * the same variable the client and the prerender generator read. Extracting the
 * records raw — which is what this did until the seed was regenerated and every
 * lecture link vanished — writes cards that claim to be live and lead nowhere.
 */
const origin = process.env.VITE_SITE_ORIGIN;

function resolveTrack(track: TrackData, lang: 'en' | 'he') {
  return {
    ...track,
    lectures: track.lectures.map((lecture: LectureData) => {
      const url = lectureHref(lecture, lang, origin);
      const { deck: _deck, ...rest } = lecture;
      return url ? { ...rest, url } : rest;
    }),
  };
}

const out = {
  questionBank: {
    en: EN_BANK.stages,
    he: HE_BANK.stages,
  },
  codingChallenges: {
    en: en.codingChallenges.levels,
    he: he.codingChallenges.levels,
  },
  lectureSeries: {
    en: LECTURE_EN.tracks.map(track => resolveTrack(track, 'en')),
    he: LECTURE_HE.tracks.map(track => resolveTrack(track, 'he')),
  },
};

// Fail here rather than writing a file whose defect only surfaces once it is in
// the database: a lecture marked ready with no href renders as a live card that
// opens nothing.
const dead = [...out.lectureSeries.en, ...out.lectureSeries.he].flatMap(track =>
  track.lectures.filter(lecture => lecture.ready && !('url' in lecture && lecture.url)),
);
if (dead.length > 0) {
  throw new Error(
    `${dead.length} ready lecture(s) resolved to no URL: ${dead.map(l => l.num).join(', ')}. ` +
      'Check `deck` in lectures.ts, or set VITE_SITE_ORIGIN.',
  );
}

// Trailing newline, so a regeneration that changes nothing shows as no change.
writeFileSync(
  new URL('./academy-content.json', import.meta.url),
  JSON.stringify(out, null, 2) + '\n',
);
console.log('Wrote academy-content.json');
