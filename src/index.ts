import { Hono } from 'hono';
import { userRoutes } from './routes';

const app = new Hono().basePath('/users');

app.route('', userRoutes());

export default {
  port: 8000,
  fetch: app.fetch,
};
