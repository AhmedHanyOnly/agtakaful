'use client';
import React, { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';



export const BodyProvider = ({ children }) => {
  const pathname = usePathname(); 

  useEffect(() => {
    if (pathname?.startsWith('/ar')) {
      document.body.dir = 'rtl'; 
    } else {
      // document.body.dir = 'ltr';
    }
  }, [pathname]);

  return (
    <div >
      {children}
    </div>
  );
};
