"use client";
import SliderLanding from "@/components/pages/Home/SliderLanding";

import LogoSection from "@/components/pages/Home/LogoSection";
import Contact from "@/components/pages/Home/Contact";
import dynamic from "next/dynamic";
import { Info } from "@/components/pages/Home/Info";

const MapHolderClient = dynamic(
  () => import("@/components/pages/Home/MapHolderClient"),
  { ssr: false }
);

export default function Home() {
 




  return (
    <>
      <SliderLanding />
      <LogoSection />
      <Info />
      <MapHolderClient />
      <Contact />
    </>
  );
}
