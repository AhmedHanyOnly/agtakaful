"use client";
import { useHomeStore } from "@/store/useHomeStore";
import React, { useEffect } from "react";

export default function HomeDataProvider({ children }) {
  const { homeData, loading, error, fetchHomeData } = useHomeStore();

  useEffect(() => {
    if (!homeData) fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-t-red-600 border-gray-200 rounded-full animate-spin" />
          <span className="text-gray-700 text-lg font-semibold">
            جاري التحميل...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return <>{children}</>;
}
