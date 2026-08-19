import { createHash, timingSafeEqual } from 'node:crypto';
import { rateLimit } from 'express-rate-limit';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { logger } from '../lib/logger';

/**
 * The gate in front of the admin-only routes.
 *
 * The seed route creates a product and a price in a live Stripe account, so
 * "one-time admin endpoint" written in a comment is not a control — anyone who
 * can reach the server can call it, repeatedly. This is what makes that comment
 * true.
 *
 * A missing `ADMIN_API_TOKEN` disables the route outright rather than opening
 * it. The 404 is deliberate: an unconfigured deployment should not advertise
 * that an admin surface exists at all, and the failure mode of forgetting to
 * set the variable is then "the route is unavailable" rather than "the route is
 * public".
 */
function configuredToken(): string | undefined {
  const token = process.env.ADMIN_API_TOKEN?.trim();
  return token ? token : undefined;
}

/**
 * Compares in constant time.
 *
 * `timingSafeEqual` throws when the two buffers differ in length, which would
 * leak the expected token's length through the exception path. Hashing first
 * makes both sides a fixed 32 bytes, so every comparison takes the same shape
 * whatever was presented.
 */
function matchesToken(presented: string, expected: string): boolean {
  const digest = (value: string) => createHash('sha256').update(value, 'utf8').digest();
  return timingSafeEqual(digest(presented), digest(expected));
}

function bearerToken(req: Request): string {
  const header = req.get('authorization') ?? '';
  const match = /^Bearer[ ]+(.+)$/i.exec(header.trim());
  return match ? match[1].trim() : '';
}

/**
 * Caps guessing attempts. The comparison above is constant-time, so this is not
 * about timing — it is about a slow brute force against a token someone chose
 * badly.
 */
export const adminRateLimiter: RequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (req: Request, res: Response): void => {
    logger.warn({ requestId: req.id, ip: req.ip, route: req.path }, 'Admin rate limit exceeded');
    res.status(429).json({ error: 'Too many requests' });
  },
});

export function requireAdminToken(req: Request, res: Response, next: NextFunction): void {
  const expected = configuredToken();

  if (!expected) {
    logger.warn(
      { requestId: req.id, ip: req.ip, route: req.path },
      'Admin route is disabled: ADMIN_API_TOKEN is not configured',
    );
    res.status(404).json({ error: 'Not found' });
    return;
  }

  const presented = bearerToken(req);

  if (!presented || !matchesToken(presented, expected)) {
    logger.warn(
      { requestId: req.id, ip: req.ip, route: req.path, presented: presented !== '' },
      'Rejected admin request',
    );
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
}
