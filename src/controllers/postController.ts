import { postRepository } from '@/repositories/postRepository';
import userRepository from '@/repositories/userRepository';
import { Context } from 'hono';

export const postController = {
  addPost: async (c: Context) => {
    const body = await c.req.json();
    const post = await postRepository.addPost(body, body);
    return c.json(post);
  },

  getPost: async (c: Context) => {
    const { id } = c.req.param();
    const posts = await postRepository.getPost(Number(id));
    return c.json(posts);
  },
};
