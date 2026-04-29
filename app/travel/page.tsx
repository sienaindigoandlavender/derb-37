import type { Metadata } from 'next';
import PageHeading from '@/components/PageHeading';
import ArchiveGrid from '@/components/ArchiveGrid';
import Pagination from '@/components/Pagination';
import { getEntriesByPillar } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Travel',
  description: 'Letters from the road — slow weeks somewhere else, brought home and written down.',
};

export default async function TravelPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const perPage = 12;
  const { entries, total } = await getEntriesByPillar('travel', { page, perPage });

  return (
    <>
      <PageHeading
        eyebrow="The third pillar"
        title="Travel"
        subtitle="Slow weeks elsewhere — the table I sat at, the bread I ate, the way the light moved."
      />
      <ArchiveGrid entries={entries} />
      <Pagination basePath="/travel" page={page} total={total} perPage={perPage} />
    </>
  );
}
