"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (!token && !localToken) {
      router.push("/login");
    } else if (!token && localToken) {
      useAuthStore.getState().setAuth(null, localToken);
    }
  }, [token, router]);

  return <>{children}</>;
}
