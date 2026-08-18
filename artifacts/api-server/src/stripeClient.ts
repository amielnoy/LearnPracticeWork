import Stripe from 'stripe';
import { StripeSync } from 'stripe-replit-sync';

/**
 * The part of the Replit connector payload this file reads.
 *
 * `Response.json()` hands back `unknown` under Node's types, which is honest —
 * nothing has checked what arrived. Naming the shape here is what lets the
 * secret be read without an `any` spreading through the file, and every field
 * stays optional because the response is not ours to guarantee: the guard below
 * is what turns a missing key into a sentence someone can act on.
 */
interface ConnectorResponse {
  items?: Array<{ settings?: { secret_key?: string; webhook_secret?: string } }>;
}

// The Supabase project's direct-connection host/user/port/db are fixed and not
// secret; only the password is. Building the URL here — instead of asking for
// a full connection string — means the password never needs manual
// percent-encoding by whoever provides it.
const SUPABASE_DB_HOST = 'db.ikhqtmgfkqhynpazqrac.supabase.co';
const SUPABASE_DB_PORT = 5432;
const SUPABASE_DB_USER = 'postgres';
const SUPABASE_DB_NAME = 'postgres';

export function getSupabaseDatabaseUrl(): string {
  const password = process.env.SUPABASE_DB_PASSWORD;
  if (!password) {
    throw new Error('SUPABASE_DB_PASSWORD environment variable is required');
  }
  return `postgresql://${SUPABASE_DB_USER}:${encodeURIComponent(password)}@${SUPABASE_DB_HOST}:${SUPABASE_DB_PORT}/${SUPABASE_DB_NAME}`;
}

async function getStripeCredentials(): Promise<{ secretKey: string; webhookSecret?: string }> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? 'depl ' + process.env.WEB_REPL_RENEWAL
      : null;

  if (!hostname || !xReplitToken) {
    throw new Error(
      'Missing Replit environment variables. ' +
        'Ensure the Stripe integration is connected via the Integrations tab.',
    );
  }

  const resp = await fetch(
    `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=stripe`,
    {
      headers: { Accept: 'application/json', 'X-Replit-Token': xReplitToken },
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!resp.ok) {
    throw new Error(`Failed to fetch Stripe credentials: ${resp.status} ${resp.statusText}`);
  }

  const data = (await resp.json()) as ConnectorResponse;
  const settings = data.items?.[0]?.settings;

  if (!settings?.secret_key) {
    throw new Error(
      'Stripe integration not connected or missing secret key. ' +
        'Connect Stripe via the Integrations tab first.',
    );
  }

  return {
    secretKey: settings.secret_key,
    webhookSecret: settings.webhook_secret,
  };
}

export async function getUncachableStripeClient(): Promise<Stripe> {
  const { secretKey } = await getStripeCredentials();
  return new Stripe(secretKey);
}

export async function getStripeSync(): Promise<StripeSync> {
  // Stripe's synced data (customers, products, prices, subscriptions) lives in
  // the project's Supabase Postgres database, not the generic Replit
  // DATABASE_URL — see replit.md for why.
  const databaseUrl = getSupabaseDatabaseUrl();

  const { secretKey, webhookSecret } = await getStripeCredentials();
  return new StripeSync({
    poolConfig: { connectionString: databaseUrl },
    stripeSecretKey: secretKey,
    stripeWebhookSecret: webhookSecret ?? '',
  });
}
