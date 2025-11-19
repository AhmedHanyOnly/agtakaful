"use client";
import { useHomeStore } from "@/store/useHomeStore";
import React from "react";

const AboutPage = () => {
  const homeData = useHomeStore((state) => state.homeData);
  const social = homeData.data?.social || [];

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center px-4 py-20"
      style={{
        background: "linear-gradient(135deg, #e11f24 0%, #851317 100%)",
      }}
    >
      <h1 className="text-5xl font-extrabold text-white mb-6 text-center drop-shadow-lg">
        الشروط والأحكام
      </h1>
      <p className="text-lg text-white leading-relaxed max-w-3xl text-center drop-shadow-md">
        نحن شركة رائدة في تقديم أفضل الخدمات لعملائنا، نهدف دائمًا إلى تقديم
        حلول مبتكرة وعملية تلبي احتياجات السوق وتحقق رضا العملاء. خبرتنا الطويلة
        وكفاءتنا العالية تجعلنا الخيار الأمثل لأي مشروع أو تعاون.
      </p>
    </section>
  );
};

export default AboutPage;
