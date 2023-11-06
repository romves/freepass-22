import * as z from 'zod';

// Define the 'body' schema
export const bodySchema = z.object({
  nama_lengkap: z.string().min(3).optional(),
  password: z.string().min(8).optional(),
});

// Define the 'updateUserSchema' using the 'body' schema
export const updateUserSchema = z.object({
  body: bodySchema,
});

// Define a type for 'body' for reuse
export type updateUserBodyType = z.TypeOf<typeof bodySchema>;
export type updateUserSchemaType = z.TypeOf<typeof updateUserSchema>