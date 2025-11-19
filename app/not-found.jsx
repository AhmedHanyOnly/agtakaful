"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const NotFoundPage = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-red-900 text-white px-4">
      <div className="text-center max-w-lg">
        <h1
          ref={titleRef}
          className="text-[6rem] font-extrabold sm:text-[8rem] mb-4"
        >
          404
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl mb-6"
        >
          الصفحة غير موجودة
        </p>
        <a
          href="/"
          className="inline-block rounded-md bg-[var(--color-primary)] px-6 py-3 text-white font-semibold transition hover:bg-[var(--color-primary)]/90"
        >
          العودة للصفحة الرئيسية
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
