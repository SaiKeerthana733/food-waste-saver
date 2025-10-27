'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const hideNavbar = ['/', '/login', '/register'].includes(pathname);

  if (!isClient) return null; // ✅ Prevent hydration mismatch

  return !hideNavbar ? <Navbar /> : null;
}