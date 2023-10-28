import { prisma } from "../model/prisma";
import { Body } from "../utils/utils";

export const user = {
  getById: (userId: number) => {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },

  getAll: () => prisma.user.findMany(),

  post: (body: Body) => {
    return prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
  },

  put: (body: Body) => {
    return prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        email: body.email,
        name: body.name,
      },
    });
  },

  delete: (body: Body) => {
    return prisma.user.deleteMany({
      where: { id: body.id },
    });
  },
};
