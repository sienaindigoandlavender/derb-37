import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import PostStream from '@/components/PostStream';
import {
  getEntryBySlug,
  getEntryNeighbors,
  pillarShort,
  pillarLabel,
} from '@/lib/content';
import {
  AUTHOR_NAME,
  SITE_NAME,
  SITE_URL,
  breadcrumbsJsonLd,
  canonical,
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

function methodToSteps(method: string | null) {
  if (!method) return undefined;
  return method
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    }));
}

export default async function EntryPage({ params }: Props) {
  const entry = await getEntryBySlug(params.slug);
  if (!entry) notFound();

  const { prev, next } = await getEntryNeighbors(entry);

  const description =
    entry.excerpt ||
    metaDescriptionFromBody(entry.story_body) ||
    entry.subtitle ||
    '';

  const url = canonical(`/${entry.slug}`);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: entry.title,
    description,
    datePublished: entry.entry_date,
    dateModified: entry.updated_at,
    author: { '@id': `${SITE_URL}#author`, '@type': 'Person', name: AUTHOR_NAME, url: `${SITE_URL}/about` },
    publisher: { '@id': `${SITE_URL}#org` },
    image: entry.hero_image ? [entry.hero_image] : undefined,
    articleSection: pillarLabel(entry.pillar),
    keywords: (entry.cultural_origins || []).concat(entry.pillar).join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': `${SITE_URL}#website` },
    inLanguage: 'en',
    wordCount: entry.story_body ? entry.story_body.split(/\s+/).filter(Boolean).length : undefined,
  };

  const recipeSchema = entry.has_recipe
    ? {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        '@id': `${url}#recipe`,
        name: entry.recipe_title || entry.title,
        description,
        author: { '@id': `${SITE_URL}#author` },
        recipeYield: entry.recipe_yield || undefined,
        recipeCategory: pillarLabel(entry.pillar),
        recipeCuisine: (entry.cultural_origins && entry.cultural_origins.length > 0)
          ? entry.cultural_origins.map((c) => c.charAt(0).toUpperCase() + c.slice(1))
          : ['Moroccan'],
        keywords: (entry.cultural_origins || []).join(', '),
        recipeIngredient: (entry.recipe_sections || []).flatMap((s) => s.ingredients),
        recipeInstructions: methodToSteps(entry.recipe_method),
        image: entry.hero_image ? [entry.hero_image] : undefined,
        datePublished: entry.entry_date,
        isPartOf: { '@id': `${url}#article` },
      }
    : null;

  const breadcrumbs = breadcrumbsJsonLd([
    { name: 'Home', path: '/' },
    { name: pillarLabel(entry.pillar), path: `/${entry.pillar}` },
    { name: entry.title, path: `/${entry.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {recipeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="content-column pt-2 pb-6">
        <PostStream entry={entry} asPermalink />

        <div className="mt-8 pt-5 border-t border-border text-center">
          <Link href={`/${entry.pillar}`} className="comment-link">
            ← {pillarShort(entry.pillar)}
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
