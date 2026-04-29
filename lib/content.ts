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
