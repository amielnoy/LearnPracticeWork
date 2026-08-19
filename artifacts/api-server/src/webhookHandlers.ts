import type Stripe from 'stripe';
import { getStripeClientWithWebhookSecret, getStripeSync } from './stripeClient';
import { recordPurchase } from './lib/purchases';
import { logger } from './lib/logger';

/**
 * Turns a completed checkout into the application's own purchase record.
 *
 * `stripe-replit-sync` mirrors Stripe's objects into its own schema, which is a
 * different job: it can tell you a payment happened, not that the person now
 * looking at the site is the one who made it. That link is what this writes.
 *
 * The session is refetched with its line items expanded because the webhook
 * payload does not include them, and the product is what a second course would
 * need to distinguish access by.
 */
async function recordCheckoutCompletion(stripe: Stripe, session: Stripe.Checkout.Session) {
  if (session.payment_status !== 'paid') {
    logger.info(
      { checkoutSessionId: session.id, paymentStatus: session.payment_status },
      'Checkout completed without payment — nothing recorded',
    );
    return;
  }

  const full = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items.data.price.product'],
  });

  const email = full.customer_details?.email ?? full.customer_email ?? '';
  if (!email) {
    // Without an address there is nothing to match an anonymous buyer on later.
    logger.error(
      { checkoutSessionId: full.id },
      'Paid checkout carried no email — the purchase cannot be attributed',
    );
    return;
  }

  const price = full.line_items?.data[0]?.price ?? null;
  const product = price?.product ?? null;
  const productId = typeof product === 'string' ? product : (product?.id ?? '');

  if (!productId) {
    logger.error({ checkoutSessionId: full.id }, 'Paid checkout carried no product');
    return;
  }

  await recordPurchase({
    checkoutSessionId: full.id,
    paymentIntentId: typeof full.payment_intent === 'string' ? full.payment_intent : null,
    stripeCustomerId:
      typeof full.customer === 'string' ? full.customer : (full.customer?.id ?? null),
    email,
    // Set at checkout time from a *verified* token — see routes/stripe.ts.
    // Metadata is ours, not the buyer's: nothing in the browser can set it.
    googleSubject: full.metadata?.googleSubject || null,
    productId,
    priceId: price?.id ?? null,
    amountTotal: full.amount_total ?? 0,
    currency: full.currency ?? 'usd',
  });

  logger.info({ checkoutSessionId: full.id, productId }, 'Recorded a course purchase');
}

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        'STRIPE WEBHOOK ERROR: Payload must be a Buffer. ' +
          'Received type: ' +
          typeof payload +
          '. ' +
          'FIX: Ensure webhook route is registered BEFORE app.use(express.json()).',
      );
    }

    const sync = await getStripeSync();
    await sync.processWebhook(payload, signature);

    // Verified a second time, deliberately: the library does not hand back the
    // event it parsed, and reading an unverified payload to decide who owns a
    // purchase would defeat the point of having a signature at all.
    const { stripe, webhookSecret } = await getStripeClientWithWebhookSecret();
    const event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      // Anything thrown here reaches the route, which answers non-2xx, which is
      // Stripe's cue to redeliver. `recordPurchase` is idempotent per session,
      // so a redelivery after a database blip records the purchase once.
      await recordCheckoutCompletion(stripe, event.data.object);
    }
  }
}
