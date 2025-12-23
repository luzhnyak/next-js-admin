import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Некоректний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

export const registerSchema = z.object({
  displayName: z.string().min(2, "Мінімум 2 символи"),
  email: z.email("Некоректний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type AuthFormData = LoginFormData & Partial<RegisterFormData>;
