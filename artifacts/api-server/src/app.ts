import express, { type ErrorRequestHandler, type Express } from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import router from './routes';
import { logger } from './lib/logger';
import { WebhookHandlers } from './webhookHandlers';
import { HttpStatus } from './lib/httpStatus';

const app: Express = express();

if (process.env.NODE_ENV === 'production') {
  const trustProxyHops = Number(process.env.TRUST_PROXY_HOPS ?? '1');
  app.set(
    'trust proxy',
    Number.isSafeInteger(trustProxyHops) && trustProxyHops > 0 ? trustProxyHops : 1,
  );
}

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split('?')[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// Stripe webhook MUST be registered before express.json() — needs raw Buffer body
app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res): Promise<void> => {
    const signature = req.headers['stripe-signature'];
    if (!signature) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Missing stripe-signature header' });
      return;
    }
    try {
      const sig = Array.isArray(signature) ? signature[0] : signature;
      await WebhookHandlers.processWebhook(req.body as Buffer, sig);
      res.status(HttpStatus.OK).json({ received: true });
    } catch (err) {
      logger.error({ err }, 'Stripe webhook error');
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Webhook processing error' });
    }
  },
);

const allowedOrigins = new Set(
  [
    ...(process.env.ALLOWED_ORIGINS ?? '').split(','),
    ...(process.env.REPLIT_DOMAINS ?? '').split(',').map(domain => domain && `https://${domain}`),
  ]
    .map(origin => origin.trim().replace(/\/$/, ''))
    .filter(Boolean),
);

app.use(
  cors({
    origin(origin, callback) {
      // Requests without Origin are same-origin, server-to-server, or CLI calls.
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/$/, '');
      const localDevelopment =
        process.env.NODE_ENV !== 'production' &&
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalized);
      return callback(null, allowedOrigins.has(normalized) || localDevelopment);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    // Authorization carries the Google ID token that /entitlements and
    // /stripe/checkout verify; without it here the browser never sends one.
    allowedHeaders: ['Content-Type', 'Authorization', 'Stripe-Signature'],
    maxAge: 600,
  }),
);
app.use(express.json({ limit: '96kb' }));
app.use(express.urlencoded({ extended: true, limit: '32kb' }));

app.use('/api', router);

const jsonErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if ((err as { type?: string }).type === 'entity.too.large') {
    logger.warn({ requestId: req.id, ip: req.ip, path: req.path }, 'Rejected oversized request');
    res.status(HttpStatus.REQUEST_ENTITY_TOO_LARGE).json({ error: 'Request body is too large' });
    return;
  }
  next(err);
};

app.use(jsonErrorHandler);

export default app;
