import { test, expect } from '@playwright/test';
import { customFetch, ApiError, setBaseUrl } from '@lib/api-client-react/src/custom-fetch';
import { HealthCheckResponse } from '@workspace/api-zod';
import { KEYLESS_URL } from '../support/servers';

/**
 * The other half of the contract: the shared fetch wrapper every generated
 * client hook goes through, exercised against the real server rather than a
 * mock. A change on either side that breaks the pairing shows up here — error
 * envelopes that stop being JSON, bodies that stop parsing, statuses that stop
 * being surfaced.
 */

test.beforeAll(() => setBaseUrl(KEYLESS_URL));
test.afterAll(() => setBaseUrl(null));

test('parses a documented response into the shape the Zod schema describes', async () => {
  const body = await customFetch('/api/healthz');

  expect(() => HealthCheckResponse.parse(body)).not.toThrow();
  expect(HealthCheckResponse.parse(body).status).toBe('ok');
});

test('raises a typed error carrying the status for a missing route', async () => {
  const failure = await customFetch('/api/does-not-exist').catch((err: unknown) => err);

  expect(failure).toBeInstanceOf(ApiError);
  expect((failure as ApiError).status).toBe(404);
});

test('lifts the server error message out of a JSON error envelope', async () => {
  // The AI proxy answers 503 with `{ "error": "..." }`; the wrapper is supposed
  // to surface that text rather than a bare status line.
  const failure = (await customFetch('/api/ai/generate', {
    method: 'POST',
    body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
  }).catch((err: unknown) => err)) as ApiError<{ error: string }>;

  expect(failure).toBeInstanceOf(ApiError);
  expect(failure.status).toBe(503);
  expect(failure.data?.error).toBeTruthy();
  expect(failure.message).toContain(failure.data!.error);
});

test('sets a JSON content type from a JSON body without being told to', async () => {
  // Regression guard for the header inference in custom-fetch.ts: without it
  // Express never parses the body and every POST looks empty to the server.
  const failure = (await customFetch('/api/ai/generate', {
    method: 'POST',
    body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
  }).catch((err: unknown) => err)) as ApiError;

  // 503 (no key) rather than a parse failure means the body arrived intact.
  expect(failure.status).toBe(503);
});

test('refuses to send a body on a GET, instead of letting the server reject it', async () => {
  await expect(customFetch('/api/healthz', { method: 'GET', body: '{}' })).rejects.toThrow(
    TypeError,
  );
});
