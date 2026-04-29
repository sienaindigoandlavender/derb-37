import Link from 'next/link';
import PostStream from '@/components/PostStream';
import { MedinaDivider } from '@/components/MedinaIllustrations';
import type { Pillar } from '@/lib/content';
import { getEntriesByPillar, pillarLabel } from '@/lib/content';
import { breadcrumbsJsonLd } from '@/lib/seo';

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

  const breadcrumbs = breadcrumbsJsonLd([
    { name: 'Home', path: '/' },
    { name: pillarLabel(pillar), path: basePath },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="content-column pt-2 pb-8">
        <header className="text-center mb-12">
          <p className="eyebrow mb-4">{pillar}</p>
          <h1 className="font-display italic font-medium text-ink text-[44px] leading-[1.05] tracking-[-0.005em]">
            {pillarLabel(pillar)}
          </h1>
          {intro && (
            <p className="font-display italic text-secondary text-[18px] mt-4 max-w-md mx-auto leading-snug">
              {intro}
            </p>
          )}
          <div className="ornament-rule mt-7 mx-auto max-w-md">
            <span className="ornament">✦</span>
          </div>
        </header>

        {entries.length === 0 && (
          <p className="text-center font-display italic text-secondary py-16 text-[18px]">
            No notes here yet.
          </p>
        )}

        {entries.map((entry, i) => (
          <div key={entry.id}>
            <PostStream entry={entry} />
            {i < entries.length - 1 && <MedinaDivider index={i} />}
          </div>
        ))}

        {totalPages > 1 && (
          <nav
            className="flex justify-between items-center mt-12 pt-7 border-t border-border"
            aria-label="Pagination"
          >
            {page > 1 ? (
              <Link
                href={page === 2 ? basePath : `${basePath}?page=${page - 1}`}
                className="comment-link"
                rel="prev"
              >
                ← Newer notes
              </Link>
            ) : (
              <span />
            )}
            {page < totalPages ? (
              <Link
                href={`${basePath}?page=${page + 1}`}
                className="comment-link"
                rel="next"
              >
                Older notes →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
