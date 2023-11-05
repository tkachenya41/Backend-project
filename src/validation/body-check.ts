import { Context } from 'hono';
import { z, ZodError } from 'zod';

export const BodySchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[A-Za-z ]+$/),
  email: z.string().regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(/^[A-Za-z0-9]+$/),
});

export const formatZodError = (error: unknown, c: Context) => {
  if (error instanceof ZodError) {
    const formattedError = error.flatten();
    c.status(400);
    return c.json({ errors: formattedError.fieldErrors });
  }
};

export interface Body {
  id: number;
  name: string;
  email: string;
  password: string;
}
