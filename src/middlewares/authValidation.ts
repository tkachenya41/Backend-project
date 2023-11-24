import { prisma } from '@/model/prisma';
import { DBError, ValidationError } from '@/utils/custom-error';
import { errorCode } from '@/utils/utils';
import { User } from '@prisma/client';
import { verify } from 'hono/jwt';
import { Context, Next } from 'hono';
import { validator } from 'hono/validator';

const secretKey = process.env.SECRET_KEY!;
const adminToken = process.env.ADMIN_TOKEN!;

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

export const checkAdmin = async (c: Context, next: Next) => {
  const auth = c.req.header('Authorization');

  const token = auth?.replace('Bearer ', '');

  if (token !== adminToken) {
    throw new ValidationError('You are not allowed to this route', errorCode.INVALID);
  }
  return next();
};

export const CheckUser = async (c: Context, next: Next) => {
  const auth = c.req.header('Authorization');

  if (!auth) {
    throw new ValidationError(
      'Missing authorization... You need to sign in and get access token',
      errorCode.NOT_FOUND,
    );
  }

  try {
    const token = auth.replace('Bearer ', '');
    const valid = await verify(token, secretKey);
  } catch {
    throw new ValidationError('Invalid token', errorCode.INVALID);
  }

  return next();
};
