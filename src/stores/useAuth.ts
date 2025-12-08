"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserDTO } from "@/types"; // пристосуй під свій тип

interface AuthState {
  user: UserDTO | null;
  loading: boolean;

  // actions
  setUser: (user: UserDTO | null) => void;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, get) => ({
      user: null,
      loading: false,

      setUser: (user) => set({ user }),

      // ---- GET CURRENT USER ----
      fetchUser: async () => {
        set({ loading: true });
        try {
          const res = await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
          });

          if (!res.ok) {
            set({ user: null });
            return;
          }

          const data = await res.json();
          set({ user: data.user });
        } catch {
          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },

      // ---- LOGIN ----
      login: async (email: string, password: string) => {
        set({ loading: true });

        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // ВАЖЛИВО для кукі
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) return false;

          // /api/auth/login встановить кукі + поверне user
          const data = await res.json();

          set({ user: data.user });

          return true;
        } catch {
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // ---- LOGOUT ----
      logout: async () => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });
        } finally {
          set({ user: null });
        }
      },
    }),

    {
      name: "auth-storage", // localStorage ключ
      partialize: (state) => ({ user: state.user }),
    }
  )
);
