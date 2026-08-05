import { test, expect } from '@playwright/experimental-ct-react';
import { ChallengeCard } from '@academy/components/ChallengeCard';
import type { Challenge, ChallengeLabels } from '@academy/lib/challenges';

/**
 * The card owns a three-stage disclosure: prompt → hint → solution → collapsed.
 * Everything below drives the real button, so the cycle is asserted the way a
 * reader experiences it.
 */

const challenge: Challenge = {
  title: '1. Deduplicate test IDs',
  prompt: 'Return the list with duplicates removed, preserving first-seen order.',
  hint: 'Track what you have seen in a set.',
  code: 'def dedupe(ids):\n    seen = set()\n    return [i for i in ids if not (i in seen or seen.add(i))]',
  complexity: 'O(n) time, O(n) space',
};

const labels: ChallengeLabels = {
  hint: 'Hint',
  complexity: 'Complexity',
  showHint: 'Show hint',
  showSolution: 'Show solution',
  hide: 'Hide',
};

test('shows the challenge with nothing revealed', async ({ mount }) => {
  const component = await mount(<ChallengeCard challenge={challenge} labels={labels} />);

  await expect(component.getByRole('heading', { name: challenge.title })).toBeVisible();
  await expect(component.getByText(challenge.prompt)).toBeVisible();
  await expect(component.getByText(challenge.hint)).toBeHidden();
  await expect(component.getByRole('button')).toHaveText(labels.showHint);
  await expect(component.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
});

test('reveals the hint on the first click, without giving away the solution', async ({
  mount,
}) => {
  const component = await mount(<ChallengeCard challenge={challenge} labels={labels} />);

  await component.getByRole('button').click();

  await expect(component.getByText(challenge.hint)).toBeVisible();
  await expect(component.locator('.notice b').first()).toHaveText(`${labels.hint}:`);
  await expect(component.locator('pre')).toBeHidden();
  await expect(component.getByRole('button')).toHaveText(labels.showSolution);
  await expect(component.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
});

test('reveals the solution and its complexity on the second click', async ({ mount }) => {
  const component = await mount(<ChallengeCard challenge={challenge} labels={labels} />);

  await component.getByRole('button').click();
  await component.getByRole('button').click();

  await expect(component.locator('pre code')).toHaveText(challenge.code);
  await expect(component.getByText(challenge.complexity)).toBeVisible();
  await expect(component.getByText(challenge.hint)).toBeVisible();
  await expect(component.getByRole('button')).toHaveText(labels.hide);
});

test('collapses back to the prompt on the third click', async ({ mount }) => {
  const component = await mount(<ChallengeCard challenge={challenge} labels={labels} />);

  const button = component.getByRole('button');
  await button.click();
  await button.click();
  await button.click();

  await expect(component.getByText(challenge.hint)).toBeHidden();
  await expect(component.locator('pre')).toBeHidden();
  await expect(button).toHaveText(labels.showHint);
  await expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('keeps the code verbatim, including indentation', async ({ mount }) => {
  const component = await mount(<ChallengeCard challenge={challenge} labels={labels} />);

  await component.getByRole('button').click();
  await component.getByRole('button').click();

  const rendered = await component.locator('pre code').textContent();
  expect(rendered).toBe(challenge.code);
});
