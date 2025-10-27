'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const alreadyExists = users.some((u: User) => u.email === email);

    if (alreadyExists) {
      alert('User already registered with this email');
      return;
    }

    const newUser: User = { name, email, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    alert('Successfully registered!');
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center px-6 py-12 font-sans">
      <section className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md border border-green-200">
        <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center">
          Create Account
        </h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-white hover:text-green-700 hover:font-bold transition-all duration-300 active:scale-95"
          >
            Register
          </button>
        </form>
      </section>
    </main>
  );
}