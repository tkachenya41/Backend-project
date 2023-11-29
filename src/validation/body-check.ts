import { z } from 'zod';

export const UserBodySchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z]+(?:\s[a-z]+)*$/i),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=(?:.*[@#$%^&*()_+=]){3})[\w\@#$%^&*()_+=]/),
});

export const PostBodySchema = z.object({
  userId: z.number(),
  title: z.string(),
});
