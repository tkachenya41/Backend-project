import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.user.create({
  data: {
    name: "Roman Tkachenya",
    email: `tkachenya-${Math.random()}@gmail.com`,
  },
});

const count = await prisma.user.count();
console.log(`There are ${count} users in the database.`);
