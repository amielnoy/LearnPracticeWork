import { Router, type IRouter } from 'express';
import { requireGoogleUser, type AuthenticatedRequest } from '../middlewares/requireGoogleUser';
import { findCourseAccess } from '../lib/purchases';
import { logger } from '../lib/logger';
import { HttpStatus } from '../lib/httpStatus';

const router: IRouter = Router();

/**
 * What the signed-in visitor is entitled to.
 *
 * This is the route that makes a Google sign-in mean something beyond a name in
 * the corner, and it is the reason the token is verified server-side: the
 * answer is derived from the caller's identity, so an identity the caller could
 * assert for themselves would let anyone claim a purchase they never made.
 *
 * The answer is derived, never stored — purchases are written by the Stripe
 * webhook and read here, so there is no request a browser can make that grants
 * itself access.
 */
router.get('/entitlements/course', requireGoogleUser, async (req, res) => {
  const { googleUser } = req as AuthenticatedRequest;

  try {
    const access = await findCourseAccess({
      subject: googleUser.subject,
      email: googleUser.email,
    });

    if (!access.checked) {
      // No database means no purchase records exist to consult. Saying "no"
      // would be a guess dressed as an answer.
      res
        .status(HttpStatus.SERVICE_UNAVAILABLE)
        .json({ error: 'Purchase records are unavailable on this server.' });
      return;
    }

    res.json({ hasAccess: access.hasAccess, purchasedAt: access.purchasedAt });
  } catch (err) {
    logger.error({ err, requestId: req.id }, 'Entitlement lookup failed');
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Could not check entitlements' });
  }
});

export default router;
