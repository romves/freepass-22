import { z } from "zod";

export const signInUserSchema = z.object({
  body: z.object({
    nim: z.string().min(15).max(15),
    password: z.string().min(8),
  }),
});
export type signInUserSchemaType = z.TypeOf<typeof signInUserSchema>