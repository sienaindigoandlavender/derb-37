import { NextRequest, NextResponse } from 'next/server';
import { createClient, hasSupabase } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/letters?status=error', req.url));
  }
  if (!hasSupabase) {
    return NextResponse.redirect(new URL('/letters?status=error', req.url));
  }

  const supabase = createClient();
  const { error, data } = await supabase
    .from('subscribers')
    .update({
      confirmed: true,
      confirmed_at: new Date().toISOString(),
      confirm_token: null,
    })
    .eq('confirm_token', token)
    .select('id')
    .maybeSingle();

  if (error || !data) {
    return NextResponse.redirect(new URL('/letters?status=error', req.url));
  }
  return NextResponse.redirect(new URL('/letters?status=confirmed', req.url));
}
