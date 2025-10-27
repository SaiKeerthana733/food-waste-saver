// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import NavbarWrapper from '@/components/NavbarWrapper';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Food Waste Saver',
  description: 'Help reduce food waste and feed the hungry',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800 bg-gradient-to-br from-green-100 via-white to-green-50`}
      >
        <NavbarWrapper />
        <main className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 py-8">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}