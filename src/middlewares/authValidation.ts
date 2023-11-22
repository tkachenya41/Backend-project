import { prisma } from '@/model/prisma';
import { DBError, ValidationError } from '@/utils/custom-error';
import { errorCode } from '@/utils/utils';
import { User } from '@prisma/client';
import { validator } from 'hono/validator';

export const validateSign = validator(
  'json',
  async (value: { email: string; password: User['password'] }) => {
    const { email, password } = value;

    if (!email || !password) {
      throw new ValidationError('Email and password are required', errorCode.INVALID);
    }

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new DBError('User not found', errorCode.NOT_FOUND);
    }

    const isMatch = await Bun.password.verify(password, user.password);

    if (!isMatch) {
      throw new ValidationError('Password does not match', errorCode.INVALID);
    }

    return value;
  },
);
