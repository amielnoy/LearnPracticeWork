import { test, expect } from '@playwright/test';

/**
 * Health and the middleware stack every other route sits on top of.
 * `baseURL` points at the keyless api-server instance (see `support/servers.ts`).
 */

test.describe('GET /api/healthz', () => {
  test('reports the server as healthy', async ({ request }) => {
    const response = await request.get('/api/healthz');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(await response.json()).toEqual({ status: 'ok' });
  });

  test('needs no database to answer', async ({ request }) => {
    // The suite runs the server with DATABASE_URL unset on purpose: a health
    // probe that depends on Stripe or Postgres is not a health probe.
    const response = await request.get('/api/healthz');
    expect(response.ok()).toBe(true);
  });
});

test.describe('CORS', () => {
  test('allows a cross-origin read from the configured production origin', async ({ request }) => {
    const response = await request.get('/api/healthz', {
      headers: { Origin: 'https://academy.example' },
    });

    expect(response.headers()['access-control-allow-origin']).toBe('https://academy.example');
  });

  test('answers a preflight without invoking the route', async ({ request }) => {
    const response = await request.fetch('/api/ai/generate', {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://academy.example',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type',
      },
    });

    expect(response.status()).toBe(204);
    expect(response.headers()['access-control-allow-origin']).toBe('https://academy.example');
  });
});

test.describe('request handling', () => {
  test('returns 404 for a route that does not exist', async ({ request }) => {
    const response = await request.get('/api/does-not-exist');
    expect(response.status()).toBe(404);
  });

  test('rejects a malformed JSON body instead of crashing', async ({ request }) => {
    const response = await request.post('/api/ai/generate', {
      headers: { 'content-type': 'application/json' },
      data: '{ this is not json',
    });

    expect(response.status()).toBe(400);
  });

  test('does not advertise the framework version', async ({ request }) => {
    const response = await request.get('/api/healthz');
    const poweredBy = response.headers()['x-powered-by'];

    // Express sends a bare "Express" by default. A version number here would be
    // a free hint for anyone scanning for known CVEs.
    if (poweredBy) expect(poweredBy).not.toMatch(/\d/);
  });
});
