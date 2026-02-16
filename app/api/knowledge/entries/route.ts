import { NextRequest, NextResponse } from 'next/server';
import { getEntries } from '@/lib/data';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const format = searchParams.get('format') || 'full';
  const pillar = searchParams.get('pillar');
  const slug = searchParams.get('slug');

  let entries = await getEntries();
  if (pillar) entries = entries.filter(e => e.pillar === pillar);
  if (slug) entries = entries.filter(e => e.slug === slug);

  if (format === 'simple') {
    return NextResponse.json({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Derb 37',
      url: 'https://derb37.com',
      description: 'A food and life journal from inside a 300-year-old house in the Marrakech medina.',
      blogPost: entries.map(e => ({
        title: e.title,
        slug: e.slug,
        url: `https://derb37.com/${e.slug}`,
        pillar: e.pillar,
        season: e.season,
        hasRecipe: !!(e.ingredients && e.ingredients.length > 0),
        culturalOrigins: e.cultural_origins,
        datePublished: e.created_at,
      })),
    });
  }

  const articles = entries.map(e => ({
    '@context': 'https://schema.org',
    '@type': e.ingredients ? 'Article' : 'BlogPosting',
    headline: e.title,
    url: `https://derb37.com/${e.slug}`,
    image: e.hero_image || undefined,
    author: { '@type': 'Person', name: 'Jacqueline Ng' },
    publisher: { '@type': 'Organization', name: 'Derb 37', url: 'https://derb37.com' },
    datePublished: e.created_at,
    dateModified: e.updated_at,
    articleBody: e.story_body?.slice(0, 3000) || '',
    wordCount: e.story_body?.split(/\s+/).length || 0,
    keywords: [
      e.pillar,
      e.season,
      ...(e.cultural_origins || []),
      e.lane === 'jacquelines_kitchen' ? 'home cooking' : null,
      e.lane === 'pantry' ? 'pantry' : null,
    ].filter(Boolean),
    about: {
      '@type': 'Place',
      name: 'Marrakech medina',
      address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' },
    },
    potentialAction: { '@type': 'ReadAction', target: `https://derb37.com/${e.slug}` },
  }));

  return NextResponse.json({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Derb 37',
    url: 'https://derb37.com',
    description: 'A food and life journal from inside a 300-year-old house in the Marrakech medina.',
    author: { '@type': 'Person', name: 'Jacqueline Ng' },
    blogPost: articles,
  });
}
