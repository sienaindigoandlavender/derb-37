import Link from 'next/link';
import PostStream from '@/components/PostStream';
import Newsletter from '@/components/Newsletter';
import { MedinaDivider } from '@/components/MedinaIllustrations';
import type { Pillar } from '@/lib/content';
import { getEntriesByPillar, pillarLabel } from '@/lib/content';

const PER_PAGE = 6;

export default async function PillarStream({
  pillar,
  page,
  intro,
}: {
  pillar: Pillar;
  page: number;
  intro?: string;
}) {
  const { entries, total } = await getEntriesByPillar(pillar, { page, perPage: PER_PAGE });
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const basePath = `/${pillar}`;

  return (
    <div className="content-column pt-4 pb-8">
      <header className="text-center mb-10">
        <p className="post-category mb-6">{pillar}</p>
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            fontWeight: 'normal',
            letterSpacing: '0.08em',
            color: '#222',
            textTransform: 'uppercase',
          }}
        >
          {pillarLabel(pillar)}
        </h1>
        {intro && (
          <p className="italic text-secondary text-[15px] mt-4 max-w-md mx-auto">
            {intro}
          </p>
        )}
      </header>

      {entries.length === 0 && (
        <p className="text-center italic text-secondary py-20">
          No letters here yet.
        </p>
      )}

      {entries.map((entry, i) => (
        <div key={entry.id}>
          <PostStream entry={entry} />
          {i < entries.length - 1 && <MedinaDivider index={i} />}
        </div>
      ))}

      {totalPages > 1 && (
        <nav className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          {page > 1 ? (
            <Link
              href={page === 2 ? basePath : `${basePath}?page=${page - 1}`}
              className="comment-link"
            >
              ← Newer letters
            </Link>
          ) : (
            <span />
          )}
          {page < totalPages ? (
            <Link href={`${basePath}?page=${page + 1}`} className="comment-link">
              Older letters →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      <Newsletter sourcePage={basePath} />
    </div>
  );
}
