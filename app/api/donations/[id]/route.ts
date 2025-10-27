import { NextResponse } from 'next/server';

// Simulated in-memory data (replace with DB or persistent storage in production)
let donations = [
  { id: 'donation1', foodName: 'Bread', location: 'Hyderabad', userId: 'user123' },
  { id: 'donation2', foodName: 'Rice', location: 'Secunderabad', userId: 'user456' },
];

// ✅ DELETE: Remove donation by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const existing = donations.find(d => d.id === id);
  if (!existing) {
    return NextResponse.json(
      { success: false, message: `Donation ${id} not found.` },
      { status: 404 }
    );
  }

  donations = donations.filter(d => d.id !== id);

  return NextResponse.json({
    success: true,
    message: `Donation ${id} deleted.`,
  });
}