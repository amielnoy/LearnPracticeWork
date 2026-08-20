import type { StageData } from './questionBank';
import type { ChallengeLevel } from './challenges';
import type { TrackData } from './lectures';

/**
 * Live content for the question bank, coding challenges, and lecture series
 * now lives in Supabase (see the `question_bank_*`, `coding_challenge_*`, and
 * `lecture_*` tables) instead of only in these TS source files, so editing a
 * question or adding a challenge no longer requires a code deploy.
 *
 * These fetchers go through the api-server's `/api/content/*` routes (which
 * hold the Supabase credentials server-side) rather than talking to Supabase
 * directly from the browser — the same pattern already used for `/api/ai/*`.
 *
 * Every caller treats a failure here as "no remote content yet" and falls
 * back to the hardcoded EN/HE banks bundled in this app, so a slow, offline,
 * or not-yet-seeded Supabase project never breaks the page — it just serves
 * the content that shipped with the build until the network call succeeds.
 */

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${path} responded with ${res.status}`);
  return (await res.json()) as T;
}

export async function fetchQuestionBankStages(lang: 'en' | 'he'): Promise<StageData[]> {
  const data = await getJson<{ stages: StageData[] }>(`/api/content/question-bank?lang=${lang}`);
  if (!Array.isArray(data.stages) || data.stages.length === 0) {
    throw new Error('Empty question bank response');
  }
  return data.stages;
}

export async function fetchChallengeLevels(lang: 'en' | 'he'): Promise<ChallengeLevel[]> {
  const data = await getJson<{ levels: ChallengeLevel[] }>(
    `/api/content/coding-challenges?lang=${lang}`,
  );
  if (!Array.isArray(data.levels) || data.levels.length === 0) {
    throw new Error('Empty coding challenges response');
  }
  return data.levels;
}

export async function fetchLectureTracks(lang: 'en' | 'he'): Promise<TrackData[]> {
  const data = await getJson<{ tracks: TrackData[] }>(`/api/content/lecture-series?lang=${lang}`);
  if (!Array.isArray(data.tracks) || data.tracks.length === 0) {
    throw new Error('Empty lecture series response');
  }
  return data.tracks;
}
