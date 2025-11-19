'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthLoader({ children }) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;

    if (token && user) {
      setAuth(user, token);
    } else {
      setLoading(false);
    }
  }, [setAuth, setLoading]);

  return <>{children}</>;
}
