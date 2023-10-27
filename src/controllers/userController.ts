import Elysia from "elysia";
import { prisma } from "../model/prisma";

export const user = {
  getById: (userId: number) => {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
  getAll: () => prisma.user.findMany(),
  post: () =>
    prisma.user.create({
      data: {
        name: "John",
        email: "john243@example.com",
      },
    }),
  put: () =>
    prisma.user.update({
      where: {
        id: 10,
      },
      data: { name: "Updated name" },
    }),
  delete: () =>
    prisma.user.deleteMany({
      where: { id: 11 },
    }),
};
