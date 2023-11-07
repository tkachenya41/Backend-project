import { Hono } from 'hono';
import { routes } from '@/routes/index';

const app = new Hono();

app.route('', routes);

export default {
  port: 8000,
  fetch: app.fetch,
};
