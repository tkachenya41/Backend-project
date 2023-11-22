import { postRepository } from '@/repositories/postRepository';
import { Context } from 'hono';

export const postController = {
  addPost: async (c: Context) => {
    const body = await c.req.json();
    const post = await postRepository.create(body, body);
    return c.json(post);
  },

  getPost: async (c: Context) => {
    const { id } = c.req.param();
    const posts = await postRepository.getById(Number(id));
    return c.json(posts);
  },
};
