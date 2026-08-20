import { desc, eq, or } from 'drizzle-orm';
import {
  coursePurchasesTable,
  getDb,
  isDatabaseConfigured,
  type CoursePurchase,
  type InsertCoursePurchase,
} from '@workspace/db';
import { logger } from './logger';

/**
 * Reading and writing the one record that ties a payment to a person.
 *
 * Every function here tolerates a server with no database. That is not
 * defensiveness for its own sake: this server is expected to run keyless in
 * development and in the test suite, and a checkout route that throws on import
 * because Postgres is absent is a checkout route nobody can test.
 */

/** Who is asking. Either identifier is enough to match a purchase. */
export interface PurchaseIdentity {
  subject?: string | null;
  email?: string | null;
}

export interface CourseAccess {
  hasAccess: boolean;
  purchasedAt: string | null;
  /**
   * False when the server has no database at all, so a caller can tell "no
   * purchase" from "cannot answer" instead of reading a shrug as a denial.
   */
  checked: boolean;
}

const NOT_CHECKED: CourseAccess = { hasAccess: false, purchasedAt: null, checked: false };

/**
 * Records a completed checkout, once.
 *
 * Stripe redelivers webhooks — after a timeout, after a 500, or because someone
 * replayed one from the dashboard — so this has to be safe to run repeatedly
 * for the same session. The unique index on `checkout_session_id` is what makes
 * that true; `onConflictDoNothing` is just how it is spelled.
 */
export async function recordPurchase(purchase: InsertCoursePurchase): Promise<void> {
  if (!isDatabaseConfigured()) {
    logger.warn(
      { checkoutSessionId: purchase.checkoutSessionId },
      'A checkout completed but no DATABASE_URL is set — the purchase was not recorded',
    );
    return;
  }

  await getDb()
    .insert(coursePurchasesTable)
    .values({ ...purchase, email: purchase.email.trim().toLowerCase() })
    .onConflictDoNothing({ target: coursePurchasesTable.checkoutSessionId });
}

/**
 * Whether this person has bought the course.
 *
 * The site sells one product, so any recorded purchase is access to it. A
 * second product would make this a question about `productId`, and the column
 * is already there for that day.
 *
 * Matching on either the Google subject or the email is what covers both ways a
 * purchase can arrive: signed in, where `sub` is recorded and is stable; or
 * anonymous, where the address typed at checkout is all there is. The email
 * side is only as good as Google's `email_verified`, which is why the caller is
 * required to have verified the token rather than decoded it.
 */
export async function findCourseAccess(identity: PurchaseIdentity): Promise<CourseAccess> {
  if (!isDatabaseConfigured()) return NOT_CHECKED;

  const email = identity.email?.trim().toLowerCase();
  const matchers = [
    identity.subject ? eq(coursePurchasesTable.googleSubject, identity.subject) : undefined,
    email ? eq(coursePurchasesTable.email, email) : undefined,
  ].filter(matcher => matcher !== undefined);

  if (matchers.length === 0) return { hasAccess: false, purchasedAt: null, checked: true };

  const rows: CoursePurchase[] = await getDb()
    .select()
    .from(coursePurchasesTable)
    .where(matchers.length === 1 ? matchers[0] : or(...matchers))
    .orderBy(desc(coursePurchasesTable.purchasedAt))
    .limit(1);

  const first = rows[0];
  return {
    hasAccess: rows.length > 0,
    purchasedAt: first ? first.purchasedAt.toISOString() : null,
    checked: true,
  };
}
