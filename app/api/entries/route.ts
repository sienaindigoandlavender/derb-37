import { NextRequest, NextResponse } from 'next/server';
import { getEntries, getLatestEntries } from '@/lib/data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pillar = searchParams.get('pillar') || undefined;
  const lane = searchParams.get('lane') || undefined;
  const latest = searchParams.get('latest');

  try {
    let entries;
    if (latest) {
      entries = await getLatestEntries(parseInt(latest) || 10);
    } else {
      entries = await getEntries(pillar, lane);
    }
    return NextResponse.json(entries);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
  }
}
