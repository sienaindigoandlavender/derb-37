import type { Metadata } from 'next';
import PillarStream from '@/components/PillarStream';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'From the Kitchen',
  description: 'Letters from the kitchen at Derb 37 — what was cooked, what was eaten, what worked.',
};

export default function KitchenPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  return (
    <PillarStream
      pillar="kitchen"
      page={page}
      intro="What was on the stove, what came home from the souk, what made it onto the table."
    />
  );
}
