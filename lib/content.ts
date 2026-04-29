import { ENTRIES, SETTINGS } from './entries';

export type RecipeSection = {
  label: string;
  ingredients: string[];
};

export type EntryImage = {
  url: string;
  alt: string;
  caption?: string;
};

export type Pillar = 'kitchen' | 'morocco' | 'travel';

export type CuisineCategory =
  | 'tagines'
  | 'breads'
  | 'soups-stews'
  | 'sweets'
  | 'preserves'
  | 'salads-mezze'
  | 'street-food'
  | 'feast-day';

export type PantryItem = {
  name: string;
  note?: string;
  zfriti_url: string;
};

export type Pantry = {
  intro: string;
  items: PantryItem[];
};

export type Entry = {
  id: number;
  slug: string;
  title: string;
  pillar: Pillar;
  subtitle: string | null;
  excerpt: string | null;
  story_body: string | null;
  has_recipe: boolean;
  recipe_title: string | null;
  recipe_yield: string | null;
  recipe_sections: RecipeSection[] | null;
  recipe_method: string | null;
  cultural_origins: string[] | null;
  cuisine_category: CuisineCategory | null;
  pantry: Pantry | null;
  season: string | null;
  image_prompt: string | null;
  hero_image: string | null;
  hero_caption: string | null;
  images: EntryImage[] | null;
  entry_date: string;
  published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
};

// Authority taxonomy for the Kitchen pillar — every category gets a hub
// page at /kitchen/[slug]. Intros and labels are the canonical house copy.
export const CUISINE_CATEGORIES: ReadonlyArray<{
  slug: CuisineCategory;
  label: string;
  intro: string;
}> = [
  {
    slug: 'tagines',
    label: 'Tagines',
    intro: 'The slow ones. The Friday ones. The ones that taught me patience.',
  },
  {
    slug: 'breads',
    label: 'Breads',
    intro:
      'Khobz on the counter, msemen on the griddle, the baker at the corner who knows the house by name.',
  },
  {
    slug: 'soups-stews',
    label: 'Soups & Stews',
    intro:
      'Harira at sundown, bissara in February, the pot that has been on since noon.',
  },
  {
    slug: 'sweets',
    label: 'Sweets',
    intro:
      'Almonds, orange flower, honey that runs slow. Mostly for the table at Eid, sometimes for a Tuesday.',
  },
  {
    slug: 'preserves',
    label: 'Preserves',
    intro: 'Lemons in salt, tomatoes in oil, the small jars that change everything.',
  },
  {
    slug: 'salads-mezze',
    label: 'Salads & Mezze',
    intro:
      'The little plates that arrive before anything else. Cooked, raw, smoked, charred — never an afterthought.',
  },
  {
    slug: 'street-food',
    label: 'Street Food',
    intro:
      'What the medina eats standing up. Snail broth at midnight, msemen at dawn, sardines off the brazier.',
  },
  {
    slug: 'feast-day',
    label: 'Feast Days',
    intro:
      'Eid, Ramadan, the wedding three streets over. The cooking that takes two days and feeds the neighbourhood.',
  },
];

export function findCuisineCategory(slug: string) {
  return CUISINE_CATEGORIES.find((c) => c.slug === slug) || null;
}

export function cuisineCategoryLabel(slug: CuisineCategory): string {
  return CUISINE_CATEGORIES.find((c) => c.slug === slug)?.label || slug;
}

export type Settings = {
  site_title: string;
  site_tagline: string;
  volume: string;
  issue: string;
  season_label: string;
};

function publishedSorted(): Entry[] {
  return ENTRIES
    .filter((e) => e.published)
    .slice()
    .sort((a, b) => b.entry_date.localeCompare(a.entry_date));
}

export async function getSettings(): Promise<Settings> {
  return SETTINGS;
}

export async function getLatestEntry(): Promise<Entry | null> {
  return publishedSorted()[0] || null;
}

export async function getRecentEntries(opts: {
  limit?: number;
  excludeId?: number;
  pillar?: Pillar;
} = {}): Promise<Entry[]> {
  const { limit = 6, excludeId, pillar } = opts;
  let list = publishedSorted();
  if (pillar) list = list.filter((e) => e.pillar === pillar);
  if (excludeId) list = list.filter((e) => e.id !== excludeId);
  return list.slice(0, limit);
}

export async function getEntriesByPillar(
  pillar: Pillar,
  opts: { page?: number; perPage?: number } = {}
): Promise<{ entries: Entry[]; total: number }> {
  const { page = 1, perPage = 12 } = opts;
  const all = publishedSorted().filter((e) => e.pillar === pillar);
  const from = (page - 1) * perPage;
  const to = from + perPage;
  return { entries: all.slice(from, to), total: all.length };
}

export async function getKitchenCategoryEntries(
  category: CuisineCategory,
  opts: { page?: number; perPage?: number } = {}
): Promise<{ entries: Entry[]; total: number }> {
  const { page = 1, perPage = 12 } = opts;
  const all = publishedSorted().filter(
    (e) => e.pillar === 'kitchen' && e.cuisine_category === category
  );
  const from = (page - 1) * perPage;
  const to = from + perPage;
  return { entries: all.slice(from, to), total: all.length };
}

export async function getKitchenCategoryCounts(): Promise<Record<CuisineCategory, number>> {
  const acc = Object.fromEntries(
    CUISINE_CATEGORIES.map((c) => [c.slug, 0])
  ) as Record<CuisineCategory, number>;
  for (const e of publishedSorted()) {
    if (e.pillar === 'kitchen' && e.cuisine_category) {
      acc[e.cuisine_category] = (acc[e.cuisine_category] || 0) + 1;
    }
  }
  return acc;
}

export async function getAllPublishedEntries(): Promise<Entry[]> {
  return publishedSorted();
}

export async function getEntryBySlug(slug: string): Promise<Entry | null> {
  return ENTRIES.find((e) => e.slug === slug && e.published) || null;
}

export async function getEntryNeighbors(entry: Entry): Promise<{ prev: Entry | null; next: Entry | null }> {
  const list = publishedSorted();
  const idx = list.findIndex((e) => e.id === entry.id);
  if (idx === -1) return { prev: null, next: null };
  // Sorted newest → oldest, so "newer" sits at idx-1, "older" at idx+1.
  const next = idx > 0 ? list[idx - 1] : null;
  const prev = idx < list.length - 1 ? list[idx + 1] : null;
  return { prev, next };
}

export function formatEntryDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  const day = d.getUTCDate();
  const month = d.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
  return `${day} ${month}`;
}

export function formatEntryDateLong(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  const day = d.getUTCDate();
  const month = d.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export function pillarLabel(p: Pillar): string {
  if (p === 'kitchen') return 'From the Kitchen';
  if (p === 'morocco') return 'My Morocco';
  return 'Travel';
}

export function pillarShort(p: Pillar): string {
  return p.charAt(0).toUpperCase() + p.slice(1);
}
