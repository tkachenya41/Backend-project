import { prisma } from '@/model/prisma';
import { errorCode } from '@/utils/utils';
import { DBError } from '@/utils/custom-error';
import { User } from '@prisma/client';

export const userRepository = {
  getById: async (id: number) => {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new DBError(`User is not found`, errorCode.NOT_FOUND);
    }
    return user;
  },

  getAll: async () => {
    const users = await prisma.user.findMany();
    return users;
  },

  create: async (body: Omit<User, 'id'>) => {
    const hash = await Bun.password.hash(body.password);
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: hash,
        },
      });

      return user;
    } catch (err) {
      throw new DBError(
        `Something went wrong with DataBase, probably using existing 'email' property`,
        errorCode.INTERNAL_SERVER_ERROR,
      );
    }
  },

  update: async (body: Omit<User, 'id'> & { id?: number }) => {
    try {
      const user = await prisma.user.update({
        where: {
          id: body.id,
        },
        data: body,
      });
      return user;
    } catch {
      throw new DBError('User not found', errorCode.NOT_FOUND);
    }
  },

  delete: async (id: number) => {
    try {
      const user = await prisma.user.delete({
        where: { id: id },
      });

      return user;
    } catch (error) {
      throw new DBError(`${id} is not found`, errorCode.NOT_FOUND);
    }
  },

  find: async (email: string) => {
    const existedUser = await prisma.user.findFirst({
      where: { email: email },
    });

    return existedUser;
  },
};

export default userRepository;
