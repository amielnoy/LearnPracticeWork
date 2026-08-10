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

/**
 * Vite turns a `?url` import into the URL of the emitted asset. Declared for
 * the same reason as `import.meta.env` above: the component suite typechecks
 * ResumeAgent, which asks for the pdf.js worker that way, and the alternative
 * is pulling `vite/client` into a package that does not depend on Vite.
 */
declare module '*?url' {
  const url: string;
  export default url;
}
