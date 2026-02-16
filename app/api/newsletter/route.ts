import { NextRequest, NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const success = await subscribeNewsletter(email);

    if (success) {
      return NextResponse.json({ message: 'Subscribed' });
    } else {
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
