import { notFound } from 'next/navigation';
import { getEntryBySlug } from '@/lib/data';
import { getPillarConfig, getPillarColorClass } from '@/lib/pillars';
import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';

export const revalidate = 300;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = await getEntryBySlug(params.slug);
  if (!entry) return { title: 'Not Found' };
  return {
    title: entry.title,
    description: entry.story_body?.replace(/[#*_\[\]]/g, '').slice(0, 160) || entry.recipe_intro || '',
    openGraph: {
      title: entry.title,
      description: entry.story_body?.replace(/[#*_\[\]]/g, '').slice(0, 160) || '',
      images: entry.hero_image ? [{ url: entry.hero_image }] : [],
    },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function EntryPage({ params }: Props) {
  const entry = await getEntryBySlug(params.slug);
  if (!entry) notFound();

  const pillar = getPillarConfig(entry.pillar);
  const laneLabel = entry.lane === 'jacquelines_kitchen' ? "Jacqueline's Kitchen" : entry.lane === 'pantry' ? 'Pantry Notes' : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    image: entry.hero_image || '',
    author: { '@type': 'Person', name: 'Jacqueline Ng' },
    publisher: { '@type': 'Organization', name: 'Derb 37' },
    datePublished: entry.created_at,
    dateModified: entry.updated_at,
    about: {
      '@type': 'Place',
      name: 'Derb 37, Ksour Quarter',
      address: { '@type': 'PostalAddress', streetAddress: '37 Derb Fhal Zfriti', addressLocality: 'Marrakech', addressCountry: 'MA' },
    },
  };

  const recipeSchema = entry.ingredients ? {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: entry.recipe_title || entry.title,
    description: entry.recipe_intro || '',
    author: { '@type': 'Person', name: 'Jacqueline Ng' },
    recipeIngredient: entry.ingredients.map((i) => `${i.amount || ''} ${i.item}`.trim()),
    recipeInstructions: entry.method || '',
    image: entry.hero_image || '',
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {recipeSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }} />}

      <article className="content-column pt-4 pb-12">
        <p className="post-date mb-2">{formatDate(entry.created_at)}</p>
        <p className="post-category mb-1">
          <Link href={pillar?.href || '/'}>{pillar?.label || entry.pillar}</Link>
          {laneLabel && ` · ${laneLabel}`}
          {entry.season && ` · ${entry.season}`}
        </p>

        <h1 className="post-title !text-[28px] !mb-8">{entry.title}</h1>

        {entry.cultural_origins && entry.cultural_origins.length > 0 && (
          <p className="text-xs text-muted italic mb-6">{entry.cultural_origins.join(' · ')}</p>
        )}

        {entry.hero_image && (
          <div className="mb-8">
            <Image src={entry.hero_image} alt={entry.title} width={710} height={536} className="w-full h-auto" priority sizes="(max-width: 768px) 100vw, 710px" />
          </div>
        )}

        {entry.story_body && (
          <div className="post-body">
            <ReactMarkdown>{entry.story_body}</ReactMarkdown>
          </div>
        )}

        {entry.images && entry.images.length > 0 && (
          <div className="my-8 space-y-4">
            {entry.images.map((img, i) => (
              <figure key={i}>
                <Image src={img.url} alt={img.alt} width={710} height={536} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 710px" />
                {img.caption && <figcaption className="text-xs text-muted mt-2 italic">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {(entry.recipe_title || entry.ingredients) && (
          <div className="post-body mt-10 pt-8 border-t border-border">
            {entry.recipe_title && <p><strong>{entry.recipe_title}</strong></p>}
            {entry.recipe_intro && <p><em>{entry.recipe_intro}</em></p>}

            {entry.ingredients && (
              <div className="recipe-ingredients my-4">
                {entry.ingredients.map((ing, i) => (
                  <span key={i} className="block">
                    {ing.amount && <>{ing.amount} </>}{ing.item}{ing.note && <> — <em>{ing.note}</em></>}
                  </span>
                ))}
              </div>
            )}

            {entry.method && (
              <div className="mt-4"><ReactMarkdown>{entry.method}</ReactMarkdown></div>
            )}
          </div>
        )}

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href={pillar?.href || '/'} className="comment-link">
            ← Back to {pillar?.label || 'Home'}
          </Link>
        </div>
      </article>

      <div className="content-column">
        <Newsletter />
      </div>
    </>
  );
}
