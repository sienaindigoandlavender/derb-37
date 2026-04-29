import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import EntryFeatured from '@/components/EntryFeatured';
import EntryBody from '@/components/EntryBody';
import RecipeCard from '@/components/RecipeCard';
import Signature from '@/components/Signature';
import ArchiveGrid from '@/components/ArchiveGrid';
import {
  getEntryBySlug,
  getRecentEntries,
  pillarShort,
} from '@/lib/content';

export const revalidate = 300;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = await getEntryBySlug(params.slug);
  if (!entry) return { title: 'Not Found' };
  const description = entry.excerpt || entry.subtitle || '';
  return {
    title: entry.title,
    description,
    openGraph: {
      title: entry.title,
      description,
      type: 'article',
      images: entry.hero_image ? [{ url: entry.hero_image }] : [],
    },
  };
}

export default async function EntryPage({ params }: Props) {
  const entry = await getEntryBySlug(params.slug);
  if (!entry) notFound();

  const more = await getRecentEntries({ limit: 3, excludeId: entry.id, pillar: entry.pillar });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    datePublished: entry.entry_date,
    dateModified: entry.updated_at,
    author: { '@type': 'Person', name: 'Jacqueline Ng' },
    publisher: { '@type': 'Organization', name: 'Derb 37' },
    image: entry.hero_image || undefined,
    articleBody: entry.story_body || '',
    mainEntityOfPage: `https://derb37.com/${entry.slug}`,
  };

  const recipeSchema = entry.has_recipe
    ? {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: entry.recipe_title || entry.title,
        author: { '@type': 'Person', name: 'Jacqueline Ng' },
        recipeYield: entry.recipe_yield || undefined,
        recipeIngredient: (entry.recipe_sections || []).flatMap((s) => s.ingredients),
        recipeInstructions: entry.recipe_method || undefined,
        image: entry.hero_image || undefined,
        datePublished: entry.entry_date,
      }
    : null;

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

      <EntryFeatured entry={entry} headingLevel="h1" />
      <article>
        <EntryBody body={entry.story_body} />
        {entry.has_recipe && <RecipeCard entry={entry} />}
        <Signature />
      </article>

      <div className="px-6 text-center pb-6">
        <Link
          href={`/${entry.pillar}`}
          className="font-sc text-[11px] tracking-[0.32em] uppercase text-secondary hover:text-rust transition-colors"
        >
          ← More from {pillarShort(entry.pillar)}
        </Link>
      </div>

      {more.length > 0 && (
        <ArchiveGrid
          entries={more}
          eyebrow={`Also from ${pillarShort(entry.pillar)}`}
          title="Adjacent letters"
        />
      )}
    </>
  );
}
