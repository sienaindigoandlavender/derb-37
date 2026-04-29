import { supabase, hasSupabase } from './supabase';

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

const defaultSettings: Settings = {
  site_title: 'Derb 37',
  site_tagline: 'a journal from a house in the medina',
  volume: 'Vol. I',
  issue: 'No. III',
  season_label: 'Spring 2026',
};

export async function getSettings(): Promise<Settings> {
  if (!hasSupabase) return defaultSettings;
  const { data, error } = await supabase.from('settings').select('key, value');
  if (error || !data) return defaultSettings;

  const map = data.reduce<Record<string, string>>((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});

  return {
    site_title: map.site_title || defaultSettings.site_title,
    site_tagline: map.site_tagline || defaultSettings.site_tagline,
    volume: map.volume || defaultSettings.volume,
    issue: map.issue || defaultSettings.issue,
    season_label: map.season_label || defaultSettings.season_label,
  };
}

export async function getLatestEntry(): Promise<Entry | null> {
  if (!hasSupabase) return null;
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('published', true)
    .order('entry_date', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error('getLatestEntry error:', error);
    return null;
  }
  return data as Entry | null;
}

export async function getRecentEntries(opts: { limit?: number; excludeId?: number; pillar?: Pillar } = {}): Promise<Entry[]> {
  if (!hasSupabase) return [];
  const { limit = 6, excludeId, pillar } = opts;
  let query = supabase
    .from('entries')
    .select('*')
    .eq('published', true)
    .order('entry_date', { ascending: false })
    .limit(limit);

  if (excludeId) query = query.neq('id', excludeId);
  if (pillar) query = query.eq('pillar', pillar);

  const { data, error } = await query;
  if (error) {
    console.error('getRecentEntries error:', error);
    return [];
  }
  return (data || []) as Entry[];
}

export async function getEntriesByPillar(pillar: Pillar, opts: { page?: number; perPage?: number } = {}): Promise<{ entries: Entry[]; total: number }> {
  if (!hasSupabase) return { entries: [], total: 0 };
  const { page = 1, perPage = 12 } = opts;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { count } = await supabase
    .from('entries')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)
    .eq('pillar', pillar);

  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('published', true)
    .eq('pillar', pillar)
    .order('entry_date', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('getEntriesByPillar error:', error);
    return { entries: [], total: 0 };
  }
  return { entries: (data || []) as Entry[], total: count || 0 };
}

export async function getAllPublishedEntries(): Promise<Entry[]> {
  if (!hasSupabase) return [];
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('published', true)
    .order('entry_date', { ascending: false });
  if (error) {
    console.error('getAllPublishedEntries error:', error);
    return [];
  }
  return (data || []) as Entry[];
}

export async function getEntryBySlug(slug: string): Promise<Entry | null> {
  if (!hasSupabase) return null;
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) {
    console.error('getEntryBySlug error:', error);
    return null;
  }
  return data as Entry | null;
}

export async function getEntryNeighbors(entry: Entry): Promise<{ prev: Entry | null; next: Entry | null }> {
  if (!hasSupabase) return { prev: null, next: null };

  // "previous" note = older = entry_date < this one
  const { data: prevData } = await supabase
    .from('entries')
    .select('*')
    .eq('published', true)
    .lt('entry_date', entry.entry_date)
    .order('entry_date', { ascending: false })
    .limit(1)
    .maybeSingle();

  // "next" note = newer = entry_date > this one
  const { data: nextData } = await supabase
    .from('entries')
    .select('*')
    .eq('published', true)
    .gt('entry_date', entry.entry_date)
    .order('entry_date', { ascending: true })
    .limit(1)
    .maybeSingle();

  return {
    prev: (prevData as Entry | null) || null,
    next: (nextData as Entry | null) || null,
  };
}

export function formatEntryDate(iso: string): string {
  // "14 January"
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
