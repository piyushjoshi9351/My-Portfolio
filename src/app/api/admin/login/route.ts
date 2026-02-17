import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    let payload: { username?: string; password?: string } = {};
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const username = String(payload.username || '').trim();
    const password = String(payload.password || '').trim();

    const adminUsername = String(process.env.ADMIN_USERNAME || '').trim();
    const adminPassword = String(process.env.ADMIN_PASSWORD || '').trim();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: 'Admin credentials are not configured on server' },
        { status: 500 }
      );
    }

    const isUserMatch = username.toLowerCase() === adminUsername.toLowerCase();
    const isPasswordMatch = password === adminPassword;

    if (isUserMatch && isPasswordMatch) {
      const token = jwt.sign(
        { username: adminUsername, role: 'admin' },
        process.env.JWT_SECRET || 'your-secret-key-change-this',
        { expiresIn: '7d' }
      );

      return NextResponse.json({ token, success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
