// SEO helpers — canonical URL builder + JSON-LD generators.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://derb37.com').replace(/\/$/, '');
export const SITE_NAME = 'Derb 37';
export const AUTHOR_NAME = 'Jacqueline Ng';

export function canonical(path: string): string {
  if (!path.startsWith('/')) path = '/' + path;
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

export type Crumb = { name: string; path: string };

export function breadcrumbsJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonical(c.path),
    })),
  };
}

export function siteJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'en',
      description:
        'Short notes and recipes from a 300-year-old riad in the Marrakech medina, by Jacqueline Ng.',
      publisher: { '@id': `${SITE_URL}#org` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.jpg`,
      },
      sameAs: [
        'https://riaddisiena.com',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}#author`,
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
      knowsAbout: [
        'Moroccan cuisine',
        'Marrakech medina',
        'Cross-cultural cooking',
        'Riad life',
        'Ramadan food traditions',
      ],
      worksFor: { '@id': `${SITE_URL}#org` },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Marrakech',
        addressCountry: 'MA',
      },
    },
  ];
}

// Strip a markdown body to a clean meta description.
export function metaDescriptionFromBody(body: string | null | undefined, max = 158): string {
  if (!body) return '';
  const stripped = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`>~\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (stripped.length <= max) return stripped;
  // cut at last word boundary before max-1
  const cut = stripped.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim() + '…';
}

import type { Entry } from './content';
import { cuisineCategoryLabel, pillarLabel } from './content';

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

// Combined Article (+ Recipe) JSON-LD for an entry. Recipes use a single
// node with @type: ['Article','Recipe'] so Google sees the same canonical
// page is both an editorial article and a structured recipe — avoids the
// split-graph problem of emitting two separate top-level objects.
export function entryJsonLd(entry: Entry) {
  const url = canonical(`/${entry.slug}`);
  const description =
    entry.excerpt ||
    metaDescriptionFromBody(entry.story_body) ||
    entry.subtitle ||
    '';

  const wordCount = entry.story_body
    ? entry.story_body.split(/\s+/).filter(Boolean).length
    : undefined;

  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': entry.has_recipe ? ['Article', 'Recipe'] : 'Article',
    '@id': `${url}#article`,
    headline: entry.title,
    name: entry.has_recipe ? (entry.recipe_title || entry.title) : undefined,
    description,
    datePublished: entry.entry_date,
    dateModified: entry.updated_at,
    author: { '@id': `${SITE_URL}#author` },
    publisher: { '@id': `${SITE_URL}#org` },
    image: entry.hero_image ? [entry.hero_image] : undefined,
    articleSection: pillarLabel(entry.pillar),
    keywords: [
      ...(entry.cultural_origins || []),
      entry.pillar,
      entry.cuisine_category || '',
    ]
      .filter(Boolean)
      .join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': `${SITE_URL}#website` },
    inLanguage: 'en',
    wordCount,
    articleBody: entry.story_body || undefined,
  };

  if (entry.has_recipe) {
    const recipeCategory = entry.cuisine_category
      ? cuisineCategoryLabel(entry.cuisine_category)
      : pillarLabel(entry.pillar);
    const cuisines =
      entry.cultural_origins && entry.cultural_origins.length > 0
        ? entry.cultural_origins.map((c) => c.charAt(0).toUpperCase() + c.slice(1))
        : ['Moroccan'];
    Object.assign(base, {
      recipeYield: entry.recipe_yield || undefined,
      recipeCategory,
      recipeCuisine: cuisines,
      recipeIngredient: (entry.recipe_sections || []).flatMap((s) => s.ingredients),
      recipeInstructions: methodToSteps(entry.recipe_method),
    });
  }

  return base;
}
