import { index, integer, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
// drizzle-zod 0.8 builds its schemas out of zod v4, so the inferred type has
// to come from the same entry point — `zod` alone resolves to the v3 classic
// namespace and the two do not line up.
import { z } from 'zod/v4';

/**
 * A completed Stripe checkout, recorded so that "has this person paid?" is a
 * question the server can answer.
 *
 * TODO: this table exists in code only. Creating it needs a live `DATABASE_URL`
 * and one run of `pnpm --filter @workspace/db run push`, which has not happened
 * on any environment yet. Until it does, `recordPurchase` logs and returns and
 * `/api/entitlements/course` answers 503 — nothing breaks, but nothing is
 * recorded either.
 *
 * Every row here originates in a Stripe webhook whose signature was verified,
 * never in a request from a browser. That is the whole point: the client can
 * claim anything, and a purchase record that a client could write would be
 * worth nothing.
 *
 * The `stripe` schema owned by `stripe-replit-sync` mirrors Stripe's objects
 * and is that library's to migrate; this table is the application's own join
 * between a payment and a person, which is exactly what that mirror does not
 * provide.
 */
export const coursePurchasesTable = pgTable(
  'course_purchases',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    /**
     * The checkout session that produced this row. Stripe retries webhooks, so
     * this is what makes recording a purchase idempotent — see the unique index
     * below.
     */
    checkoutSessionId: text('checkout_session_id').notNull(),
    paymentIntentId: text('payment_intent_id'),
    stripeCustomerId: text('stripe_customer_id'),

    /**
     * Lowercased at write time. Stripe echoes back whatever casing the buyer
     * typed, and Google returns its own; normalising on the way in is what lets
     * the two be compared on the way out.
     */
    email: text('email').notNull(),

    /**
     * The Google account that started the checkout, when one did — the `sub`
     * claim, which is stable across email changes and is the identifier Google
     * documents as the one to key on. Null for an anonymous purchase, which is
     * why `email` is the fallback and not the other way round.
     */
    googleSubject: text('google_subject'),

    productId: text('product_id').notNull(),
    priceId: text('price_id'),

    /** Minor units, as Stripe reports them. */
    amountTotal: integer('amount_total').notNull(),
    currency: text('currency').notNull(),

    purchasedAt: timestamp('purchased_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => [
    uniqueIndex('course_purchases_checkout_session_idx').on(table.checkoutSessionId),
    index('course_purchases_email_idx').on(table.email),
    index('course_purchases_google_subject_idx').on(table.googleSubject),
  ],
);

export const insertCoursePurchaseSchema = createInsertSchema(coursePurchasesTable).omit({
  id: true,
  purchasedAt: true,
});

export type InsertCoursePurchase = z.infer<typeof insertCoursePurchaseSchema>;
export type CoursePurchase = typeof coursePurchasesTable.$inferSelect;
