import type { Metadata } from 'next';
import PageHeading from '@/components/PageHeading';
import ArchiveGrid from '@/components/ArchiveGrid';
import Pagination from '@/components/Pagination';
import { getEntriesByPillar } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'From the Kitchen',
  description: 'Letters from the kitchen at Derb 37 — what was cooked, what was eaten, what worked.',
};

export default async function KitchenPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const perPage = 12;
  const { entries, total } = await getEntriesByPillar('kitchen', { page, perPage });

  return (
    <>
      <PageHeading
        eyebrow="The first pillar"
        title="From the Kitchen"
        subtitle="What was on the stove, what came home from the souk, what made it onto the table."
      />
      <ArchiveGrid entries={entries} />
      <Pagination basePath="/kitchen" page={page} total={total} perPage={perPage} />
    </>
  );
}
