import { Hono } from 'hono';
import { authController } from '@/controllers/authController.ts';
import { validateRegistration, validateSign } from '@/middlewares/authValidation';
import { jwt } from 'hono/jwt';

const secretKey = process.env.SECRET_KEY!;

export const authRoutes = new Hono().basePath('/auth');

authRoutes.get('/page', jwt({ secret: secretKey }), authController.getPayload);
authRoutes.post('/sign', validateSign, authController.getToken);
authRoutes.post('/register', validateRegistration, authController.register);
