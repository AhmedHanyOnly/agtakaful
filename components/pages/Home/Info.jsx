"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHomeStore } from "@/store/useHomeStore";

export const Info = ({
  title = "موقع العروض",
  subtitle = "وجهتك الأولى لعروض وخصومات حقيقية",
  welcome = "مرحباً بك",
  paragraph1 = "نحن في موقع العروض نوفّر لك أحدث الخصومات والعروض من أشهر المتاجر والعلامات التجارية حول العالم، في مكان واحد.",
  paragraph2 = "تابع يومياً أفضل التخفيضات على الإلكترونيات، الأزياء، السفر والمزيد — لتوفّر وقتك ومالك بسهولة.",
  brandText = "AG",
  brandHighlight = "Takaful",
  imagesOne = "/landing/info-1.jpg",
  imagesTwo = "/landing/info-1.jpg",
  imagesThree = "/landing/info-1.jpg",
}) => {
  const homeData = useHomeStore((state) => state.homeData);
  const front_section = homeData.data?.front_section || [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".info-text",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".info-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".info-images",
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: ".info-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="container mx-auto mb-44">
      <section className="info-section relative grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-16 px-6 md:px-16 bg-white mb-24">
        {/* خلفية النص */}
        <div className="absolute bottom-[-150px] inset-x-0 text-center select-none pointer-events-none">
          <h2 className="text-[50px] md:text-[160px] font-extrabold text-black/5 uppercase">
            {front_section.brand_highlight}
            <span className="text-red-600">{front_section.brand_text}</span>
          </h2>
        </div>

        {/* النصوص */}
        <div className="info-text relative z-20 space-y-6 text-right">
          <p className="text-red-600 font-semibold text-lg">{front_section.welcome_text}</p>

          <h3 className="text-4xl md:text-5xl font-bold leading-snug text-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-red-700">
              {front_section.title}
            </span>{" "}
            — {front_section.subtitle}
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">{front_section.paragraph}</p>
          <p className="text-lg text-gray-700">{front_section.paragraph_2}</p>
        </div>

        {/* الصور */}
        <div className="info-images relative z-20 flex justify-center md:justify-end">
          <div className="relative w-full max-w-md">
            {imagesOne && (
              <div className="relative w-2/3 border-4 border-white shadow-lg z-10 rounded-2xl overflow-hidden">
                <img
                  src={front_section.image_1}
                  alt="صورة رئيسية"
                  width={500}
                  height={400}
                  className="object-cover"
                />
              </div>
            )}

            {imagesTwo && (
              <div className="absolute top-40 left-10 w-2/3 border-4 border-white shadow-lg z-20 rounded-2xl overflow-hidden">
                <img
                  src={front_section.image_2}
                  alt="صورة ثانية"
                  width={500}
                  height={400}
                  className="object-cover"
                />
              </div>
            )}

            {imagesThree && (
              <div className="absolute -top-8 -left-4 w-1/2 border-4 border-white shadow-lg z-0 rounded-2xl overflow-hidden">
                <img
                  src={front_section.image_3}
                  alt="صورة ثالثة"
                  width={500}
                  height={400}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
