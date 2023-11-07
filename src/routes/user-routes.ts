import { Hono } from 'hono';
import { user } from '@/controllers/userController';
import { errorHandler } from '@/utils/custom-error';
import { BodySchema, formatZodError } from '@/validation/body-check';
import { zValidator } from '@hono/zod-validator';
import { idSchema } from '@/middlewares/validation';

export const userRoutes = new Hono().basePath('/users');

userRoutes.onError(errorHandler);
userRoutes.get('/:id', zValidator('param', idSchema), async (c) => {
  const { id } = c.req.param();
  const userById = await user.getById(Number(id));
  return c.json(userById);
});
userRoutes.get('/', async (c) => {
  const users = await user.getAll();
  return c.json(users);
});
userRoutes.post('/', zValidator('body', BodySchema), async (c) => {
  const body = await c.req.json();
  try {
    const createdUser = await user.post(body);
    return c.json(createdUser);
  } catch (error) {
    return formatZodError(error, c);
  }
});
userRoutes.put('/', async (c) => {
  const body = await c.req.json();
  try {
    BodySchema.parse(body);
    const updatedUser = await user.put(body);
    return c.json(updatedUser);
  } catch (error) {
    return formatZodError(error, c);
  }
});
userRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const userById = await user.delete(Number(id));
  return c.json(userById);
});
