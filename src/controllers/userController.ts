import userRepository from '@/repositories/userRepository';
import { Context } from 'hono';

export const userController = {
  getById: async (c: Context) => {
    const { id } = c.req.param();
    const userById = await userRepository.getById(Number(id));
    return c.json(userById);
  },

  getAll: async (c: Context) => {
    const users = await userRepository.getAll();
    return c.json(users);
  },

  post: async (c: Context) => {
    const body = await c.req.json();
    const createdUser = await userRepository.post(body);
    return c.json(createdUser);
  },

  put: async (c: Context) => {
    const body = await c.req.json();
    const updatedUser = await userRepository.put(body);
    return c.json(updatedUser);
  },

  delete: async (c: Context) => {
    const id = c.req.param('id');
    const userById = await userRepository.delete(Number(id));
    return c.json(userById);
  },
  addPost: async (c: Context) => {
    const body = await c.req.json();
    const post = await userRepository.addPost(body, body);
    return c.json(post);
  },
  getPost: async (c: Context) => {
    const { id } = c.req.param();
    const posts = await userRepository.getPost(Number(id));
    return c.json(posts);
  },
};
