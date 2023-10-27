import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const user = {
  getAllUsers: () => prisma.user.findMany(),
  postUser: () =>
    prisma.user.create({
      data: {
        name: "John",
        email: "john243@example.com",
      },
    }),
  putUser: () =>
    prisma.user.update({
      where: {
        id: 10,
      },
      data: { name: "Updated name" },
    }),
  deleteUser: () =>
    prisma.user.deleteMany({
      where: { id: 11 },
    }),
};
