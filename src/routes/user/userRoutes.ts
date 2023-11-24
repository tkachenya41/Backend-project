import { Hono } from 'hono';
import { userController } from '@/controllers/userController';
import { validateUserBody, validateUserId } from '@/middlewares/userValidation';
import { postRoutes } from './postRoutes';
import { CheckUser, checkAdmin } from '@/middlewares/authValidation';

export const userRoutes = new Hono().basePath('/users');

userRoutes.route('/', postRoutes);

userRoutes.get('/:id', validateUserId, checkAdmin, userController.getById);
userRoutes.get('/', checkAdmin, userController.getAll);
userRoutes.post('/', validateUserBody, userController.create);
userRoutes.put('/', validateUserBody, CheckUser, userController.update);
userRoutes.delete('/:id', validateUserId, checkAdmin, userController.delete);
