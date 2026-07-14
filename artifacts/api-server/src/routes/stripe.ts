import { Router, type IRouter } from 'express';
import { getUncachableStripeClient } from '../stripeClient';

const router: IRouter = Router();

// One-time admin endpoint to seed the course product
router.post('/stripe/seed', async (_req, res) => {
  try {
    const stripe = await getUncachableStripeClient();

    const existing = await stripe.products.search({
      query: "name:'AI Testing Bootcamp' AND active:'true'",
    });

    if (existing.data.length > 0) {
      const prod = existing.data[0];
      const prices = await stripe.prices.list({ product: prod.id, active: true });
      return res.json({
        status: 'already_exists',
        productId: prod.id,
        priceId: prices.data[0]?.id,
      });
    }

    const product = await stripe.products.create({
      name: 'AI Testing Bootcamp',
      description: 'Master AI-powered test automation, DevOps, and modern QA practices with hands-on projects.',
      metadata: { category: 'course', featured: 'true' },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 5000,
      currency: 'usd',
    });

    res.json({ status: 'created', productId: product.id, priceId: price.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create checkout session
router.post('/stripe/checkout', async (req, res) => {
  try {
    const stripe = await getUncachableStripeClient();
    const { priceId, email } = req.body as { priceId: string; email?: string };

    if (!priceId) {
      return res.status(400).json({ error: 'priceId is required' });
    }

    const origin = `${req.protocol}://${req.get('host')}`;
    const sessionParams: import('stripe').Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card', 'google_pay'] as any,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${origin}/ai-testing-academy/?payment=success`,
      cancel_url: `${origin}/ai-testing-academy/?payment=cancelled`,
    };

    if (email) {
      sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    res.json({ url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
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
      return res.json({ data: [] });
    }
    const prices = await stripe.prices.list({
      product: products.data[0].id,
      active: true,
    });
    res.json({ data: prices.data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
