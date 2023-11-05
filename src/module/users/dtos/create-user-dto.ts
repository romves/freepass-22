import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    nama_lengkap: z.string().min(3),
    nim: z.string().min(15).max(15),
    password: z.string().min(8),
  }),
});
export type createUserSchemaType = z.TypeOf<typeof createUserSchema>
