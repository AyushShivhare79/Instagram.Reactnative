import { z } from 'zod/v3';

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name is too long' }),

  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be under 20 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),

  email: z.string().email({ message: 'Invalid email address' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100),
});

export type SignupSchema = z.infer<typeof signupSchema>;
