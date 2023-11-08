import { Hono } from 'hono';
import { userController } from '@/controllers/userController';
import { errorHandler } from '@/utils/custom-error';
import { BodySchema} from '@/validation/body-check';
import { zValidator } from '@hono/zod-validator';
import { validateUserId } from '@/middlewares/validation';

export const userRoutes = new Hono().basePath('/users');

userRoutes.onError(errorHandler);
userRoutes.get('/:id',validateUserId, userController.getById);
userRoutes.get('/', userController.getAll);
userRoutes.post('/', zValidator('json',BodySchema), userController.post);
userRoutes.put('/', zValidator('json', BodySchema), userController.put);
userRoutes.delete('/:id',validateUserId, userController.delete);
