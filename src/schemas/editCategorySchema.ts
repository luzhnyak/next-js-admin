import { z } from "zod";

export const editCategorySchema = z.object({
  name: z
    .string()
    .min(3, "Назва має містити не менше 3 символів")
    .max(200, "Назва надто довга"),

  slug: z
    .string()
    .min(3, "Slug має містити не менше 3 символів")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug може містити тільки малі літери, цифри та дефіси"
    ),
});

export type EditPostFormValues = z.infer<typeof editCategorySchema>;
