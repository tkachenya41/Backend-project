import { postController } from '@/controllers/postController';
import { checkAdmin } from '@/middlewares/authValidation';
import { validateUserId } from '@/middlewares/userValidation';
import { validatePostBody } from '@/middlewares/postValidations';
import { Hono } from 'hono';
import { jwt } from 'hono/jwt';

const secretKey = process.env.SECRET_KEY!;

export const postRoutes = new Hono().basePath('/post');

postRoutes.post(
  '/',
  jwt({ secret: secretKey }),
  checkAdmin,
  validatePostBody,
  postController.create,
);
postRoutes.get(
  '/:id',
  jwt({ secret: secretKey }),
  checkAdmin,
  validateUserId,
  postController.getById,
);
postRoutes.delete(
  '/:id',
  jwt({ secret: secretKey }),
  checkAdmin,
  validateUserId,
  postController.delete,
);
postRoutes.get('/', jwt({ secret: secretKey }), checkAdmin, postController.getAll);
postRoutes.put(
  '/',
  jwt({ secret: secretKey }),
  checkAdmin,
  validatePostBody,
  postController.update,
);
