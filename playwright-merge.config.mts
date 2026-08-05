import { defineConfig } from '@playwright/test';

/**
 * Used only by `playwright merge-reports -c` in `run-all-tests.sh`.
 *
 * The three suite configs record different `testDir` values — `tests` for the
 * Node-side projects, `tests/component` and `tests/e2e` for the browser ones —
 * and Playwright refuses to merge blobs from different roots unless a merge
 * config names the real one. `tests` is their common ancestor, so test paths in
 * the merged report stay correct and clickable.
 */
export default defineConfig({
  testDir: './tests',
  reporter: [['html', { open: 'never' }]],
});
