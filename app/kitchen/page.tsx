import type { Metadata } from 'next';
import Link from 'next/link';
import PostStream from '@/components/PostStream';
import CategoryIndex from '@/components/CategoryIndex';
import RelatedLinks from '@/components/RelatedLinks';
import { MedinaDivider } from '@/components/MedinaIllustrations';
import {
  getCrossPillarEntries,
  getEntriesByPillar,
  getKitchenCategoryCounts,
  pillarLabel,
} from '@/lib/content';
import { breadcrumbsJsonLd, canonical } from '@/lib/seo';

export const revalidate = 300;

const PER_PAGE = 6;

const DESC =
  'The cuisine of Morocco from a 300-year-old riad in the Marrakech medina — tagines, breads, soups and stews, sweets, preserves, mezze, street food, feast days.';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const path = page > 1 ? `/kitchen?page=${page}` : '/kitchen';
  const title = page > 1 ? `From the Kitchen — page ${page}` : 'From the Kitchen';
  return {
    title,
    description: DESC,
    alternates: { canonical: canonical(path) },
    openGraph: { type: 'website', url: canonical(path), title, description: DESC },
    twitter: { title, description: DESC },
  };
}

export default async function KitchenPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const { entries, total } = await getEntriesByPillar('kitchen', { page, perPage: PER_PAGE });
  const counts = await getKitchenCategoryCounts();
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const showRelated = page === 1;
  const related = showRelated ? await getCrossPillarEntries('kitchen', 3) : [];

  const breadcrumbs = breadcrumbsJsonLd([
    { name: 'Home', path: '/' },
    { name: pillarLabel('kitchen'), path: '/kitchen' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="content-column pt-2 pb-8">
        <header className="text-center mb-10">
          <p className="eyebrow mb-4">kitchen</p>
          <h1 className="font-display italic font-medium text-ink text-[44px] leading-[1.05] tracking-[-0.005em]">
            From the Kitchen
          </h1>
          <p className="font-display italic text-ink text-[18px] mt-4 max-w-md mx-auto leading-snug">
            What was on the stove, what came home from the souk, what made it
            onto the table.
          </p>
          <div className="ornament-rule mt-7 mx-auto max-w-md">
            <span className="ornament">✦</span>
          </div>
        </header>

        <CategoryIndex counts={counts} />

        {entries.length === 0 ? (
          <p className="text-center font-display italic text-secondary py-16 text-[18px]">
            No notes here yet.
          </p>
        ) : (
          entries.map((entry, i) => (
            <div key={entry.id}>
              <PostStream entry={entry} />
              {i < entries.length - 1 && <MedinaDivider index={i} />}
            </div>
          ))
        )}

        {totalPages > 1 && (
          <nav
            className="flex justify-between items-center mt-12 pt-7 border-t border-border"
            aria-label="Pagination"
          >
            {page > 1 ? (
              <Link
                href={page === 2 ? '/kitchen' : `/kitchen?page=${page - 1}`}
                className="comment-link"
                rel="prev"
              >
                ← Newer notes
              </Link>
            ) : (
              <span />
            )}
            {page < totalPages ? (
              <Link href={`/kitchen?page=${page + 1}`} className="comment-link" rel="next">
                Older notes →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}

        {showRelated && related.length > 0 && (
          <RelatedLinks
            entries={related}
            eyebrow="From the rest of the journal"
            intro="When the kitchen is closed."
          />
        )}
      </div>
    </>
  );
}
