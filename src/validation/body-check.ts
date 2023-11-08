import { Context } from 'hono';
import { z } from 'zod';

export const BodySchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z\s]+$/i),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(/^[\w\@#$%^&*()_+=]+$/),
});
