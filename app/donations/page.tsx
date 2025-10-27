'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FoodItem = {
  id: number;
  name: string;
  availableUntil?: string;
  location: string | { lat: number; lng: number };
  contact: string;
  addedBy: string;
};

function formatDate(isoDate?: string): string {
  if (!isoDate || !isoDate.includes('-')) return 'Not specified';
  const [year, month, day] = isoDate.split('-');
  return `${day}-${month}-${year}`;
}

function isExpired(dateStr?: string): boolean {
  if (!dateStr || !dateStr.includes('-')) return false;
  const today = new Date();
  const expiryDate = new Date(dateStr);
  expiryDate.setDate(expiryDate.getDate() + 1);
  return expiryDate < today;
}

function getCountdown(dateStr?: string): string {
  if (!dateStr || !dateStr.includes('-')) return '';
  const today = new Date();
  const expiryDate = new Date(dateStr);
  const diff = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Expired';
  if (diff === 0) return 'Expires today';
  if (diff === 1) return '1 day left';
  return `${diff} days left`;
}

export default function DonationsPage() {
  const [allItems, setAllItems] = useState<FoodItem[]>([]);
  const [myItems, setMyItems] = useState<FoodItem[]>([]);
  const [view, setView] = useState<'mine' | 'all'>('mine');
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) {
      router.push('/login');
      return;
    }

    const stored: FoodItem[] = JSON.parse(localStorage.getItem('foodItems') || '[]');
    const cleaned = stored.filter(item => !isExpired(item.availableUntil));
    if (cleaned.length !== stored.length) {
      localStorage.setItem('foodItems', JSON.stringify(cleaned));
    }

    setAllItems(cleaned);
    setMyItems(cleaned.filter(item => item.addedBy === user.email));
  }, []);

  const handleDelete = (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this donation?');
    if (!confirm) return;

    const updated = allItems.filter(item => item.id !== id);
    localStorage.setItem('foodItems', JSON.stringify(updated));
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setAllItems(updated);
    setMyItems(updated.filter(item => item.addedBy === user.email));
  };

  const itemsToShow = view === 'mine' ? myItems : allItems;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-6 py-12 font-sans">
      <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center">
        🧾 Donations
      </h1>

      {/* Toggle Buttons */}
      <div className="mb-8 flex justify-center gap-4">
        <button
          onClick={() => setView('mine')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            view === 'mine'
              ? 'bg-green-700 text-white shadow-md'
              : 'bg-white text-green-700 border border-green-300 hover:bg-green-100'
          }`}
        >
          My Donations
        </button>
        <button
          onClick={() => setView('all')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            view === 'all'
              ? 'bg-green-700 text-white shadow-md'
              : 'bg-white text-green-700 border border-green-300 hover:bg-green-100'
          }`}
        >
          All Donations
        </button>
      </div>

      {/* Donation List */}
      {itemsToShow.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No donations to show.</p>
      ) : (
        <ul className="space-y-6">
          {itemsToShow.map(item => (
            <li
              key={item.id}
              className="bg-white border border-green-200 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-green-700 mb-2">{item.name}</h2>
              <p className="text-gray-700 mb-2">
                <strong>Available Until:</strong> {formatDate(item.availableUntil)}
                <span className="ml-3 text-sm text-red-600 font-semibold">
                  {getCountdown(item.availableUntil)}
                </span>
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Location:</strong>{' '}
                {typeof item.location === 'string'
                  ? item.location
                  : item.location
                  ? `${item.location.lat.toFixed(4)}, ${item.location.lng.toFixed(4)}`
                  : 'No location provided'}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Contact:</strong> {item.contact}
              </p>

              {view === 'mine' && (
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-white hover:text-red-600 hover:font-semibold border border-red-500 transition-all duration-300"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}