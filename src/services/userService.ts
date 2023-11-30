import { ValidationError } from '@/utils/custom-error';
import { errorCode } from '@/utils/utils';
import { User } from '@prisma/client';

export const userService = {
  hashPassword: async (password: User['password']) => {
    return await Bun.password.hash(password);
  },
  verifyPassword: async (password: User['password'], hashPassword: string) => {
    const isMatch = await Bun.password.verify(password, hashPassword);

    if (!isMatch) {
      throw new ValidationError('Password does not match', errorCode.INVALID);
    }
  },
};
