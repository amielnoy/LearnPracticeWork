import { test, expect } from './fixtures';
import { en } from '@academy/lib/locales';
import { ProviderContextProvider } from '@academy/context/ProviderContext';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { ProgressProvider } from '@academy/context/ProgressContext';
import { CodingChallenges } from '@academy/components/practice/CodingChallenges';

/**
 * The section renders whatever the locale contains, so these tests assert the
 * relationship between content and DOM rather than any particular challenge —
 * adding a challenge to the catalog must not require editing a test.
 *
 * The three levels are `<details>` and ship closed, the way the question bank's
 * stages do, so anything below a `<summary>` is out of the accessibility tree
 * until it is opened. Tests that assert on a level's body open it first;
 * `openAllLevels` mirrors the `openAllStages` helper the question bank fixture
 * already provides.
 */

const t = en.codingChallenges;
const totalChallenges = t.levels.reduce((sum, level) => sum + level.items.length, 0);

test('renders every level in the catalog', async ({ codingChallenges }) => {
  const { component, openAllLevels } = codingChallenges;
  await openAllLevels();

  await expect(component.locator('.challenge-level')).toHaveCount(t.levels.length);

  for (const level of t.levels) {
    await expect(component.getByRole('heading', { name: level.label })).toBeVisible();
    await expect(component.getByText(level.blurb)).toBeVisible();
  }
});

test('renders one card per challenge', async ({ codingChallenges }) => {
  const { component } = codingChallenges;
  await expect(component.locator('.agent-box')).toHaveCount(totalChallenges);
  expect(totalChallenges).toBeGreaterThan(0);
});

test('hides every hint and solution until asked', async ({ codingChallenges }) => {
  const { component, openAllLevels } = codingChallenges;
  await openAllLevels();

  await expect(component.locator('pre')).toHaveCount(0);
  await expect(component.getByRole('button', { name: t.showHintBtn })).toHaveCount(totalChallenges);
});

test('reveals one card at a time, leaving its neighbours collapsed', async ({
  codingChallenges,
}) => {
  const { component, openAllLevels } = codingChallenges;
  await openAllLevels();

  await component.locator('.agent-box').first().getByRole('button').click();

  await expect(component.getByRole('button', { name: t.showSolutionBtn })).toHaveCount(1);
  await expect(component.getByRole('button', { name: t.showHintBtn })).toHaveCount(
    totalChallenges - 1,
  );
});

test('gives every challenge a unique title, so the cards keep stable keys', async ({
  codingChallenges,
}) => {
  const titles = t.levels.flatMap(level => level.items.map(item => item.title));
  expect(new Set(titles).size).toBe(titles.length);

  const { component } = codingChallenges;
  await expect(component.locator('.agent-box h4')).toHaveCount(titles.length);
});

/**
 * Mirrors the question-bank contract in `QuestionBank.spec.tsx`: content now
 * also comes from `/api/content/coding-challenges` (see `lib/contentClient.ts`),
 * with the bundled locale levels only used when that call fails.
 */
test('prefers levels served by /api/content/coding-challenges over the bundled locale', async ({
  mount,
  page,
}) => {
  const remoteLevel = {
    label: 'Remote-only level',
    blurb: 'Served straight from Supabase.',
    items: [
      {
        title: 'A challenge only Supabase knows about',
        prompt: 'Do the thing.',
        hint: 'Think about it.',
        code: 'def solve():\n    pass',
        complexity: 'O(n)',
      },
    ],
  };
  await page.route('**/api/content/coding-challenges*', route =>
    route.fulfill({ json: { levels: [remoteLevel] } }),
  );

  const component = await mount(
    <LocaleProvider>
      <ProgressProvider>
        <ProviderContextProvider>
          <CodingChallenges />
        </ProviderContextProvider>
      </ProgressProvider>
    </LocaleProvider>,
  );

  await expect(component.getByRole('heading', { name: 'Remote-only level' })).toBeVisible();
  await expect(component.locator('.challenge-level')).toHaveCount(1);
});

test('falls back to the bundled locale levels when /api/content/coding-challenges fails', async ({
  mount,
  page,
}) => {
  await page.route('**/api/content/coding-challenges*', route =>
    route.fulfill({ status: 503, json: { error: 'Content temporarily unavailable' } }),
  );

  const component = await mount(
    <LocaleProvider>
      <ProgressProvider>
        <ProviderContextProvider>
          <CodingChallenges />
        </ProviderContextProvider>
      </ProgressProvider>
    </LocaleProvider>,
  );

  await expect(component.locator('.challenge-level')).toHaveCount(t.levels.length);
  for (const level of t.levels) {
    await expect(component.getByRole('heading', { name: level.label })).toBeVisible();
  }
});
