/**
 * Progress, on the server, for a reader who is signed in.
 *
 * `localStorage` stays the thing the page renders from. This is the copy that
 * survives a cleared browser and follows someone from their laptop to their
 * phone, and every call here is allowed to fail: a signed-out reader, a
 * deployment with no database, an offline moment — all of them mean "no remote
 * copy right now", which is the same answer the site has always worked with.
 *
 * The write is a merge rather than a replace, and the server returns the union.
 * That is what makes two devices safe: whichever one syncs second does not
 * discard what the first one recorded. See `database.merge_progress`.
 */

export type ToolId = 'resume' | 'interview' | 'practice';

export interface AcademyProgress {
  resumeStarted: boolean;
  resumeCompleted: boolean;
  interviewStarted: boolean;
  interviewAnswers: number;
  interviewCompleted: boolean;
  practiceCompleted: string[];
  lecturesViewed: string[];
  lastTool: ToolId | null;
}

/** The same bound the API and the database apply, applied before the request. */
export const MAX_PROGRESS_IDS = 500;

const TOOLS: ToolId[] = ['resume', 'interview', 'practice'];

/**
 * A response is input, exactly as a stored value is.
 *
 * This one arrives from our own API, but it lands in React state that the whole
 * site renders from, and the shape is the only thing standing between a bad
 * response and a render crash. Anything unrecognised reads as absent, so the
 * caller keeps what it already had.
 */
export function validateProgress(value: unknown): AcademyProgress | null {
  if (typeof value !== 'object' || value === null) return null;
  const parsed = value as Partial<AcademyProgress>;
  const ids = (list: unknown): string[] =>
    Array.isArray(list)
      ? list.filter((id): id is string => typeof id === 'string').slice(0, MAX_PROGRESS_IDS)
      : [];
  return {
    resumeStarted: parsed.resumeStarted === true,
    resumeCompleted: parsed.resumeCompleted === true,
    interviewStarted: parsed.interviewStarted === true,
    interviewAnswers:
      Number.isSafeInteger(parsed.interviewAnswers) && Number(parsed.interviewAnswers) >= 0
        ? Number(parsed.interviewAnswers)
        : 0,
    interviewCompleted: parsed.interviewCompleted === true,
    practiceCompleted: ids(parsed.practiceCompleted),
    lecturesViewed: ids(parsed.lecturesViewed),
    lastTool: TOOLS.includes(parsed.lastTool as ToolId) ? (parsed.lastTool as ToolId) : null,
  };
}

async function progressFrom(response: Response): Promise<AcademyProgress | null> {
  if (!response.ok) return null;
  const body = (await response.json()) as { progress?: unknown };
  return validateProgress(body?.progress);
}

/** The stored copy, or null when there is not one to be had. */
export async function fetchProgress(signal?: AbortSignal): Promise<AcademyProgress | null> {
  try {
    return await progressFrom(
      await fetch('/api/progress', { credentials: 'include', cache: 'no-store', signal }),
    );
  } catch {
    return null;
  }
}

/** Merges this device's copy into the stored one and returns the union. */
export async function pushProgress(
  progress: AcademyProgress,
  signal?: AbortSignal,
): Promise<AcademyProgress | null> {
  try {
    return await progressFrom(
      await fetch('/api/progress', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...progress,
          practiceCompleted: progress.practiceCompleted.slice(0, MAX_PROGRESS_IDS),
          lecturesViewed: progress.lecturesViewed.slice(0, MAX_PROGRESS_IDS),
        }),
        signal,
      }),
    );
  } catch {
    return null;
  }
}
