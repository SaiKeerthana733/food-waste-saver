'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type FoodItem = {
  id: number;
  name: string;
  availableUntil: string;
  location: string;
  contact: string;
  addedBy: string;
};

export default function AddFoodPage() {
  const [name, setName] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}') as { email?: string };
    if (!user.email) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!name.trim()) {
      newErrors.push('Food name is required.');
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.push('Food name must contain only letters.');
    }

    if (!availableUntil) {
      newErrors.push('Expiry date is required.');
    } else {
      const today = new Date().toISOString().split('T')[0];
      if (availableUntil < today) {
        newErrors.push('Expiry date must be today or later.');
      }
    }

    if (!location.trim()) {
      newErrors.push('Full address is required.');
    }

    if (!contact.trim()) {
      newErrors.push('Contact number is required.');
    } else if (!/^\d{10}$/.test(contact.trim())) {
      newErrors.push('Contact number must be exactly 10 digits.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}') as { email?: string };
    const newItem: FoodItem = {
      id: Date.now(),
      name,
      availableUntil,
      location,
      contact,
      addedBy: user.email || 'unknown',
    };

    const existing = JSON.parse(localStorage.getItem('foodItems') || '[]') as FoodItem[];
    localStorage.setItem('foodItems', JSON.stringify([...existing, newItem]));

    setName('');
    setAvailableUntil('');
    setLocation('');
    setContact('');
    setErrors([]);
    alert('Food item added successfully!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex flex-col font-sans">
      <header className="px-6 py-6 flex items-center justify-center border-b border-green-300 shadow-sm bg-gradient-to-r from-green-100 via-white to-green-50">
        <h1 className="text-4xl font-extrabold text-green-700 tracking-tight">
          Add Food Item
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row flex-grow items-center justify-center px-6 py-12 gap-12">
        <div className="hidden lg:block w-full max-w-2xl xl:max-w-3xl pointer-events-none select-none">
          <img
            src="/pic2.jpg"
            alt="Colorful fruit platter with watermelon, oranges, and more"
            className="w-full h-auto drop-shadow-2xl rounded-2xl border border-green-300 scale-100 transition-transform duration-300"
            draggable={false}
          />
        </div>

        <section className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-xl border border-green-200">
          {errors.length > 0 && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-2">⚠️ Please fix the following:</h2>
              <ul className="list-disc pl-5 space-y-1">
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Rice, Bread"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Until</label>
              <input
                type="date"
                value={availableUntil}
                onChange={e => setAvailableUntil(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                This is the last date someone can pick up the food.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
              <textarea
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g., Kukatpally, Hyderabad"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                type="tel"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-white hover:text-green-700 hover:font-bold transition-all duration-300 active:scale-95"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}