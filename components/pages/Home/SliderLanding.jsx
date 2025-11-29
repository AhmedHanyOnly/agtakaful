"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHomeStore } from "@/store/useHomeStore";

gsap.registerPlugin(ScrollTrigger);

// const sliders = [
//   {
//     img: "/landing/sliders/slider-1.jpg",
//     title: "خصم 50% على الإلكترونيات",
//     subtitle: "احصل على كوبون خصم من متجر الإلكترونيات الآن",
//     // link: "احصل على الكوبون",
//   },
//   {
//     img: "/landing/sliders/slider-2.jpg",
//     title: "عروض الموضة الصيفية",
//     subtitle: "خصومات خاصة على ملابس الصيف من أشهر الماركات",
//     // link: "استفد بالعرض",
//   },
//   {
//     img: "/landing/sliders/slider-3.jpg",
//     title: "خصم حصري للموقع",
//     subtitle: "استمتع بخصومات على المنتجات عند التسوق عبر موقعنا",
//     // link: "اكتشف العروض",
//   },
// ];

export default function SliderLanding() {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const homeData = useHomeStore((state) => state.homeData);
  const sliders = homeData.data?.sliders || [];
  useEffect(() => {
    const ctx = gsap.context(() => {
      const currentSlide =
        containerRef.current.querySelectorAll(".slide")[current];
      if (!currentSlide) return;

      gsap.fromTo(
        currentSlide,
        { autoAlpha: 0, scale: 1.05 },
        { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      );

      gsap.fromTo(
        currentSlide.querySelectorAll(".slide-content"),
        { y: 100, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, delay: 0.3, stagger: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliders.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] overflow-hidden bg-black"
    >
      {sliders.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 slide transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundColor: "#000" }} // خلفية داكنة تمنع الأبيض المؤقت
        >
          <img
            src={slide.image}
            alt={slide.title}
            fill
            className="absolute inset-0 w-full h-full object-cover z-0"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container mx-auto py-4 z-20 flex flex-col items-start justify-center h-full px-12 text-white">
            <p className="text-lg opacity-75 slide-content">{slide.subtitle}</p>
            <h2 className="text-5xl font-bold uppercase tracking-wide slide-content">
              {slide.title}
            </h2>
            {slide.link && (
              <a
                href="#"
                className="mt-4 px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition slide-content"
              >
                {slide.link}
              </a>
            )}
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {sliders.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}
