import { ValidationError } from '@/utils/custom-error';
import { errorCode, roles } from '@/utils/utils';
import { Context, Next } from 'hono';
import userRepository from '@/repositories/userRepository';
import { zValidator } from '@hono/zod-validator';
import { SignSchema, UserBodySchema } from '@/validation/body-check';

export const checkAdmin = async (c: Context, next: Next) => {
  const payload = c.get('jwtPayload');

  const user = await userRepository.findByEmail(payload.email);

  if (user.role !== roles.ADMIN) {
    throw new ValidationError('You are not allowed to this route', errorCode.INVALID);
  }
  return next();
};

export const CheckUser = async (c: Context, next: Next) => {
  const payload = c.get('jwtPayload');

  const user = await userRepository.findByEmail(payload.email);

  if (user.role !== roles.USER || roles.ADMIN) {
    throw new ValidationError('You are not allowed to this route', errorCode.INVALID);
  }

  return next();
};

export const validateRegistration = zValidator('json', UserBodySchema);
export const validateSign = zValidator('json', SignSchema);
