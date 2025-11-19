"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Image from "next/image";

const AppHeader = () => {
  const headerRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "/", name: "الرئيسية" },
    { href: "/about-us", name: "من نحن" },
    { href: "/terms", name: "الشروط والأحكام" },
    { href: "/privacy-policy", name: "سياسة الخصوصية" },
    { href: "/faq", name: "الأسئلة الشائعة" },
  ];

  // GSAP Animations للشعار واللينكات
  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(linksRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, []);

  // انيميشن الموبايل
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll("li"),
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      
      className={`fixed top-0 left-0 w-full z-[9999] transition-colors duration-500 ${
        scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-2xl font-bold cursor-pointer transition-colors duration-500">
          <Link href="/">
            <Image src="/logo.jpg" alt="logo" width={100} height={100} />
          </Link>
        </div>

        {/* قائمة سطح المكتب */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-8 font-medium text-xl transition-colors duration-500">
            {navLinks.map((link, index) => (
              <li
                key={index}
            
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* زر الموبايل */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-3xl focus:outline-none transition-colors duration-500"
          >
            {mobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل */}
      <div
        ref={mobileMenuRef}
        className="overflow-hidden md:hidden bg-white shadow-md"
        style={{ height: 0, opacity: 0 }}
      >
        <ul className="flex flex-col gap-4 py-4 px-6 font-medium">
          {navLinks.map((link, index) => (
            <li key={index} className="hover:text-[var(--color-primary)] transition-colors">
              <Link
                href={link.href}
                className="text-black"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default AppHeader;
