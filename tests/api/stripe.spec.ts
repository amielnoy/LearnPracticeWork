import { test, expect } from '@playwright/test';

/**
 * The Stripe routes need Replit-supplied credentials that exist only on the
 * deployment. What is testable everywhere — and what actually breaks in
 * production when it regresses — is the request handling around them: the
 * webhook's signature gate, the raw-body registration order, and the promise
 * that a missing integration degrades into JSON rather than a crashed process.
 */

const WEBHOOK_PAYLOAD = Buffer.from(JSON.stringify({ id: 'evt_test', type: 'ping' }));

test.describe('POST /api/stripe/webhook', () => {
  test('refuses an unsigned webhook', async ({ request }) => {
    const response = await request.post('/api/stripe/webhook', {
      headers: { 'content-type': 'application/json' },
      data: WEBHOOK_PAYLOAD,
    });

    expect(response.status()).toBe(400);
    expect((await response.json()).error).toContain('stripe-signature');
  });

  test('rejects a forged signature without disclosing why', async ({ request }) => {
    const response = await request.post('/api/stripe/webhook', {
      headers: {
        'content-type': 'application/json',
        'stripe-signature': 't=1,v1=deadbeef',
      },
      data: WEBHOOK_PAYLOAD,
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Webhook processing error');
    // A stack trace or a credential in this response would be an information leak.
    expect(JSON.stringify(body)).not.toMatch(/sk_|whsec_|at .*\.(ts|mjs):/);
  });

  test('receives the body as raw bytes, not parsed JSON', async ({ request }) => {
    // `express.json()` running first would turn the payload into an object and
    // the handler would answer with the "Payload must be a Buffer" error
    // instead of a signature failure. This asserts the registration order in
    // artifacts/api-server/src/app.ts still holds.
    const response = await request.post('/api/stripe/webhook', {
      headers: {
        'content-type': 'application/json',
        'stripe-signature': 't=1,v1=deadbeef',
      },
      data: WEBHOOK_PAYLOAD,
    });

    expect(await response.text()).not.toContain('must be a Buffer');
  });
});

test.describe('Stripe routes without a connected integration', () => {
  test('reports a price lookup failure as JSON', async ({ request }) => {
    const response = await request.get('/api/stripe/prices');

    expect(response.status()).toBe(500);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(typeof (await response.json()).error).toBe('string');
  });

  test('reports a checkout failure as JSON', async ({ request }) => {
    // The `priceId is required` branch sits behind the Stripe client, so
    // without credentials this is a 500 rather than a 400.
    const response = await request.post('/api/stripe/checkout', {
      data: { priceId: 'price_test' },
    });

    expect(response.status()).toBe(500);
    expect(typeof (await response.json()).error).toBe('string');
  });

  test('keeps serving other routes after a Stripe failure', async ({ request }) => {
    await request.get('/api/stripe/prices');
    const health = await request.get('/api/healthz');

    expect(health.status()).toBe(200);
  });
});
