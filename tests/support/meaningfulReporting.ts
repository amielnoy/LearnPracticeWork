import { allure } from 'allure-playwright';
import type { TestInfo } from '@playwright/test';

export type MeaningfulReportingFixture = {
  /** Automatic Given/When/Then lifecycle reporting shared by every Playwright layer. */
  _meaningfulReporting: void;
};

type Use = (value: void) => Promise<void>;

function readableStatus(testInfo: TestInfo, failed: boolean): string {
  if (testInfo.status) return testInfo.status;
  return failed ? 'failed' : 'passed';
}

/**
 * Adds a small, consistent report tree around every test.
 *
 * Detailed actions remain nested below "When" through `test.step` or
 * `allure.step`. Only safe execution metadata is attached: never environment
 * values, request bodies, credentials, cookies, prompts, or user identities.
 */
export async function meaningfulReporting(
  // Playwright requires fixture callbacks to use an object destructuring pattern.
  // eslint-disable-next-line no-empty-pattern
  {}: object,
  use: Use,
  testInfo: TestInfo,
): Promise<void> {
  const startedAt = Date.now();
  const location = `${testInfo.file}:${testInfo.line}`;
  const given = `Given isolated ${testInfo.project.name} conditions for “${testInfo.title}”`;

  console.log(`[GIVEN] ${testInfo.title} | project=${testInfo.project.name} | ${location}`);
  await allure.step(given, async () => {
    await allure.attachment(
      'starting-conditions.json',
      JSON.stringify(
        {
          project: testInfo.project.name,
          test: testInfo.title,
          suite: testInfo.titlePath.slice(0, -1),
          source: location,
          retry: testInfo.retry,
          repeat: testInfo.repeatEachIndex,
        },
        null,
        2,
      ),
      'application/json',
    );
  });

  let failed = false;
  try {
    console.log(`[WHEN] ${testInfo.title} | execute test actions and assertions`);
    await allure.step(`When the test executes its actions and assertions`, async () => {
      await use();
    });
  } catch (error) {
    failed = true;
    throw error;
  } finally {
    const status = readableStatus(testInfo, failed);
    const durationMs = Date.now() - startedAt;
    const expected = testInfo.expectedStatus;
    const outcome = status === expected ? 'matched the expected result' : 'needs attention';

    console.log(
      `[THEN] ${testInfo.title} | status=${status} | expected=${expected} | duration=${durationMs}ms`,
    );
    await allure.step(`Then the test ${status}: ${outcome}`, async () => {
      await allure.attachment(
        'result.json',
        JSON.stringify({ status, expectedStatus: expected, outcome, durationMs }, null, 2),
        'application/json',
      );
    });
  }
}
