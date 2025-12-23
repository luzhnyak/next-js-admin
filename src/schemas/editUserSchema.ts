import { z } from "zod";

export const editUserSchema = z.object({
  displayName: z
    .string()
    .min(3, "Назва має містити не менше 3 символів")
    .max(200, "Назва надто довга"),

  email: z.email("Некоректний email"),

  password: z
    .string()
    .min(6, "Пароль має містити не менше 6 символів")
    .optional(),
});

export type EditUserFormValues = z.infer<typeof editUserSchema>;
