import { test, expect } from '@playwright/experimental-ct-react';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { ProgressProvider } from '@academy/context/ProgressContext';
import { LectureSeries } from '@academy/components/practice/LectureSeries';
import { EN as EN_BANK } from '@academy/lib/lectures';

/**
 * Tracks now also come from `/api/content/lecture-series` (see
 * `lib/contentClient.ts`), with the bundled `EN`/`HE` banks only used when
 * that call fails — the same fallback contract as `QuestionBank` and
 * `CodingChallenges`.
 */
test('renders the bundled tracks by default', async ({ mount }) => {
  const component = await mount(
    <LocaleProvider>
      <ProgressProvider>
        <LectureSeries />
      </ProgressProvider>
    </LocaleProvider>,
  );

  for (const track of EN_BANK.tracks) {
    await expect(component.getByRole('heading', { name: track.title, exact: true })).toBeVisible();
  }
});

test('prefers tracks served by /api/content/lecture-series over the bundled bank', async ({
  mount,
  page,
}) => {
  const remoteTrack = {
    title: 'Remote-only track',
    lead: 'Served straight from Supabase.',
    lectures: [
      {
        num: 1,
        ready: true,
        title: 'Remote lecture one',
        desc: 'Fetched, not bundled.',
        url: 'https://example.com/lecture-1',
      },
    ],
  };
  await page.route('**/api/content/lecture-series*', route =>
    route.fulfill({ json: { tracks: [remoteTrack] } }),
  );

  const component = await mount(
    <LocaleProvider>
      <ProgressProvider>
        <LectureSeries />
      </ProgressProvider>
    </LocaleProvider>,
  );

  await expect(component.getByRole('heading', { name: 'Remote-only track' })).toBeVisible();
  await expect(component.getByRole('heading', { name: 'Remote lecture one' })).toBeVisible();
  for (const track of EN_BANK.tracks) {
    await expect(component.getByRole('heading', { name: track.title, exact: true })).toHaveCount(0);
  }
});

test('falls back to the bundled tracks when /api/content/lecture-series fails', async ({
  mount,
  page,
}) => {
  await page.route('**/api/content/lecture-series*', route =>
    route.fulfill({ status: 503, json: { error: 'Content temporarily unavailable' } }),
  );

  const component = await mount(
    <LocaleProvider>
      <ProgressProvider>
        <LectureSeries />
      </ProgressProvider>
    </LocaleProvider>,
  );

  for (const track of EN_BANK.tracks) {
    await expect(component.getByRole('heading', { name: track.title, exact: true })).toBeVisible();
  }
});
