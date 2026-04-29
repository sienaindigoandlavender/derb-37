import type { Metadata } from 'next';
import PillarStream from '@/components/PillarStream';
import { canonical } from '@/lib/seo';

export const revalidate = 300;

const DESC =
  'Notes from the kitchen at Derb 37 — what was on the stove, what came home from the souk, what made it onto the table.';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const path = page > 1 ? `/kitchen?page=${page}` : '/kitchen';
  const title = page > 1 ? `From the Kitchen — page ${page}` : 'From the Kitchen';
  return {
    title,
    description: DESC,
    alternates: { canonical: canonical(path) },
    openGraph: { type: 'website', url: canonical(path), title, description: DESC },
    twitter: { title, description: DESC },
  };
}

export default function KitchenPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  return (
    <PillarStream
      pillar="kitchen"
      page={page}
      intro="What was on the stove, what came home from the souk, what made it onto the table."
    />
  );
}
