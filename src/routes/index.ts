import { Hono } from 'hono';
import { user } from '@/controllers/userController';
import { DBError } from '@/validation/custom-error';
import { errorCode } from '@/utils/utils';

export const userRoutes = () => {
  const app = new Hono();

  app.onError((err, c) => {
    if (err instanceof DBError) {
      switch (err.code) {
        case errorCode.INVALID: {
          c.status(400);
          break;
        }
        case errorCode.CONNECTION: {
          c.status(502);
          break;
        }
        case errorCode.INTERNAL_SERVER_ERROR: {
          c.status(500);
          break;
        }
        case errorCode.NOT_FOUND: {
          c.status(404);
          break;
        }
      }
    }
    return c.json(err.message);
  });
  app.get('/:id', async (c) => {
    const { id } = c.req.param();
    const userById = await user.getById(Number(id));
    return c.json(userById);
  });
  app.get('/', async (c) => {
    const users = await user.getAll();
    return c.json(users);
  });
  app.post('/', async (c) => {
    const body = await c.req.json();
    const createdUser = await user.post(body);
    return c.json(createdUser);
  });
  app.put('/', async (c) => {
    const body = await c.req.json();
    const updatedUser = await user.put(body);
    return c.json(updatedUser);
  });
  app.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const userById = await user.delete(Number(id));
    return c.json(userById);
  });

  return app;
};
