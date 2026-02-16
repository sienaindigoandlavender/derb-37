import PillarPage from '@/components/PillarPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Behind the Walls',
  description: 'Tadelakt, zellige, courtyard light. The architecture of living in a 300-year-old Marrakech house.',
};

export const revalidate = 300;

export default function BehindTheWallsPage() {
  return <PillarPage pillar="walls" />;
}
