import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) return new Response('User already exists', { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  return new Response('User registered', { status: 201 });
}