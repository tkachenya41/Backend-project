import { sign } from 'hono/jwt';
import userRepository from '@/repositories/userRepository';
import { SignContext, UserBodyContext } from '@/middlewares/types';
import { userService } from '@/services/userService';

export const authController = {
  login: async (c: SignContext) => {
    const { email, password } = c.req.valid('json');

    const user = await userRepository.findByEmail(email);

    userService.verifyPassword(password, user.password);

    const secret = process.env.SECRET_KEY!;
    const payload = {
      name: user.name,
      email: user.email,
    };
    const token = await sign(payload, secret);
    return c.text(token);
  },
  register: async (c: UserBodyContext) => {
    const body = c.req.valid('json');
    const user = await userRepository.create(body);
    return c.json('You are succesfully registered');
  },
};
