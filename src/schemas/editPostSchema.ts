import { z } from "zod";

export const editPostSchema = z.object({
  title: z
    .string()
    .min(1, "Поле обов’язкове")
    .min(3, "Заголовок має містити не менше 3 символів")
    .max(200, "Заголовок надто довгий"),
  slug: z.string(),
  content: z.string().min(10, "Контент має містити не менше 10 символів"),
  answer: z.string(),
  showMainImage: z.boolean(),
  categoryIds: z.array(z.number()),
});

export type EditPostFormValues = z.infer<typeof editPostSchema>;

// const UpdatePostSchema = z.object({
//   title: z.string().min(3).optional(),
//   slug: z.string().min(3).optional(),
//   content: z.string().min(1).optional(),
//   answer: z.string().optional(),
//   categoryIds: z.array(z.number()).optional(),
// });
