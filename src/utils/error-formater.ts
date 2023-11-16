import { Context } from 'hono';
import { ZodError } from 'zod';

export const formatZodError = (error: unknown, c: Context) => {
  if (error instanceof ZodError) {
    const formattedError = error.flatten();
    c.status(400);
    return c.json({ errors: formattedError.fieldErrors });
  }
};
