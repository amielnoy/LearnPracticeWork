import { getUncachableStripeClient } from './stripeClient';

async function createProducts() {
  try {
    const stripe = await getUncachableStripeClient();
    console.log('Checking for existing products...');

    const existing = await stripe.products.search({
      query: "name:'AI Testing Bootcamp' AND active:'true'",
    });

    if (existing.data.length > 0) {
      const prod = existing.data[0];
      const prices = await stripe.prices.list({ product: prod.id, active: true });
      console.log(`Product already exists: ${prod.name} (${prod.id})`);
      if (prices.data.length > 0) {
        console.log(
          `Price ID: ${prices.data[0].id} — $${(prices.data[0].unit_amount! / 100).toFixed(2)}`,
        );
      }
      return;
    }

    console.log('Creating AI Testing Bootcamp product...');
    const product = await stripe.products.create({
      name: 'AI Testing Bootcamp',
      description:
        'Master AI-powered test automation, DevOps, and modern QA practices with hands-on projects and expert mentorship.',
      metadata: {
        category: 'course',
        featured: 'true',
      },
    });
    console.log(`Created product: ${product.name} (${product.id})`);

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 5000, // $50.00
      currency: 'usd',
    });
    console.log(`Created price: $50.00 one-time (${price.id})`);

    console.log('\n✓ Done! Price ID to use in frontend:', price.id);
  } catch (err) {
    console.error('Error:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

createProducts();
