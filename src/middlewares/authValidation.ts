import { ValidationError } from '@/utils/custom-error';
import { errorCode } from '@/utils/utils';
import { User } from '@prisma/client';
import { Context, Next } from 'hono';
import { validator } from 'hono/validator';
import userRepository from '@/repositories/userRepository';
import { userService } from '@/services/userService';
import { zValidator } from '@hono/zod-validator';
import { UserBodySchema } from '@/validation/body-check';

export const validateSign = validator(
  'json',
  async (value: { email: User['email']; password: User['password'] }) => {
    const { email, password } = value;

    if (!email || !password) {
      throw new ValidationError('Email and password are required', errorCode.INVALID);
    }
    const user = await userRepository.findByEmail(email);

    userService.verifyPassword(password, user.password);

    return value;
  },
);

export const checkAdmin = async (c: Context, next: Next) => {
  const payload = c.get('jwtPayload');

  if (!payload) {
    throw new ValidationError('Unauthorized', errorCode.UNAUTHORIZED);
  }

  const user = await userRepository.findByEmail(payload.email);

  if (user.role !== 'ADMIN') {
    throw new ValidationError('You are not allowed to this route', errorCode.INVALID);
  }
  return next();
};

export const CheckUser = async (c: Context, next: Next) => {
  const payload = c.get('jwtPayload');

  if (!payload) {
    throw new ValidationError('Unauthorized', errorCode.UNAUTHORIZED);
  }

  const user = await userRepository.findByEmail(payload.email);

  if (user.role !== 'USER' || 'ADMIN') {
    throw new ValidationError('You are not allowed to this route', errorCode.INVALID);
  }

  return next();
};

export const validateRegistration = zValidator('json', UserBodySchema);
