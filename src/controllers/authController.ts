import { authRepository } from '@/repositories/authRepository.ts';
import { Context } from 'hono';
import { sign } from 'hono/jwt';

export const authController = {
  getToken: async (c: Context) => {
    const { email, password } = await c.req.json();
    const user = await authRepository.findUser(email, password);
    const secret = 'mySecretKey';
    const payload = {
      name: user.name,
      email: user.email,
    };
    const token = await sign(payload, secret);
    return c.text(`token: ${token}`);
  },

  getPayload: (c: Context) => {
    const payload = c.get('jwtPayload');
    return c.json(payload);
  },
};
