import type { Metadata } from 'next';
import PillarStream from '@/components/PillarStream';
import { canonical } from '@/lib/seo';

export const revalidate = 300;

const DESC =
  'Notes from inside the Marrakech medina — Ramadan, ritual, the sound the souk makes at certain hours. By Jacqueline Ng.';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const path = page > 1 ? `/morocco?page=${page}` : '/morocco';
  const title = page > 1 ? `My Morocco — page ${page}` : 'My Morocco';
  return {
    title,
    description: DESC,
    alternates: { canonical: canonical(path) },
    openGraph: { type: 'website', url: canonical(path), title, description: DESC },
    twitter: { title, description: DESC },
  };
}

export default function MoroccoPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  return (
    <PillarStream
      pillar="morocco"
      page={page}
      intro="The country I live in, written from inside it."
    />
  );
}
