import { create } from 'zustand';

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  setUser: (user) => set({ user }),

  setToken: (token) => set({ token }),

  logout: () =>
    set({
      user: null,
      token: null,
    }),
}));
