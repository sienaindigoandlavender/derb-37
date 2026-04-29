import type { Metadata } from 'next';
import PillarStream from '@/components/PillarStream';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Travel',
  description: 'Letters from the road — slow weeks somewhere else, brought home and written down.',
};

export default function TravelPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  return (
    <PillarStream
      pillar="travel"
      page={page}
      intro="Slow weeks elsewhere — the table I sat at, the bread I ate, the way the light moved."
    />
  );
}
