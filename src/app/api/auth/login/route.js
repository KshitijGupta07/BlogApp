import { connectDB } from '@/lib/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectDB();

  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  // ✅ Send back the user info
  const response = NextResponse.json({
    message: 'Login successful',
    user: {
      username: user.username,
      email: user.email, // optional
      id: user._id.toString(), // optional
    },
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
  });

  return response;
}
