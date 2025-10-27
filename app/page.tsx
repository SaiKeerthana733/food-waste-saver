'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const carouselItems = [
  {
    title: '500+ Meals Saved',
    description: 'Real impact from real people. Join the movement.',
  },
  {
    title: 'Community Powered',
    description: 'Share surplus food with those who need it most.',
  },
  {
    title: 'Simple & Fast',
    description: 'Add donations in seconds. Help instantly.',
  },
];

export default function LandingPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex flex-col items-center justify-center px-6 py-12 font-sans text-center">
      <h1 className="text-6xl font-extrabold text-green-800 mb-4 drop-shadow">
        Food Waste Saver
      </h1>
      <p className="text-xl text-gray-700 mb-10 max-w-2xl leading-relaxed">
        Reduce food waste. Share surplus. Empower communities.
      </p>

      {/* Carousel */}
      <div className="mb-10 w-full max-w-xl px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200 transition-all duration-500">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            {carouselItems[current].title}
          </h2>
          <p className="text-gray-600">{carouselItems[current].description}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-6">
        <Link href="/register">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-white hover:text-green-700 hover:font-semibold transition-all duration-300 flex items-center gap-2">
            <span>📝</span> Register
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-white hover:text-green-700 hover:font-semibold transition-all duration-300 flex items-center gap-2">
            <span>🔐</span> Login
          </button>
        </Link>
      </div>
    </main>
  );
}