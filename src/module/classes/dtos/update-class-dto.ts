import { z } from "zod";

export const bodySchema = z.object({
  class_code: z.string().min(3),
  course_id: z.string().min(3),
});

export const updateClassSchema = z.object({
  body: bodySchema,
});

export type updateClassBodyType = z.TypeOf<typeof bodySchema>;
export type updateClassSchemaType = z.TypeOf<typeof updateClassSchema>;

