import { Hono } from 'hono';
import { userController } from '@/controllers/userController';
import { validateUserBody, validateUserId } from '@/middlewares/userValidation';
import { postRoutes } from './postRoutes';
import { checkAdmin } from '@/middlewares/authValidation';
import { jwt } from 'hono/jwt';

const secretKey = process.env.SECRET_KEY!;

export const userRoutes = new Hono().basePath('/users');

userRoutes.route('/', postRoutes);

userRoutes.get(
  '/:id',
  jwt({ secret: secretKey }),
  checkAdmin,
  validateUserId,
  userController.getById,
);
userRoutes.get('/', jwt({ secret: secretKey }), checkAdmin, userController.getAll);
userRoutes.post(
  '/',
  jwt({ secret: secretKey }),
  checkAdmin,
  validateUserBody,
  userController.create,
);
userRoutes.put(
  '/',
  jwt({ secret: secretKey }),
  checkAdmin,
  validateUserBody,
  userController.update,
);
userRoutes.delete(
  '/:id',
  jwt({ secret: secretKey }),
  checkAdmin,
  validateUserId,
  userController.delete,
);
