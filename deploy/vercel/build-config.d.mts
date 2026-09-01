/**
 * Types for `build-config.mjs`, which is plain Node so the deploy workflow can
 * run it without a build step. The declarations exist for the unit suite, which
 * imports it to check both shapes of the route table.
 */

export interface Route {
  src?: string;
  dest?: string;
  handle?: string;
  status?: number;
  headers?: Record<string, string>;
  continue?: boolean;
}

export interface BuildOutputConfig {
  version: number;
  routes: Route[];
}

/** The committed route table — everything that does not depend on the environment. */
export function baseConfig(): BuildOutputConfig;

/** Proxy to `apiOrigin`, or a 503 when there is none. Throws on a non-https origin. */
export function apiRoute(apiOrigin: string | undefined): Route;

/** `base` with the API route inserted ahead of the filesystem handler. */
export function buildConfig(
  base: BuildOutputConfig,
  apiOrigin: string | undefined,
): BuildOutputConfig;
