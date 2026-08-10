import { runMigrations } from 'stripe-replit-sync';
import { getStripeSync } from './stripeClient';
import app from './app';
import { logger } from './lib/logger';

// Load artifacts/api-server/.env (holds GEMINI_API_KEY_B64, a base64-encoded
// fallback used when the GEMINI_API_KEY Replit Secret isn't set). Safe to
// skip if the file is missing.
try {
  process.loadEnvFile();
} catch {
  // no .env file present — fine, secrets/env vars may already be set
}

const rawPort = process.env['PORT'];

if (!rawPort) {
  throw new Error('PORT environment variable is required but was not provided.');
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function initStripe() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    logger.warn('DATABASE_URL not set — skipping Stripe init');
    return;
  }

  try {
    logger.info('Initializing Stripe schema...');
    // `MigrationConfig` takes only the connection (plus optional ssl/logger):
    // the library owns the schema it migrates into, so the `schema: 'stripe'`
    // that used to be passed here was read by nothing and silently dropped.
    await runMigrations({ databaseUrl });
    logger.info('Stripe schema ready');

    const stripeSync = await getStripeSync();

    const webhookBaseUrl = `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}`;
    await stripeSync.findOrCreateManagedWebhook(`${webhookBaseUrl}/api/stripe/webhook`);
    logger.info('Stripe webhook configured');

    stripeSync
      .syncBackfill()
      .then(() => logger.info('Stripe data synced'))
      .catch(err => logger.error({ err }, 'Stripe backfill error'));
  } catch (err) {
    logger.warn(
      { err },
      'Stripe init failed — payments will return errors at request time, server continues',
    );
  }
}

await initStripe();

app.listen(port, err => {
  if (err) {
    logger.error({ err }, 'Error listening on port');
    process.exit(1);
  }
  logger.info({ port }, 'Server listening');
});
