'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function HomeAppPage() {
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.name) {
      setUserName(storedUser.name);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Your actual Navbar (already in layout or component) */}

      {/* Image Section */}
      <div className="w-full h-[calc(100vh-72px)] overflow-hidden">
        <img
          src="/home page pic.png" // Use the updated image without navbar
          alt="Food donation"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}