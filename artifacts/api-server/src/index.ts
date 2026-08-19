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

/**
 * Listening is wired through the two events rather than a listen callback.
 *
 * Express 5 registers that callback on both 'listening' and 'error' (see
 * `app.listen` in express/lib/application.js), so it fires either way and the
 * caller has to branch on an argument whose type says it is optional. Splitting
 * the two apart means the success path cannot run on a failure — which is
 * exactly what a one-line version of this got wrong: ignoring the argument
 * logged "Server listening" a millisecond before EADDRINUSE.
 */
const server = app.listen(port);

server.on('listening', () => {
  logger.info({ port }, 'Server listening');
});

server.on('error', (err: NodeJS.ErrnoException) => {
  logger.error({ err, port, code: err.code }, 'Server failed to listen');
  process.exit(1);
});
