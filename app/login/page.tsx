'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  email: string;
  password: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (existingUser.email) {
      router.push('/home');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);

    if (!user) {
      alert('Please register first.');
      return;
    }

    if (user.password !== password) {
      alert('Incorrect password.');
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    router.push('/home');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-green-700 text-center">Login</h1>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-white hover:text-green-700">
          Login
        </button>
      </form>
    </main>
  );
}