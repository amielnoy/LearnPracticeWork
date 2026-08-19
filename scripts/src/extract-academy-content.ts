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
} from '../../artifacts/ai-testing-academy/src/lib/lectures';

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
    en: LECTURE_EN.tracks,
    he: LECTURE_HE.tracks,
  },
};

writeFileSync(new URL('./academy-content.json', import.meta.url), JSON.stringify(out, null, 2));
console.log('Wrote academy-content.json');
