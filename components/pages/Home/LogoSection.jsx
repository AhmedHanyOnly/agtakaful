"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LogoSection = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        y: -20, // يتحرك للأعلى
        duration: 1.5, // مدة الحركة
        yoyo: true, // يرجع للوضع الأصلي
        repeat: -1, // تكرار غير محدود
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <div
      className="relative w-full h-[50px] md:h-[100px] my-[100px] "
      style={{
        background: "linear-gradient(to right, #eb2025, #7a1115)",
      }}
    >
      <Image
        ref={logoRef}
        src="/logo.jpg"
        width={200}
        height={200}
        alt="logo-style"
        className="absolute left-[50%] top-[-50%] translate-x-[-50%] w-[100px] md:w-[200px] h-[100px] md:h-[200px]"
      />
    </div>
  );
};
export default LogoSection;
