"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id?: string;
  name?: string;
  email?: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user: User, token: string) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setToken: (token: string | null) => set((state) => ({ token, isAuthenticated: !!token })),
    }),
    {
      name: "auth",
    }
  )
);
