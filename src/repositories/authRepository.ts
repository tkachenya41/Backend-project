import { prisma } from '@/model/prisma';
import { DBError } from '@/utils/custom-error';
import { errorCode } from '@/utils/utils';

export const authRepository = {
  findUser: async (email: string, password: string) => {
    const existedUser = await prisma.user.findFirst({
      where: { password: password, email: email },
    });

    if (!existedUser) {
      throw new DBError(`User is not found`, errorCode.NOT_FOUND);
    }

    return existedUser;
  },
};
