import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import PostStream from '@/components/PostStream';
import PantryBlock from '@/components/PantryBlock';
import {
  cuisineCategoryLabel,
  getEntryBySlug,
  getEntryNeighbors,
  pillarShort,
  pillarLabel,
} from '@/lib/content';
import {
  AUTHOR_NAME,
  SITE_NAME,
  breadcrumbsJsonLd,
  canonical,
  entryJsonLd,
  metaDescriptionFromBody,
} from '@/lib/seo';

export const revalidate = 300;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = await getEntryBySlug(params.slug);
  if (!entry) {
    return { title: 'Not Found', robots: { index: false, follow: false } };
  }

  const description =
    entry.excerpt ||
    metaDescriptionFromBody(entry.story_body) ||
    entry.subtitle ||
    `A note from ${SITE_NAME} — ${pillarLabel(entry.pillar)}.`;

  const url = canonical(`/${entry.slug}`);

  return {
    title: entry.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: entry.title,
      description,
      publishedTime: entry.entry_date,
      modifiedTime: entry.updated_at,
      authors: [AUTHOR_NAME],
      section: pillarLabel(entry.pillar),
      tags: entry.cultural_origins || [],
      images: entry.hero_image ? [{ url: entry.hero_image, alt: entry.title }] : [],
    },
    twitter: {
      title: entry.title,
      description,
      images: entry.hero_image ? [entry.hero_image] : [],
    },
  };
}

export default async function EntryPage({ params }: Props) {
  const entry = await getEntryBySlug(params.slug);
  if (!entry) notFound();

  const { prev, next } = await getEntryNeighbors(entry);
  const articleSchema = entryJsonLd(entry);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: pillarLabel(entry.pillar), path: `/${entry.pillar}` },
  ];
  if (entry.pillar === 'kitchen' && entry.cuisine_category) {
    crumbs.push({
      name: cuisineCategoryLabel(entry.cuisine_category),
      path: `/kitchen/${entry.cuisine_category}`,
    });
  }
  crumbs.push({ name: entry.title, path: `/${entry.slug}` });
  const breadcrumbs = breadcrumbsJsonLd(crumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="content-column pt-2 pb-6">
        <PostStream entry={entry} asPermalink />

        {entry.pantry && <PantryBlock pantry={entry.pantry} />}

        <div className="mt-10 pt-6 border-t border-border text-center flex flex-wrap justify-center gap-x-4 gap-y-2">
          {entry.pillar === 'kitchen' && entry.cuisine_category && (
            <>
              <Link href={`/kitchen/${entry.cuisine_category}`} className="comment-link">
                ← {cuisineCategoryLabel(entry.cuisine_category)}
              </Link>
              <span aria-hidden className="text-light">·</span>
            </>
          )}
          <Link href={`/${entry.pillar}`} className="comment-link">
            All of {pillarShort(entry.pillar)}
          </Link>
        </div>

        {(prev || next) && (
          <nav
            className="mt-6 flex justify-between items-start gap-6"
            aria-label="Adjacent notes"
          >
            <div className="flex-1">
              {next && (
                <Link href={`/${next.slug}`} rel="next" className="block group">
                  <p className="comment-link mb-1">Newer note</p>
                  <p className="font-serif text-[15px] uppercase tracking-[0.08em] text-ink group-hover:text-secondary">
                    {next.title}
                  </p>
                </Link>
              )}
            </div>
            <div className="flex-1 text-right">
              {prev && (
                <Link href={`/${prev.slug}`} rel="prev" className="block group">
                  <p className="comment-link mb-1">Older note</p>
                  <p className="font-serif text-[15px] uppercase tracking-[0.08em] text-ink group-hover:text-secondary">
                    {prev.title}
                  </p>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
