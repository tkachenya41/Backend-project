import { prisma } from "../model/prisma";
import { Body, Set } from "../utils/utils";

export const user = {
  getById: async (userId: number, set: Set) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      set.status = 400;
      return "User not found";
    }

    return user;
  },

  getAll: () => prisma.user.findMany(),

  post: async (body: Body, set: Set) => {
    if (!body.email) {
      set.status = 400;
      return "Email is required";
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return user;
  },

  put: async (body: Body, set: Set) => {
    try {
      const user = await prisma.user.update({
        where: {
          id: body.id,
        },
        data: {
          email: body.email,
        },
      });
      return user;
    } catch {
      set.status = 400;
      return "User not found";
    }
  },

  delete: async (body: Body, set: Set) => {
    try {
      const user = await prisma.user.deleteMany({
        where: { id: body.id },
      });
      return user;
    } catch {
      set.status = 400;
      return "User not found";
    }
  },
};
