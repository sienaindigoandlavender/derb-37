import type { Metadata } from 'next';
import PillarStream from '@/components/PillarStream';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'My Morocco',
  description: 'A first-person record of life inside the medina — Ramadan, ritual, the sound the souk makes at certain hours.',
};

export default function MoroccoPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  return (
    <PillarStream
      pillar="morocco"
      page={page}
      intro="The country I live in, written from inside it."
    />
  );
}
