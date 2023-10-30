import { prisma } from "@/model/prisma";
import { Body, Response } from "@/utils/utils";

export const user = {
  getById: async (userId: number, set: Response) => {
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

  post: async (body: Body, set: Response) => {
    if (!body.email) {
      set.status = 400;
      return "Email is required";
    }

    const user = await prisma.user.create({
      data: body,
    });

    return user;
  },

  put: async (body: Body, set: Response) => {
    if (!body.id) {
      set.status = 400;
      return "ID is required";
    }

    try {
      const user = await prisma.user.update({
        where: {
          id: body.id,
        },
        data: body,
      });
      return user;
    } catch {
      set.status = 404;
      return "User not found";
    }
  },

  delete: async (body: Body, set: Response) => {
    if (!body.id) {
      set.status = 400;
      return "ID is required";
    }

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
