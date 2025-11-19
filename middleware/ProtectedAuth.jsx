"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProtectedAuth({ children }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (token || localToken) {
      router.push("/");
    }
  }, [token, router]);

  return <>{children}</>;
}
