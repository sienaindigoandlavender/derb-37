import PillarPage from '@/components/PillarPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Culture',
  description: 'Ramadan rhythms, neighborhood life, and the sound of the derb at dusk. Notes from the Ksour quarter.',
};

export const revalidate = 300;

export default function CulturePage() {
  return <PillarPage pillar="culture" />;
}
