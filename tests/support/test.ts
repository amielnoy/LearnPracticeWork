import { test as base, expect } from '@playwright/test';
import { meaningfulReporting, type MeaningfulReportingFixture } from './meaningfulReporting';

/** Base for Node and standalone browser specs that do not need another fixture set. */
export const test = base.extend<MeaningfulReportingFixture>({
  _meaningfulReporting: [meaningfulReporting, { auto: true }],
});

export { expect };
