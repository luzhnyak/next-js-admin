import { useMutation } from "@tanstack/react-query";

export const useLogin = () =>
  useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Помилка авторизації");
      return res.json();
    },
  });

export const useRegister = () =>
  useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Помилка реєстрації");
      return res.json();
    },
  });

export const useFetchAuthUser = () =>
  useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Помилка отримання користувача");
      return res.json();
    },
  });

export const useLogout = () =>
  useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Помилка виходу");
      return res.json();
    },
  });
