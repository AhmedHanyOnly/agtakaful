"use client";
import { useHomeStore } from "@/store/useHomeStore";
import React from "react";

const AboutPage = () => {
  const homeData = useHomeStore((state) => state.homeData);
  const pages = homeData.data?.pages || [];

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center px-4 py-20"
      style={{
        background: "linear-gradient(135deg, #e11f24 0%, #851317 100%)",
      }}
    >
      <h1 className="text-5xl font-extrabold text-white mb-6 text-center drop-shadow-lg">
        الأسئلة الشائعة
      </h1>
      <p className="text-lg text-white leading-relaxed max-w-3xl text-center drop-shadow-md">
        {pages["faq,"]}
      </p>
    </section>
  );
};

export default AboutPage;
