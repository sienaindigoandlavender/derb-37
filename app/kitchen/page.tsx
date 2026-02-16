import PillarPage from '@/components/PillarPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kitchen',
  description: 'What I cook, where I find it, and what the souk looked like this morning.',
};

export const revalidate = 300;

export default function KitchenPage() {
  return <PillarPage pillar="kitchen" />;
}
