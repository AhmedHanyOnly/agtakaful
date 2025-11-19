'use client';

import { useAuthStore } from '@/store/useAuthStore';
import api from '@/api/api';

export async function login(payload) {
  const { data } = await api.post('/api/login', payload);
  return data;
}

export async function logout() {
  const { data } = await api.post('/api/logout');

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  useAuthStore.getState().clearAuth();

  return data;
}
