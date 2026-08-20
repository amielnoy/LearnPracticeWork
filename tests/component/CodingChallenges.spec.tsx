import { test, expect } from '@playwright/experimental-ct-react';
import type { Locator } from '@playwright/test';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { ProgressProvider } from '@academy/context/ProgressContext';
import { CodingChallenges } from '@academy/components/practice/CodingChallenges';
import { en } from '@academy/lib/locales';

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

async function openAllLevels(component: Locator): Promise<void> {
  const levels = component.locator('details.challenge-level');
  const count = await levels.count();
  for (let i = 0; i < count; i++) await levels.nth(i).locator('summary').click();
}

test('renders every level in the catalog', async ({ mount }) => {
  const component = await mount(
    <LocaleProvider>
      <ProgressProvider>
        <CodingChallenges />
      </ProgressProvider>
    </LocaleProvider>,
  );

  await openAllLevels(component);

  await expect(component.locator('.challenge-level')).toHaveCount(t.levels.length);

  for (const level of t.levels) {
    await expect(component.getByRole('heading', { name: level.label })).toBeVisible();
    await expect(component.getByText(level.blurb)).toBeVisible();
  }
});

test('renders one card per challenge', async ({ mount }) => {
  const component = await mount(
    <LocaleProvider>
      <ProgressProvider>
        <CodingChallenges />
      </ProgressProvider>
    </LocaleProvider>,
  );

  await expect(component.locator('.agent-box')).toHaveCount(totalChallenges);
  expect(totalChallenges).toBeGreaterThan(0);
});

test('hides every hint and solution until asked', async ({ mount }) => {
  const component = await mount(
    <LocaleProvider>
      <ProgressProvider>
        <CodingChallenges />
      </ProgressProvider>
    </LocaleProvider>,
  );

  await openAllLevels(component);

  await expect(component.locator('pre')).toHaveCount(0);
  await expect(component.getByRole('button', { name: t.showHintBtn })).toHaveCount(totalChallenges);
});

test('reveals one card at a time, leaving its neighbours collapsed', async ({ mount }) => {
  const component = await mount(
    <LocaleProvider>
      <ProgressProvider>
        <CodingChallenges />
      </ProgressProvider>
    </LocaleProvider>,
  );

  await openAllLevels(component);

  await component.locator('.agent-box').first().getByRole('button').click();

  await expect(component.getByRole('button', { name: t.showSolutionBtn })).toHaveCount(1);
  await expect(component.getByRole('button', { name: t.showHintBtn })).toHaveCount(
    totalChallenges - 1,
  );
});

test('gives every challenge a unique title, so the cards keep stable keys', async ({ mount }) => {
  const titles = t.levels.flatMap(level => level.items.map(item => item.title));
  expect(new Set(titles).size).toBe(titles.length);

  const component = await mount(
    <LocaleProvider>
      <ProgressProvider>
        <CodingChallenges />
      </ProgressProvider>
    </LocaleProvider>,
  );
  await expect(component.locator('.agent-box h4')).toHaveCount(titles.length);
});
