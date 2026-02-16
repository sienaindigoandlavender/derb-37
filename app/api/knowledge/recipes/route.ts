import { NextRequest, NextResponse } from 'next/server';
import { getEntries } from '@/lib/data';

export async function GET(request: NextRequest) {
  const entries = await getEntries();
  const recipes = entries.filter(e => e.ingredients && e.ingredients.length > 0);

  const recipeSchemas = recipes.map(e => ({
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: e.recipe_title || e.title,
    url: `https://derb37.com/${e.slug}`,
    description: e.recipe_intro || e.story_body?.slice(0, 200) || '',
    author: { '@type': 'Person', name: 'Jacqueline Ng' },
    image: e.hero_image || undefined,
    datePublished: e.created_at,
    recipeIngredient: e.ingredients!.map(i => `${i.amount || ''} ${i.item}`.trim()),
    recipeInstructions: e.method ? [{
      '@type': 'HowToStep',
      text: e.method,
    }] : [],
    recipeCuisine: (e.cultural_origins || ['moroccan']).map(c =>
      c === 'moroccan' ? 'Moroccan' :
      c === 'chinese' ? 'Chinese' :
      c === 'mauritian' ? 'Mauritian' : c
    ),
    keywords: [
      e.season,
      ...(e.cultural_origins || []),
      'Marrakech',
      'home cooking',
    ].filter(Boolean).join(', '),
  }));

  return NextResponse.json({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Derb 37 Recipes',
    description: 'Recipes from a kitchen in the Marrakech medina — Moroccan, Chinese, Mauritian, and everything in between.',
    numberOfItems: recipeSchemas.length,
    itemListElement: recipeSchemas.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: r,
    })),
  });
}
