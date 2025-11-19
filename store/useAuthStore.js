'use client';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuth: false,
  loading: true, // البداية true
  setAuth: (user, token) =>
    set({ user, token, isAuth: !!token, loading: false }),
  clearAuth: () =>
    set({ user: null, token: null, isAuth: false, loading: false }),
  setLoading: (loading) => set({ loading }),
}));
