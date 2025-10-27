'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShowConfirm(false);
    router.push('/');
  };

  const navLink = (path: string, label: string) => (
    <Link href={path}>
      <span
        className={`px-3 py-1 rounded ${
          pathname === path
            ? 'bg-white text-green-700 font-bold'
            : 'text-white hover:bg-white hover:text-green-700'
        }`}
      >
        {label}
      </span>
    </Link>
  );

  return (
    <>
      <nav className="bg-green-600 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Food Waste Saver</h1>
        <div className="space-x-2">
          {navLink('/home', 'Home')}
          {navLink('/add-food', 'Add Food')}
          {navLink('/donations', 'Donations')}
          <button
            onClick={() => setShowConfirm(true)}
            className="text-white hover:bg-white hover:text-green-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {showConfirm && (
        <div className="fixed inset-0 bg-gradient-to-br from-green-100 via-white to-green-50 bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-[90%] max-w-xl border border-green-200 text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Confirm Logout</h2>
            <p className="text-gray-700 text-lg mb-8">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleLogout}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}