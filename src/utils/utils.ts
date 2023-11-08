import { Context } from "hono";
import { ZodError } from "zod";

export const errorCode = {
  NOT_FOUND: 'NOT_FOUND',
  INVALID: 'INVALID',
  CONNECTION: 'CONNECTION',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
}as const;

export const formatZodError = (error: unknown, c: Context) => {
  if (error instanceof ZodError) {
    const formattedError = error.flatten();
    c.status(400);
    return c.json({ errors: formattedError.fieldErrors });
  }
};