import type { NextFunction, Request, Response } from 'express';
import {
  isGoogleAuthConfigured,
  verifyGoogleIdToken,
  type VerifiedGoogleUser,
} from '../lib/googleAuth';
import { logger } from '../lib/logger';

/**
 * The request-shaped half of Google sign-in: pulling a bearer token off a
 * request and turning it into a caller, or into a refusal.
 *
 * The rules themselves live in `lib/googleAuth`, which knows nothing about
 * Express and is tested directly against real signatures. What is left here is
 * the plumbing.
 */

function bearerToken(req: Request): string {
  const match = /^Bearer[ ]+(.+)$/i.exec((req.get('authorization') ?? '').trim());
  return match ? match[1].trim() : '';
}

/**
 * The verified caller, or null when there is no usable token.
 *
 * For routes that behave differently for a signed-in visitor but still work
 * without one — checkout being the case that matters, since buying the course
 * must not require an account.
 */
export async function verifiedGoogleUser(req: Request): Promise<VerifiedGoogleUser | null> {
  const token = bearerToken(req);
  if (!token) return null;
  try {
    return await verifyGoogleIdToken(token);
  } catch (err) {
    // A network failure reaching Google is not the caller's fault, but it is
    // also not proof of identity: treat it as signed out and say so in the log.
    logger.warn({ err, requestId: req.id }, 'Could not verify a Google ID token');
    return null;
  }
}

/** Express typing for a request that has been through `requireGoogleUser`. */
export interface AuthenticatedRequest extends Request {
  googleUser: VerifiedGoogleUser;
}

/** Rejects the request unless it carries a verified Google ID token. */
export async function requireGoogleUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!isGoogleAuthConfigured()) {
    res.status(503).json({ error: 'Sign-in is not configured on this server.' });
    return;
  }

  const user = await verifiedGoogleUser(req);
  if (!user) {
    res.status(401).json({ error: 'A valid Google ID token is required.' });
    return;
  }

  (req as AuthenticatedRequest).googleUser = user;
  next();
}
