import { supabase, nexus, hasSupabase, hasNexus } from './supabase';

export type Entry = {
  id: number;
  slug: string;
  title: string;
  pillar: 'kitchen' | 'culture' | 'walls';
  lane: 'jacquelines_kitchen' | 'pantry' | null;
  format: 'story_recipe' | 'recipe_only';
  voice: 'jacqueline' | 'observational' | 'practical';
  story_body: string | null;
  recipe_title: string | null;
  recipe_intro: string | null;
  ingredients: { item: string; amount?: string; note?: string }[] | null;
  method: string | null;
  cultural_origins: string[] | null;
  season: string | null;
  hero_image: string | null;
  image_prompt: string | null;
  images: { url: string; alt: string; caption?: string }[] | null;
  published: boolean;
  scheduled_at: string | null;
  order: number;
  created_at: string;
  updated_at: string;
};

export type ContentSite = {
  id: number;
  site_label: string;
  site_url: string;
  display_order: number;
  is_active: boolean;
};

// ── Entries ──

export async function getEntries(pillar?: string, lane?: string): Promise<Entry[]> {
  if (!hasSupabase) return [];
  let query = supabase
    .from('entries')
    .select('*')
    .eq('published', true)
    .order('"order"', { ascending: true });

  if (pillar) query = query.eq('pillar', pillar);
  if (lane) query = query.eq('lane', lane);

  const { data, error } = await query;
  if (error) { console.error('getEntries error:', error); return []; }
  return (data || []) as Entry[];
}

export async function getEntryBySlug(slug: string): Promise<Entry | null> {
  if (!hasSupabase) return null;
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) { console.error('getEntryBySlug error:', error); return null; }
  return data as Entry;
}

export async function getLatestEntries(limit: number = 6): Promise<Entry[]> {
  if (!hasSupabase) return [];
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) { console.error('getLatestEntries error:', error); return []; }
  return (data || []) as Entry[];
}

// ── Settings ──

export async function getSetting(key: string): Promise<string | null> {
  if (!hasSupabase) return null;
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single();

  if (error) return null;
  return data?.value || null;
}

// ── Nexus: Content Network ──

export async function getNexusContentSites(): Promise<ContentSite[]> {
  if (!hasNexus) return [];
  const { data, error } = await nexus
    .from('nexus_content_sites')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) { console.error('getNexusContentSites error:', error); return []; }
  return (data || []) as ContentSite[];
}

// ── Nexus: Legal Pages ──

export async function getLegalPage(pageType: string): Promise<{ title: string; content: string } | null> {
  if (!hasNexus) return null;
  const { data: page, error: pageError } = await nexus
    .from('nexus_legal_pages')
    .select('title, content')
    .eq('page_type', pageType)
    .single();

  if (pageError || !page) return null;

  const { data: site } = await nexus
    .from('nexus_sites')
    .select('*')
    .eq('site_id', process.env.SITE_ID || 'derb37')
    .single();

  let content = page.content || '';

  if (site) {
    const vars: Record<string, string> = {
      '{{site_name}}': site.site_name || 'Derb 37',
      '{{site_url}}': site.site_url || 'https://derb37.com',
      '{{legal_entity}}': site.legal_entity || 'Derb 37',
      '{{contact_email}}': site.contact_email || 'hello@derb37.com',
      '{{country}}': site.country || 'Morocco',
    };
    for (const [key, val] of Object.entries(vars)) {
      content = content.replaceAll(key, val);
    }
  }

  return { title: page.title, content };
}

// ── Nexus: Newsletter ──

export async function subscribeNewsletter(email: string): Promise<boolean> {
  if (!hasNexus) return false;
  const { error } = await nexus
    .from('newsletter_subscribers')
    .insert({
      email,
      source: 'derb37',
      subscribed_at: new Date().toISOString(),
    });

  if (error) {
    if (error.code === '23505') return true;
    console.error('Newsletter subscribe error:', error);
    return false;
  }
  return true;
}
