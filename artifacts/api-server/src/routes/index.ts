import { Router, type IRouter } from 'express';
import healthRouter from './health';
import stripeRouter from './stripe';
import aiRouter from './ai';
import entitlementsRouter from './entitlements';
import contentRouter from './content';

const router: IRouter = Router();

router.use(healthRouter);
router.use(stripeRouter);
router.use(aiRouter);
router.use(entitlementsRouter);
router.use(contentRouter);

export default router;
