import { z } from "zod";

export const createClassSchema = z.object({
  body: z.object({
    class_code: z.string().min(3),
    course_id: z.string().min(3),
  }),
});
export type createClassSchemaType = z.TypeOf<typeof createClassSchema>
