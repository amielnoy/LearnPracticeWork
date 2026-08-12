import Stripe from 'stripe';

/**
 * The part of the Replit connector payload this file reads. `Response.json()`
 * is `unknown` under Node's types; naming the shape is what keeps reading the
 * secret from pulling an `any` through the rest of the file. Every field is
 * optional because the response is not ours to guarantee — the guard below is
 * what turns a missing key into a sentence someone can act on.
 */
interface ConnectorResponse {
  items?: Array<{ settings?: { secret_key?: string } }>;
}

async function getStripeCredentials(): Promise<{ secretKey: string }> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? 'depl ' + process.env.WEB_REPL_RENEWAL
      : null;

  if (!hostname || !xReplitToken) {
    throw new Error(
      'Missing Replit environment variables. Ensure the Stripe integration is connected.',
    );
  }

  const resp = await fetch(
    `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=stripe`,
    {
      headers: { Accept: 'application/json', X_REPLIT_TOKEN: xReplitToken },
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!resp.ok) {
    throw new Error(`Failed to fetch Stripe credentials: ${resp.status} ${resp.statusText}`);
  }

  const data = (await resp.json()) as ConnectorResponse;
  const settings = data.items?.[0]?.settings;

  if (!settings?.secret_key) {
    throw new Error('Stripe integration not connected or missing secret key.');
  }

  return { secretKey: settings.secret_key };
}

export async function getUncachableStripeClient(): Promise<Stripe> {
  const { secretKey } = await getStripeCredentials();
  return new Stripe(secretKey);
}
