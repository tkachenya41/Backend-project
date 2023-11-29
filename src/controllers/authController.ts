import { Context } from 'hono';
import { sign } from 'hono/jwt';
import userRepository from '@/repositories/userRepository';
import { SignContext, UserBodyContext } from '@/middlewares/types';

export const authController = {
  getToken: async (c: SignContext) => {
    const { email } = c.req.valid('json');
    const user = await userRepository.findByEmail(email);
    const secret = process.env.SECRET_KEY!;
    const payload = {
      name: user.name,
      email: user.email,
    };
    const token = await sign(payload, secret);
    return c.text(token);
  },

  getPayload: (c: Context) => {
    const payload = c.get('jwtPayload');
    return c.json(payload);
  },
  register: async (c: UserBodyContext) => {
    const body = c.req.valid('json');
    const user = await userRepository.create(body);
    return c.json('You are succesfully registered');
  },
};
