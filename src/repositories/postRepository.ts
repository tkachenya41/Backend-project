import { prisma } from '@/model/prisma';
import { DBError } from '@/utils/custom-error';
import { errorCode } from '@/utils/utils';
import { Post, User } from '@prisma/client';

export const postRepository = {
  create: async (user: User, posts: Post) => {
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
  getById: async (id: number) => {
    const post = await prisma.post.findFirst({
      where: {
        userId: id,
      },
    });
    if (!post) {
      throw new DBError(`Post is not found`, errorCode.NOT_FOUND);
    }
    return post;
  },
  getAll: async () => {
    const posts = await prisma.post.findMany();
    return posts;
  },
  delete: async (id: number) => {
    try {
      const post = await prisma.post.delete({
        where: {
          userId: id,
        },
      });
      return post;
    } catch (error) {
      throw new DBError(`${id} is not found`, errorCode.NOT_FOUND);
    }
  },
  update: async (post: Post) => {
    try {
      const existedPost = await prisma.post.update({
        where: {
          userId: post.userId,
        },
        data: post,
      });
      return existedPost;
    } catch {
      throw new DBError('Post not found', errorCode.NOT_FOUND);
    }
  },
};
