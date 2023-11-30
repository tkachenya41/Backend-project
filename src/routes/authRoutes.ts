import { Hono } from 'hono';
import { authController } from '@/controllers/authController.ts';
import { validateRegistration, validateSign } from '@/middlewares/authValidation';

export const authRoutes = new Hono().basePath('/auth');

authRoutes.post('/sign', validateSign, authController.login);
authRoutes.post('/register', validateRegistration, authController.register);
