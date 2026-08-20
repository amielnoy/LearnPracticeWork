/// <reference types="vite/client" />

/**
 * Build-time configuration, declared so a typo in a variable name is a
 * compile error rather than a silently empty string at runtime.
 */
interface ImportMetaEnv {
  /**
   * Google OAuth client ID for Sign in with Google. Optional: a build without
   * one is valid and simply renders no sign-in button.
   */
  readonly VITE_GOOGLE_CLIENT_ID?: string;

  /**
   * Origin the lecture decks are served from, e.g.
   * `https://amielnoy.github.io/LearnPracticeWork`. Optional: unset, the
   * catalogue falls back to `DEFAULT_SITE_ORIGIN` in `lib/lectures.ts`, which
   * is the origin the links were pinned to before they were derived.
   *
   * `scripts/generate-prerender.ts` reads the same name from `process.env`, so
   * set it for both or the crawler-facing shell and the rendered page will
   * disagree about where a lecture lives.
   */
  readonly VITE_SITE_ORIGIN?: string;
}
