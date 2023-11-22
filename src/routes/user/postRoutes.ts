import { postController } from '@/controllers/postController';
import { validatePostBody, validateUserId } from '@/middlewares/userValidation';
import { Hono } from 'hono';

export const postRoutes = new Hono().basePath('/post');

postRoutes.post('/', validatePostBody, postController.create);
postRoutes.get('/:id', validateUserId, postController.getById);
postRoutes.delete('/:id', validateUserId, postController.delete);
postRoutes.get('/', postController.getAll);
postRoutes.put('/', validatePostBody, postController.update);
