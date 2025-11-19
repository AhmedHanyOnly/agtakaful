"use client";

import React from "react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[var(--color-primary)] font-semibold">جاري التحميل...</p>
      </div>
    </div>
  );
};
