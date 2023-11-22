import { postController } from '@/controllers/postController';
import { Hono } from 'hono';

export const postRoutes = new Hono().basePath('/post');

postRoutes.post('/', postController.addPost);
postRoutes.get('/:id', postController.getPost);
