import { NextResponse } from 'next/server';

let donations = [
  { id: 'donation1', foodName: 'Bread', location: 'Hyderabad', userId: 'user123' },
  { id: 'donation2', foodName: 'Rice', location: 'Secunderabad', userId: 'user456' },
];

// ✅ GET: Return all donations
export async function GET() {
  return NextResponse.json(donations);
}