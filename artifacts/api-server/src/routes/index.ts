import { Router, type IRouter } from 'express';
import healthRouter from './health';
import stripeRouter from './stripe';
import aiRouter from './ai';
import entitlementsRouter from './entitlements';

const router: IRouter = Router();

router.use(healthRouter);
router.use(stripeRouter);
router.use(aiRouter);
router.use(entitlementsRouter);

export default router;
