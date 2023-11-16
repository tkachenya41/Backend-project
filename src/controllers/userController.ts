import userRepository from '@/repositories/userRepository';
import { Context } from 'hono';

export const userController = {
  getById: async (c: Context) => {
    // @ts-ignore
    const { id } = c.req.valid('param');
    const userById = await userRepository.getById(id);
    return c.json(userById);
  },

  getAll: async (c: Context) => {
    const users = await userRepository.getAll();
    return c.json(users);
  },

  create: async (c: Context) => {
    const body = await c.req.json();
    const createdUser = await userRepository.create(body);
    return c.json(createdUser);
  },

  update: async (c: Context) => {
    const body = await c.req.json();
    const updatedUser = await userRepository.update(body);
    return c.json(updatedUser);
  },

  delete: async (c: Context) => {
    const id = c.req.param('id');
    const userById = await userRepository.delete(Number(id));
    return c.json(userById);
  },
};
