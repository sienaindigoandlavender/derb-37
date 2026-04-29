import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { createClient, hasSupabase } from '@/lib/supabase';

export const runtime = 'nodejs';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://derb37.com';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildConfirmEmail(confirmUrl: string): string {
  return `
<div style="font-family: 'EB Garamond', Georgia, serif; max-width: 540px; margin: 0 auto; padding: 48px 28px; background: #faf9f5; color: #1f1d1a;">
  <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: 42px; text-align: center; margin: 0 0 28px; letter-spacing: -0.005em;">
    Derb <em style="font-style: italic; color: #9a4a26;">37</em>
  </h1>
  <p style="font-size: 18px; line-height: 1.7; color: #3a3631;">A letter to confirm. Click below and you'll be on the list.</p>
  <p style="text-align: center; margin: 36px 0;">
    <a href="${confirmUrl}" style="display: inline-block; padding: 14px 30px; border: 1px solid #cfc6b6; color: #1f1d1a; text-decoration: none; font-family: 'Cormorant SC', serif; font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase;">Confirm my subscription</a>
  </p>
  <p style="font-size: 16px; color: #6a6359; font-style: italic; line-height: 1.6;">If you didn't sign up, ignore this. Nothing happens.</p>
  <p style="font-size: 11px; color: #6a6359; margin-top: 44px; text-align: center; letter-spacing: 0.32em; text-transform: uppercase;">— Jacqueline · Marrakech</p>
</div>
  `.trim();
}

export async function POST(req: NextRequest) {
  if (!hasSupabase) {
    return NextResponse.json({ error: 'Subscriptions are unavailable.' }, { status: 503 });
  }

  let payload: { email?: string; source_page?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const email = (payload.email || '').toLowerCase().trim();
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  }

  const supabase = createClient();
  const token = crypto.randomBytes(32).toString('hex');

  const { error: upsertError } = await supabase
    .from('subscribers')
    .upsert(
      {
        email,
        confirm_token: token,
        source_page: payload.source_page || '/letters',
        confirmed: false,
      },
      { onConflict: 'email' }
    );

  if (upsertError) {
    console.error('subscribe upsert error:', upsertError);
    return NextResponse.json({ error: 'Could not save your address.' }, { status: 500 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn('RESEND_API_KEY missing — subscriber saved but no email sent.');
    return NextResponse.json({ ok: true, sent: false });
  }

  const resend = new Resend(resendKey);
  const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${token}`;

  try {
    await resend.emails.send({
      from: 'Jacqueline at Derb 37 <hello@derb37.com>',
      to: email,
      subject: 'Confirm your subscription to Derb 37',
      html: buildConfirmEmail(confirmUrl),
    });
  } catch (err) {
    console.error('resend send error:', err);
    return NextResponse.json({ error: 'Could not send confirmation email.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
