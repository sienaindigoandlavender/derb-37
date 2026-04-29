import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostStream from '@/components/PostStream';
import CategoryIndex from '@/components/CategoryIndex';
import { MedinaDivider } from '@/components/MedinaIllustrations';
import {
  CUISINE_CATEGORIES,
  CuisineCategory,
  findCuisineCategory,
  getKitchenCategoryEntries,
  getKitchenCategoryCounts,
  pillarLabel,
} from '@/lib/content';
import { breadcrumbsJsonLd, canonical } from '@/lib/seo';

export const revalidate = 300;

const PER_PAGE = 12;

type Props = {
  params: { category: string };
  searchParams: { page?: string };
};

export function generateStaticParams() {
  return CUISINE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const cat = findCuisineCategory(params.category);
  if (!cat) return { title: 'Not Found', robots: { index: false, follow: false } };

  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const path = page > 1
    ? `/kitchen/${cat.slug}?page=${page}`
    : `/kitchen/${cat.slug}`;
  const title = page > 1
    ? `${cat.label} — page ${page}`
    : `${cat.label}`;
  const description = `${cat.intro} Moroccan ${cat.label.toLowerCase()} from Derb 37, a journal from a riad in the Marrakech medina.`;

  return {
    title,
    description,
    alternates: { canonical: canonical(path) },
    openGraph: {
      type: 'website',
      url: canonical(path),
      title: `${cat.label} · Derb 37`,
      description,
    },
    twitter: { title: `${cat.label} · Derb 37`, description },
  };
}

export default async function KitchenCategoryPage({ params, searchParams }: Props) {
  const cat = findCuisineCategory(params.category);
  if (!cat) notFound();

  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const { entries, total } = await getKitchenCategoryEntries(cat.slug as CuisineCategory, {
    page,
    perPage: PER_PAGE,
  });
  const counts = await getKitchenCategoryCounts();
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  const breadcrumbs = breadcrumbsJsonLd([
    { name: 'Home', path: '/' },
    { name: pillarLabel('kitchen'), path: '/kitchen' },
    { name: cat.label, path: `/kitchen/${cat.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="content-column pt-2 pb-8">
        <header className="text-center mb-10">
          <p className="eyebrow mb-4">
            <Link href="/kitchen" className="hover:text-secondary">Kitchen</Link>
            {' '}·{' '}
            <span>{cat.label.toLowerCase()}</span>
          </p>
          <h1 className="font-display italic font-medium text-ink text-[44px] leading-[1.05] tracking-[-0.005em]">
            {cat.label}
          </h1>
          <p className="font-display italic text-ink text-[18px] mt-4 max-w-md mx-auto leading-snug">
            {cat.intro}
          </p>
          <div className="ornament-rule mt-7 mx-auto max-w-md">
            <span className="ornament">✦</span>
          </div>
        </header>

        <CategoryIndex counts={counts} activeSlug={cat.slug} />

        {entries.length === 0 ? (
          <p className="text-center font-display italic text-secondary py-16 text-[18px]">
            No notes in this corner yet. Coming.
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
                href={
                  page === 2
                    ? `/kitchen/${cat.slug}`
                    : `/kitchen/${cat.slug}?page=${page - 1}`
                }
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
                href={`/kitchen/${cat.slug}?page=${page + 1}`}
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

        <div className="mt-10 pt-6 text-center border-t border-border">
          <Link href="/kitchen" className="comment-link">
            ← All of the Kitchen
          </Link>
        </div>
      </div>
    </>
  );
}
