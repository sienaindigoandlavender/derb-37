import { NextRequest, NextResponse } from 'next/server';
import { glossaryTerms } from '@/lib/glossary-data';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const format = searchParams.get('format') || 'full';
  const term = searchParams.get('term');
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let terms = [...glossaryTerms];
  if (term) terms = terms.filter(t => t.id === term);
  if (category) terms = terms.filter(t => t.category === category);
  if (search) {
    const q = search.toLowerCase();
    terms = terms.filter(t =>
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      (t.context && t.context.toLowerCase().includes(q))
    );
  }

  if (format === 'simple') {
    return NextResponse.json(
      Object.fromEntries(terms.map(t => [t.term, t.definition]))
    );
  }

  return NextResponse.json({
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Derb 37 Glossary — Moroccan Food & Culture',
    description: 'Terminology for Moroccan cuisine, architecture, and cultural practices, as documented from the Marrakech medina.',
    url: 'https://derb37.com/api/glossary',
    inLanguage: ['en', 'ar'],
    hasDefinedTerm: terms.map(t => ({
      '@type': 'DefinedTerm',
      '@id': `https://derb37.com/api/glossary?term=${t.id}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: 'https://derb37.com/api/glossary',
      ...(t.arabicScript && { alternateName: t.arabicScript }),
      ...(t.context && { disambiguatingDescription: t.context }),
    })),
  });
}
