import { Hono } from 'hono';
import { userRoutes } from './user-routes';

export const routes = new Hono();
routes.route('', userRoutes);
