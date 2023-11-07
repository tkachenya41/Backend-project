import { prisma } from '@/model/prisma';
import { Body, errorCode } from '@/utils/utils';
import { DBError } from '@/utils/custom-error';

const userRepository = {
  getById: async (id: number) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        throw new DBError(`User is not found`, errorCode.NOT_FOUND);
      }

      return user;
    } catch (error) {
      if (error instanceof DBError) {
        throw new DBError(error.message, errorCode.CONNECTION);
      }
    }
  },

  getAll: async () => {
    const users = await prisma.user.findMany();
    return users;
  },

  post: async (body: Body) => {
    try {
      const user = await prisma.user.create({
        data: {
          id: body.id,
          email: body.email,
          name: body.name,
          password: body.password,
        },
      });

      return user;
    } catch {
      throw new DBError(
        `Something went wrond with DataBase, probably using existing 'id' property`,
        errorCode.INTERNAL_SERVER_ERROR,
      );
    }
  },

  put: async (body: Body) => {
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
    if (isNaN(id)) {
      throw new DBError('UserId should be a number.', errorCode.INVALID);
    }

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
