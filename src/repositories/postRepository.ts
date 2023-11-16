import { prisma } from '@/model/prisma';
import { Post, User } from '@prisma/client';

export const postRepository = {
  addPost: async (user: User, posts: Post) => {
    const post = await prisma.post.create({
      data: {
        user: {
          create: {
            email: user.email,
            password: user.password,
            name: user.name,
          },
        },
        title: posts.title,
      },
    });
    return post;
  },
  getPost: async (id: number) => {
    const post = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        post: true,
      },
    });
    return post;
  },
};
