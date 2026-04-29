import type { Metadata } from 'next';
import Link from 'next/link';
import PostStream from '@/components/PostStream';
import { MedinaDivider } from '@/components/MedinaIllustrations';
import { getRecentEntries } from '@/lib/content';
import { canonical } from '@/lib/seo';

export const revalidate = 300;

const PER_PAGE = 6;

const HOME_DESCRIPTION =
  'The cuisine of Morocco, written from inside it. A journal of recipes, kitchen notes, and dispatches from a 300-year-old riad in the Marrakech medina, by J. Ng.';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const title =
    page > 1
      ? `Derb 37 — Moroccan cuisine, page ${page}`
      : 'Derb 37 — the cuisine of Morocco, written from inside it';
  const path = page > 1 ? `/?page=${page}` : '/';
  return {
    title,
    description: HOME_DESCRIPTION,
    alternates: { canonical: canonical(path) },
    openGraph: {
      type: 'website',
      url: canonical(path),
      title,
      description: HOME_DESCRIPTION,
    },
    twitter: { title, description: HOME_DESCRIPTION },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const entries = await getRecentEntries({ limit: PER_PAGE * page + 1 });
  const start = (page - 1) * PER_PAGE;
  const slice = entries.slice(start, start + PER_PAGE);
  const hasOlder = entries.length > start + PER_PAGE;

  return (
    <div className="content-column pt-2 pb-6">
      <h1 className="sr-only">
        {page > 1
          ? `Derb 37 — the cuisine of Morocco, page ${page}`
          : 'Derb 37 — the cuisine of Morocco, written from inside it'}
      </h1>

      {slice.length === 0 && (
        <p className="text-center italic text-secondary py-16">
          The first note is being written.
        </p>
      )}

      {slice.map((entry, i) => (
        <div key={entry.id}>
          <PostStream entry={entry} />
          {i < slice.length - 1 && <MedinaDivider index={i} />}
        </div>
      ))}

      {(page > 1 || hasOlder) && (
        <nav
          className="flex justify-between items-center mt-10 pt-6 border-t border-border"
          aria-label="Pagination"
        >
          {page > 1 ? (
            <Link
              href={page === 2 ? '/' : `/?page=${page - 1}`}
              className="comment-link"
              rel="prev"
            >
              ← Newer notes
            </Link>
          ) : (
            <span />
          )}
          {hasOlder ? (
            <Link href={`/?page=${page + 1}`} className="comment-link" rel="next">
              Older notes →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
