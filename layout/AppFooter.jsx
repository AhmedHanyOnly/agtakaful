"use client";
import { useHomeStore } from "@/store/useHomeStore";
import React from "react";
import {
  RiInstagramFill,
  RiFacebookFill,
  RiTwitterFill,
  RiSnapchatFill,
} from "react-icons/ri";

const AppFooter = () => {
  const homeData = useHomeStore((state) => state.homeData);
  const social = homeData.data?.social || [];

  return (
    <footer className="bg-white border-t py-6">
      <div className="container mx-auto py-4 px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* أيقونات السوشيال */}
          <div className="mb-4 lg:mb-0">
            <ul className="flex gap-4 list-none">
              <li>
                <a
                  href={social.instagram || "#"}
                  className="text-[var(--color-primary)] hover:text-blue-500 transition-colors text-2xl"
                >
                  <RiInstagramFill />
                </a>
              </li>
              <li>
                <a
                  href={social.facebook || "#"}
                  className="text-[var(--color-primary)] hover:text-blue-700 transition-colors text-2xl"
                >
                  <RiFacebookFill />
                </a>
              </li>
              <li>
                <a
                  href={social.twitter || "#"}
                  className="text-[var(--color-primary)] hover:text-blue-400 transition-colors text-2xl"
                >
                  <RiTwitterFill />
                </a>
              </li>
              <li>
                <a
                  href={social.snapchat || "#"}
                  className="text-[var(--color-primary)] hover:text-yellow-400 transition-colors text-2xl"
                >
                  <RiSnapchatFill />
                </a>
              </li>
            </ul>
          </div>

          {/* حقوق الملكية */}
          <div className="flex flex-col lg:flex-row items-center">
            <p className="text-sm text-gray-700 text-center lg:text-left">
              © 2025 Takaful جميع الحقوق محفوظة. القالب من قبل
              <a
                href="https://www.pixelrocket.store"
                className="text-[var(--color-primary)] hover:underline"
              >
                Takaful
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
