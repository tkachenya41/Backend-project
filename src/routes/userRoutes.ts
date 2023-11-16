import { Hono } from 'hono';
import { userController } from '@/controllers/userController';
import { UserBodySchema } from '@/validation/body-check';
import { zValidator } from '@hono/zod-validator';
import { validateUserId } from '@/middlewares/userValidation';
import { postController } from '@/controllers/postController';

export const userRoutes = new Hono().basePath('/users');

userRoutes.get('/:id', validateUserId, userController.getById);
userRoutes.get('/', userController.getAll);
userRoutes.post('/', zValidator('json', UserBodySchema), userController.create);
userRoutes.put('/', zValidator('json', UserBodySchema), userController.update);
userRoutes.delete('/:id', validateUserId, userController.delete);
