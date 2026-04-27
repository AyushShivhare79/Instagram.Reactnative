import z from 'zod/v3';

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name is too long' })
    .trim(),

  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(30, { message: 'Username too long' })
    .regex(/^[a-zA-Z0-9._]+$/, {
      message: 'Only letters, numbers, dot and underscore allowed',
    }),

  bio: z
    .string()
    .max(150, { message: 'Bio must be under 150 characters' })
    .optional(),

  website: z.string().url({ message: 'Invalid URL' }).optional(),
  gender: z.enum(['male', 'female']).optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
