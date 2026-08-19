/**
 * Ports and base URLs for the api-server instances the api/contract suites run
 * against. Imported by both `playwright.config.ts` and the specs so a port is
 * only ever declared once.
 *
 * Two instances, because `routes/ai.ts` answers 503 for a missing server-side
 * key *before* it validates the request body — so the request-validation
 * branches are unreachable on a keyless server. The keyed instance is given a
 * throwaway key and is only ever sent invalid requests, so no test can reach
 * Gemini for real.
 */

/** api-server started with no Gemini key configured. */
export const KEYLESS_PORT = Number(process.env.TEST_API_PORT ?? 8788);

/** api-server started with a syntactically valid but useless Gemini key. */
export const KEYED_PORT = Number(process.env.TEST_API_PORT_KEYED ?? 8789);

/** api-server with a deliberately tiny quota, used only by the quota spec. */
export const LIMITED_PORT = Number(process.env.TEST_API_PORT_LIMITED ?? 8790);

export const KEYLESS_URL = `http://127.0.0.1:${KEYLESS_PORT}`;
export const KEYED_URL = `http://127.0.0.1:${KEYED_PORT}`;
export const LIMITED_URL = `http://127.0.0.1:${LIMITED_PORT}`;

/**
 * Not a real credential. It only has to be non-empty and start with `AIza` so
 * `resolveGeminiKey()` reports a key exists and `keyHint` behaves like it does
 * in production.
 */
export const DUMMY_GEMINI_KEY = 'AIzaSyTEST-not-a-real-key-000000000000000';

/**
 * The admin token and OAuth client the *keyed* server is started with.
 *
 * Only that one, deliberately. The keyless server is left without either, so
 * the "not configured" branches — a seed route that answers 404 rather than
 * running, an entitlements route that answers 503 rather than guessing — are
 * reachable by a test instead of only by a misconfigured deployment.
 *
 * Neither is a credential. The admin token guards a route that then fails on
 * absent Stripe credentials, and the client ID is only ever compared against an
 * `aud` claim on tokens that never get as far as a signature check.
 */
export const ADMIN_TOKEN = 'test-admin-token-not-a-real-secret';
export const GOOGLE_CLIENT_ID = '000000000000-test.apps.googleusercontent.com';

/**
 * Not a real credential. It only has to be non-empty so `resolveGroqKey()`
 * reports a key exists; the keyed instance is only ever sent invalid
 * requests, so no test can reach Groq for real.
 */
export const DUMMY_GROQ_KEY = 'gsk_TEST-not-a-real-key-000000000000000';
