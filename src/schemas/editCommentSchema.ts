import { z } from "zod";

export const editCommentSchema = z.object({
  content: z.string().min(1, "Коментар має містити не менше 1 символа"),
});

export type EditCommentFormValues = z.infer<typeof editCommentSchema>;
