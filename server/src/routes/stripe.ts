import { Router, type IRouter } from 'express';
import { z } from 'zod';
import { getUncachableStripeClient } from '../stripeClient';
import { adminRateLimiter, requireAdminToken } from '../middlewares/requireAdminToken';
import { verifiedGoogleUser } from '../middlewares/requireGoogleUser';

const router: IRouter = Router();

/**
 * What to tell the caller went wrong.
 *
 * Anything can be thrown, so the caught value is `unknown` and has to be
 * narrowed rather than assumed: reaching for `.message` on a thrown string used
 * to produce `undefined` in the response body, which tells nobody anything.
 */
function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/**
 * Creates the course product and its price.
 *
 * Admin-only, and enforced rather than described: this writes to a live Stripe
 * account, so an unauthenticated caller could mint products in it all day. See
 * `middlewares/requireAdminToken` for what "admin" means here.
 */
router.post('/stripe/seed', adminRateLimiter, requireAdminToken, async (_req, res) => {
  try {
    const stripe = await getUncachableStripeClient();

    const existing = await stripe.products.search({
      query: "name:'AI Testing Bootcamp' AND active:'true'",
    });

    if (existing.data.length > 0) {
      const prod = existing.data[0];
      const prices = await stripe.prices.list({ product: prod.id, active: true });
      res.json({
        status: 'already_exists',
        productId: prod.id,
        priceId: prices.data[0]?.id,
      });
      return;
    }

    const product = await stripe.products.create({
      name: 'AI Testing Bootcamp',
      description:
        'Master AI-powered test automation, DevOps, and modern QA practices with hands-on projects.',
      metadata: { category: 'course', featured: 'true' },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 5000,
      currency: 'usd',
    });

    res.json({ status: 'created', productId: product.id, priceId: price.id });
  } catch (err) {
    res.status(500).json({ error: errorMessage(err) });
  }
});

const CheckoutRequestSchema = z
  .object({
    priceId: z.string().min(1).max(255),
    // Only used when the caller is not signed in. A signed-in caller's address
    // comes from their verified token instead, so this cannot be used to buy
    // access on someone else's behalf.
    email: z.string().email().max(320).optional(),
  })
  .strict();

// Create checkout session
router.post('/stripe/checkout', async (req, res) => {
  try {
    const parsed = CheckoutRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Invalid request body',
        issues: parsed.error.issues.map(issue => ({ path: issue.path, message: issue.message })),
      });
      return;
    }

    // Buying the course does not require an account, so a missing or unusable
    // token is not an error here — it just means the purchase is recorded
    // against the email alone. What a token cannot do is be taken at face
    // value: `googleSubject` below is only ever set from a verified one.
    const signedIn = await verifiedGoogleUser(req);
    const { priceId } = parsed.data;
    const email = signedIn?.email ?? parsed.data.email;

    const stripe = await getUncachableStripeClient();

    const origin = `${req.protocol}://${req.get('host')}`;
    const sessionParams: import('stripe').Stripe.Checkout.SessionCreateParams = {
      // Card only. Google Pay is not a payment method Stripe accepts here — it
      // is a wallet that rides on top of `card`, and is offered automatically
      // when it is enabled on the account. Naming it in this list made Stripe
      // reject the whole request; the cast that used to sit here is what kept
      // the compiler from saying so.
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${origin}/ai-testing-academy/?payment=success`,
      cancel_url: `${origin}/ai-testing-academy/?payment=cancelled`,
    };

    if (email) {
      sessionParams.customer_email = email;
    }

    if (signedIn) {
      // Comes back on the webhook, which is how a purchase gets tied to an
      // account rather than only to whatever address was typed at checkout.
      sessionParams.metadata = { googleSubject: signedIn.subject };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: errorMessage(err) });
  }
});

// Get active prices (so frontend can look up priceId dynamically)
router.get('/stripe/prices', async (_req, res) => {
  try {
    const stripe = await getUncachableStripeClient();
    const products = await stripe.products.search({
      query: "name:'AI Testing Bootcamp' AND active:'true'",
    });
    if (products.data.length === 0) {
      res.json({ data: [] });
      return;
    }
    const prices = await stripe.prices.list({
      product: products.data[0].id,
      active: true,
    });
    res.json({ data: prices.data });
  } catch (err) {
    res.status(500).json({ error: errorMessage(err) });
  }
});

export default router;
