import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '../support/test';

/**
 * `Progress.gs` is deployed through a browser, so nothing in CI can run the
 * web app. What CI can do is hold its merge to the same rules the SQL had —
 * the client adopts whatever comes back, so a weaker rule silently loses work.
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const source = readFileSync(path.join(root, 'server/sheets/Progress.gs'), 'utf8');

// The script is plain JavaScript; evaluating it here gives us its functions.
const { mergeProgress, emptyProgress } = new Function(
  `${source}; return { mergeProgress, emptyProgress };`,
)() as {
  mergeProgress: (stored: unknown, incoming: unknown) => Record<string, unknown>;
  emptyProgress: () => Record<string, unknown>;
};

test('an empty row plus a first sync is the sync', () => {
  const merged = mergeProgress(emptyProgress(), {
    ...emptyProgress(),
    resumeStarted: true,
    practiceCompleted: ['c1'],
  });
  expect(merged.resumeStarted).toBe(true);
  expect(merged.practiceCompleted).toEqual(['c1']);
});

test('a false from one device cannot unset a true from another', () => {
  const merged = mergeProgress(
    { ...emptyProgress(), resumeCompleted: true },
    { ...emptyProgress(), resumeCompleted: false },
  );
  expect(merged.resumeCompleted).toBe(true);
});

test('the answer count takes the larger of the two', () => {
  const merged = mergeProgress(
    { ...emptyProgress(), interviewAnswers: 7 },
    { ...emptyProgress(), interviewAnswers: 3 },
  );
  expect(merged.interviewAnswers).toBe(7);
});

test('two devices union rather than overwrite', () => {
  const merged = mergeProgress(
    { ...emptyProgress(), practiceCompleted: ['c1', 'c2'] },
    { ...emptyProgress(), practiceCompleted: ['c2', 'c3'] },
  );
  expect([...(merged.practiceCompleted as string[])].sort()).toEqual(['c1', 'c2', 'c3']);
});

test('the union is capped at 500', () => {
  const stored = Array.from({ length: 400 }, (_, i) => `s${i}`);
  const incoming = Array.from({ length: 400 }, (_, i) => `i${i}`);
  const merged = mergeProgress(
    { ...emptyProgress(), lecturesViewed: stored },
    { ...emptyProgress(), lecturesViewed: incoming },
  );
  expect((merged.lecturesViewed as string[]).length).toBe(500);
});

test('lastTool prefers the incoming one and falls back to the stored one', () => {
  expect(
    mergeProgress({ ...emptyProgress(), lastTool: 'resume' }, { ...emptyProgress() }).lastTool,
  ).toBe('resume');
  expect(
    mergeProgress(
      { ...emptyProgress(), lastTool: 'resume' },
      { ...emptyProgress(), lastTool: 'practice' },
    ).lastTool,
  ).toBe('practice');
});

test('an unknown lastTool is refused rather than stored', () => {
  const merged = mergeProgress(emptyProgress(), { ...emptyProgress(), lastTool: 'mystery' });
  expect(merged.lastTool).toBe(null);
});
