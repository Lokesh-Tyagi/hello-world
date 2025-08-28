'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Auth pages where we don't want navbar and footer
  const authPages = ['/login', '/signup', '/forgot-password'];
  
  // During SSR and initial render, always show navbar and footer
  // After mounting, check if we're on an auth page
  const shouldShowNavbar = mounted ? !authPages.includes(pathname || '') : true;
  const shouldShowFooter = mounted ? !authPages.includes(pathname || '') : true;

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
      {shouldShowFooter && <Footer />}
    </>
  );
} 