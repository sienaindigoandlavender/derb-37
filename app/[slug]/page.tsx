import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import PostStream from '@/components/PostStream';
import Newsletter from '@/components/Newsletter';
import { getEntryBySlug, pillarShort } from '@/lib/content';

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

      <div className="content-column pt-4 pb-8">
        <PostStream entry={entry} asPermalink />

        <div className="mt-12 pt-8 border-t border-border">
          <Link href={`/${entry.pillar}`} className="comment-link">
            ← Back to {pillarShort(entry.pillar)}
          </Link>
        </div>

        <Newsletter sourcePage={`/${entry.slug}`} />
      </div>
    </>
  );
}
