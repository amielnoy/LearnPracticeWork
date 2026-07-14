import { getUncachableStripeClient } from './stripeClient';

async function createProducts() {
  try {
    const stripe = await getUncachableStripeClient();
    console.log('Checking for existing AI Testing Bootcamp product...');

    const existing = await stripe.products.search({
      query: "name:'AI Testing Bootcamp' AND active:'true'",
    });

    if (existing.data.length > 0) {
      const prod = existing.data[0];
      const prices = await stripe.prices.list({ product: prod.id, active: true });
      console.log(`Product already exists: ${prod.name} (${prod.id})`);
      if (prices.data.length > 0) {
        console.log(`PRICE_ID=${prices.data[0].id}`);
      }
      return;
    }

    console.log('Creating product...');
    const product = await stripe.products.create({
      name: 'AI Testing Bootcamp',
      description: 'Master AI-powered test automation, DevOps, and modern QA practices.',
      metadata: { category: 'course', featured: 'true' },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 5000,
      currency: 'usd',
    });

    console.log(`Created product: ${product.id}`);
    console.log(`PRICE_ID=${price.id}`);
  } catch (err: any) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

createProducts();
