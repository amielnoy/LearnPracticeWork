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
}
