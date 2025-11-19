"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import gsap from "gsap";
import { useHomeStore } from "@/store/useHomeStore";

// أيقونة مخصصة
const customIcon = new L.Icon({
  iconUrl: "/pen.png",
  iconSize: [100, 80],
  iconAnchor: [20, 55],
  popupAnchor: [0, -50],
});

const locations = [
  { lat: 30.0444, lng: 31.2357, name: "القاهرة" },
  { lat: 31.2001, lng: 29.9187, name: "الإسكندرية" },
  { lat: 29.9753, lng: 32.5342, name: "السويس" },
];

// أنميشن عند تحميل الخريطة
function AnimateMap() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    gsap.fromTo(
      container,
      { opacity: 0, scale: 0.9, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, [map]);

  return null;
}

export default function MapHolderClient({ textMap = "فروعنا" }) {
  const homeData = useHomeStore((state) => state.homeData);
  const branches = homeData.data?.branches || [];

  useEffect(() => {
    // أنميشن الماركرات
    gsap.fromTo(
      ".leaflet-marker-icon",
      { y: -20, opacity: 0, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.25,
        delay: 0.5,
        duration: 0.8,
        ease: "back.out(1.7)",
      }
    );

    // أنيميشن للأشكال الجانبية
    gsap.to(".decor-shape", {
      y: "-=30",
      rotate: 360,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    });
  }, []);

  return (
    <div className="relative flex justify-center py-16 px-4">
      <div
        className="relative w-full max-w-6xl  rounded-[2rem] border-[5px] shadow-[0_15px_60px_rgba(195,33,38,0.25)]"
        style={{
          borderColor: "#c32126",
          background:
            "linear-gradient(135deg, #c32126 0%, #f85f5a 50%, #fff1f1 100%)",
        }}
      >
        {/* عنوان */}
        <div className="absolute text-[8px] top-6 left-1/2 -translate-x-1/2 z-[500] bg-white/90 backdrop-blur-md px-8 py-3 rounded-full shadow-lg md:text-xl font-semibold text-[#c32126] flex items-center gap-2">
          <i className="fa-solid fa-location-dot text-[#c32126]"></i>
          {textMap}
        </div>

        {/* الخريطة */}
        <MapContainer
          center={[23.8859, 45.0792]} // منتصف السعودية
          zoom={5.5}
          scrollWheelZoom={true}
          className="h-[350px] md:h-[550px] w-full rounded-[2rem] z-10"
        >
          <AnimateMap />

          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {branches.map((loc, idx) => (
            <Marker key={idx} position={[loc.lat, loc.lng]} icon={customIcon}>
              <Popup>
                <div className="text-center">
                  <p className="font-bold text-[#c32126] mb-1">{loc.name}</p>
                  <p className="text-sm text-gray-600">
                    فرعنا في {loc.name} يقدم جميع الخدمات
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* ظل متدرج أسفل الكارت */}
        <div className="absolute hidden md:block bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#c32126]/40 to-transparent pointer-events-none"></div>

        {/* أشكال جانبية متحركة */}
        <div className="absolute hidden md:block top-0 left-[-50px] w-28 h-28 bg-[#c32126]/60 rounded-lg decor-shape pointer-events-none"></div>
        <div className="absolute hidden md:block bottom-[-50px] right-[-50px] w-28 h-28 bg-[#c32126]/50 rounded-full decor-shape pointer-events-none"></div>
      </div>
    </div>
  );
}
