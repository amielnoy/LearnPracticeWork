import { test, expect, labelApiSuite } from '../support/apiFixtures';

/**
 * The Stripe routes need Replit-supplied credentials that exist only on the
 * deployment. What is testable everywhere — and what actually breaks in
 * production when it regresses — is the request handling around them: the
 * webhook's signature gate, the raw-body registration order, and the promise
 * that a missing integration degrades into JSON rather than a crashed process.
 */

test.beforeEach(async () => {
  await labelApiSuite('Stripe routes');
});

const WEBHOOK_PAYLOAD = Buffer.from(JSON.stringify({ id: 'evt_test', type: 'ping' }));

test.describe('POST /api/stripe/webhook', () => {
  test('refuses an unsigned webhook', async ({ api }) => {
    const response = await api.post('/api/stripe/webhook', {
      headers: { 'content-type': 'application/json' },
      data: WEBHOOK_PAYLOAD,
    });

    expect(response.status()).toBe(400);
    expect((await response.json()).error).toContain('stripe-signature');
  });

  test('rejects a forged signature without disclosing why', async ({ api }) => {
    const response = await api.post('/api/stripe/webhook', {
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

  test('receives the body as raw bytes, not parsed JSON', async ({ api }) => {
    // `express.json()` running first would turn the payload into an object and
    // the handler would answer with the "Payload must be a Buffer" error
    // instead of a signature failure. This asserts the registration order in
    // server/src/app.ts still holds.
    const response = await api.post('/api/stripe/webhook', {
      headers: {
        'content-type': 'application/json',
        'stripe-signature': 't=1,v1=deadbeef',
      },
      data: WEBHOOK_PAYLOAD,
    });

    expect(await response.text()).not.toContain('must be a Buffer');
  });
});

test.describe('POST /api/stripe/checkout — request validation', () => {
  /**
   * These run before the Stripe client is reached, so they are the same on a
   * server with credentials and one without. Everything below is a 400 rather
   * than the 500 the integration-less routes give, which is what proves the
   * body was rejected on its own terms.
   */
  test('requires affirmative acceptance of the terms', async ({ api }) => {
    const response = await api.post('/api/stripe/checkout', { data: {} });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Invalid request body');
    expect(JSON.stringify(body.issues)).toContain('acceptedTerms');
  });

  test('refuses a false terms value', async ({ api }) => {
    const response = await api.post('/api/stripe/checkout', { data: { acceptedTerms: false } });

    expect(response.status()).toBe(400);
  });

  test('refuses a client-supplied price ID', async ({ api }) => {
    const response = await api.post('/api/stripe/checkout', {
      data: { acceptedTerms: true, priceId: 'price_cheaper_product' },
    });

    expect(response.status()).toBe(400);
  });

  test('refuses an email that is not an address', async ({ api }) => {
    const response = await api.post('/api/stripe/checkout', {
      data: { acceptedTerms: true, email: 'not-an-address' },
    });

    expect(response.status()).toBe(400);
  });

  test('refuses an unexpected field rather than ignoring it', async ({ api }) => {
    // The schema is strict. A caller that thinks it can set `googleSubject`
    // itself should be told no — that field is set from a verified token and
    // from nowhere else.
    const response = await api.post('/api/stripe/checkout', {
      data: { acceptedTerms: true, googleSubject: 'someone-elses-account' },
    });

    expect(response.status()).toBe(400);
  });

  test('a forged bearer token does not make the caller signed in', async ({ api }) => {
    // The body is valid, so this gets past validation and dies on the missing
    // Stripe integration — a 500, not a 401. The point is what did *not*
    // happen: an unverifiable token is treated as signed out rather than
    // rejected outright, because buying the course never required an account.
    const response = await api.post('/api/stripe/checkout', {
      headers: { authorization: 'Bearer not.a.token' },
      data: { acceptedTerms: true },
    });

    expect(response.status()).toBe(503);
  });
});

test.describe('Stripe routes without backend secrets', () => {
  test('reports that sales are disabled without contacting Stripe', async ({ api }) => {
    const response = await api.get('/api/stripe/prices');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(await response.json()).toEqual({ data: [], salesEnabled: false });
  });

  test('reports a checkout failure as JSON', async ({ api }) => {
    // The `priceId is required` branch sits behind the Stripe client, so
    // without credentials this is a 500 rather than a 400.
    const response = await api.post('/api/stripe/checkout', {
      data: { acceptedTerms: true },
    });

    expect(response.status()).toBe(503);
    expect(typeof (await response.json()).error).toBe('string');
  });

  test('keeps serving other routes after a Stripe failure', async ({ api }) => {
    await api.get('/api/stripe/prices');
    const health = await api.get('/api/healthz');

    expect(health.status()).toBe(200);
  });
});
