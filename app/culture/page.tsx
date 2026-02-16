import PillarPage from '@/components/PillarPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Morocco',
  description: 'Ramadan, rituals, and the things that made me stay. Notes from inside the medina.',
};

export const revalidate = 300;

export default function CulturePage() {
  return <PillarPage pillar="culture" />;
}
