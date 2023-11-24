import { postController } from '@/controllers/postController';
import { CheckUser, checkAdmin } from '@/middlewares/authValidation';
import { validatePostBody, validateUserId } from '@/middlewares/userValidation';
import { Hono } from 'hono';

export const postRoutes = new Hono().basePath('/post');

postRoutes.post('/', validatePostBody, postController.create);
postRoutes.get('/:id', validateUserId, postController.getById);
postRoutes.delete('/:id', validateUserId, checkAdmin, postController.delete);
postRoutes.get('/', postController.getAll);
postRoutes.put('/', validatePostBody, CheckUser, postController.update);
