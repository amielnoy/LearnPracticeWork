import { test as base, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { withAllureReporting, type ApiClient } from './apiReporting';
import { meaningfulReporting, type MeaningfulReportingFixture } from './meaningfulReporting';

/**
 * The base test for the API and contract suites.
 *
 * Use `api` instead of Playwright's `request` and every call lands in the
 * Allure report as a step with its request and response attached. `request` is
 * still there for the rare call that should not be reported.
 *
 * The `layer` label is what lets the report group results by the kind of test
 * rather than by file path, so "the API tests" is one thing you can look at
 * instead of a list of spec names.
 */
export const test = base.extend<{ api: ApiClient } & MeaningfulReportingFixture>({
  _meaningfulReporting: [meaningfulReporting, { auto: true }],
  api: async ({ request }, use) => {
    await use(withAllureReporting(request));
  },
});

/**
 * Applies to every test in the file that calls it, from a top-level
 * `beforeEach`. Kept explicit rather than automatic so a suite that is not an
 * API suite cannot pick up the label by accident.
 */
export async function labelApiSuite(feature: string): Promise<void> {
  await allure.layer('api');
  await allure.feature(feature);
}

export { expect, allure };
