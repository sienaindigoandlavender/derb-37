import type { Metadata } from 'next';
import PageHeading from '@/components/PageHeading';
import ArchiveGrid from '@/components/ArchiveGrid';
import Pagination from '@/components/Pagination';
import { getEntriesByPillar } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'My Morocco',
  description: 'A first-person record of life inside the medina — Ramadan, ritual, the sound the souk makes at certain hours.',
};

export default async function MoroccoPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const perPage = 12;
  const { entries, total } = await getEntriesByPillar('morocco', { page, perPage });

  return (
    <>
      <PageHeading
        eyebrow="The second pillar"
        title="My Morocco"
        subtitle="The country I live in, written from inside it."
      />
      <ArchiveGrid entries={entries} />
      <Pagination basePath="/morocco" page={page} total={total} perPage={perPage} />
    </>
  );
}
