import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const validateSign = zValidator(
  'json',
  z.object({
    email: z.string(),
    password: z.string(),
  }),
);
