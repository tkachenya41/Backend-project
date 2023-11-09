import { prisma } from '@/model/prisma';
import { errorCode } from '@/utils/utils';
import { DBError } from '@/utils/custom-error';
import { User } from '@prisma/client/edge';

const userRepository = {
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

  post: async (body: User) => {
    const hash = await Bun.password.hash(body.password);
    try {
      const user = await prisma.user.create({
        data: {
          id: body.id,
          email: body.email,
          name: body.name,
          password: hash,
        },
      });

      return user;
    } catch (err) {
      throw new DBError(
        `Something went wrong with DataBase, probably using existing 'id' or 'email' property`,
        errorCode.INTERNAL_SERVER_ERROR,
      );
    }
  },

  put: async (body: User) => {
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
};

export default userRepository;
