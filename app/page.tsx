import Link from 'next/link';
import PostStream from '@/components/PostStream';
import Newsletter from '@/components/Newsletter';
import { MedinaDivider } from '@/components/MedinaIllustrations';
import { getRecentEntries } from '@/lib/content';

export const revalidate = 300;

const PER_PAGE = 6;

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  // Fetch one extra to detect "older posts"
  const entries = await getRecentEntries({ limit: PER_PAGE * page + 1 });
  const start = (page - 1) * PER_PAGE;
  const slice = entries.slice(start, start + PER_PAGE);
  const hasOlder = entries.length > start + PER_PAGE;

  return (
    <div className="content-column pt-4 pb-8">
      {slice.length === 0 && (
        <p className="text-center italic text-secondary py-20">
          The first letter is being written.
        </p>
      )}

      {slice.map((entry, i) => (
        <div key={entry.id}>
          <PostStream entry={entry} />
          {i < slice.length - 1 && <MedinaDivider index={i} />}
        </div>
      ))}

      {(page > 1 || hasOlder) && (
        <nav className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          {page > 1 ? (
            <Link
              href={page === 2 ? '/' : `/?page=${page - 1}`}
              className="comment-link"
            >
              ← Newer letters
            </Link>
          ) : (
            <span />
          )}
          {hasOlder ? (
            <Link href={`/?page=${page + 1}`} className="comment-link">
              Older letters →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      <Newsletter sourcePage="/" />
    </div>
  );
}
