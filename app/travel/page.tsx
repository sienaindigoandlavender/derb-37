import type { Metadata } from 'next';
import PillarStream from '@/components/PillarStream';
import { canonical } from '@/lib/seo';

export const revalidate = 300;

const DESC =
  'Travel notes from Derb 37 — slow weeks elsewhere, the table I sat at, the bread I ate, the way the light moved.';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const path = page > 1 ? `/travel?page=${page}` : '/travel';
  const title = page > 1 ? `Travel — page ${page}` : 'Travel';
  return {
    title,
    description: DESC,
    alternates: { canonical: canonical(path) },
    openGraph: { type: 'website', url: canonical(path), title, description: DESC },
    twitter: { title, description: DESC },
  };
}

export default function TravelPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  return (
    <PillarStream
      pillar="travel"
      page={page}
      intro="Slow weeks elsewhere — the table I sat at, the bread I ate, the way the light moved."
    />
  );
}
