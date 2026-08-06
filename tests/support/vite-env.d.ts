/**
 * The unit suite typechecks artifact sources directly through the `@academy/*`
 * alias, and those sources read Vite's `import.meta.env`. Vite is the
 * artifact's dependency, not this package's, so rather than pull `vite/client`
 * in here — and with it a build tool the tests never invoke — the one member
 * the tests reach through is declared.
 *
 * At runtime, under the plain-Node unit project, `import.meta.env` really is
 * undefined. That is why anything reachable from a test resolves it lazily
 * (see `hebrewFontUrl` in `resumePdf.ts`) instead of at module scope.
 */

interface ImportMetaEnv {
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
