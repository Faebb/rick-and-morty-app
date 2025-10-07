import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};

    // Mock authentication: acepta cualquier email y password === 'password'
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    if (password !== 'password') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = { id: '1', name: 'Demo User', email };
    const token = 'demo-token';

    return NextResponse.json({ user, token });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
