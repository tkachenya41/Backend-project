import { Hono } from 'hono';
import { authController } from '@/controllers/authController.ts';
import { errorHandler } from '@/utils/custom-error';
import { validateSign } from '@/middlewares/authValidation';
import { jwt } from 'hono/jwt';

export const authRoutes = new Hono().basePath('/auth');

authRoutes.onError(errorHandler);
authRoutes.use(
  '/page',
  jwt({
    secret: 'mySecretKey',
  }),
);
authRoutes.get('/page', authController.getPayload);
authRoutes.post('/sign', validateSign, authController.getToken);
