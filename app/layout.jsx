"use client";
import { Outfit, Cairo } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
// import ProtectedRoute from '../middleware/ProtectedRoute';
import QueryProvider from "../components/QueryProvider";
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import SmoothScroll from "@/components/animation/SmoothScroll";
import HomeDataProvider from "@/components/HomeDataProvider";

const outfit = Outfit({
  subsets: ["latin"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"], // حسب ما تحتاج
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${outfit.className} ${cairo.className} `}>
        {/* <ProtectedRoute> */}
        <QueryProvider>
          <SmoothScroll>
            <HomeDataProvider>
          <Toaster position="bottom-right" richColors />
              <AppHeader />
              {children}
              <AppFooter />
            </HomeDataProvider>
          </SmoothScroll>
        </QueryProvider>
        {/* </ProtectedRoute> */}
      </body>
    </html>
  );
}
