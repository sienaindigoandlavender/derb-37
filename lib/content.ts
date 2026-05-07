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

export type FAQ = { q: string; a: string };

// Authority taxonomy for the Kitchen pillar — every category gets a hub
// page at /kitchen/[slug]. Intros and labels are the canonical house copy.
// FAQs are surfaced as FAQPage JSON-LD on each hub so AI engines can cite
// definitions back to derb37.
export const CUISINE_CATEGORIES: ReadonlyArray<{
  slug: CuisineCategory;
  label: string;
  intro: string;
  faqs: FAQ[];
}> = [
  {
    slug: 'tagines',
    label: 'Tagines',
    intro: 'The slow ones. The Friday ones. The ones that taught me patience.',
    faqs: [
      {
        q: 'What is a tagine?',
        a: 'Both the cooking pot and the dish that lives in it. The conical clay lid traps and recycles steam, so meat braises in its own moisture for hours over a low flame.',
      },
      {
        q: 'Tagine or tajine?',
        a: 'Same dish, different transliteration of the Arabic. Tajine is closer to the French rendering; tagine is the more common English spelling. Both are correct.',
      },
      {
        q: 'A good tagine to start with?',
        a: 'Lamb with preserved lemon and olives. Or chicken with prunes and almonds. Both forgive a slow Friday and a not-quite-perfect pot.',
      },
    ],
  },
  {
    slug: 'breads',
    label: 'Breads',
    intro:
      'Khobz on the counter, msemen on the griddle, the baker at the corner who knows the house by name.',
    faqs: [
      {
        q: 'What is khobz?',
        a: 'The everyday round bread of Morocco. Wheat and semolina, a low oven, a wooden board for carrying. Bought from the communal oven at the corner, or shaped at home and walked there.',
      },
      {
        q: 'What is msemen?',
        a: 'A square, layered flatbread folded and folded again, then cooked on a hot pan. Sweet for breakfast with honey, savoury for tea with cheese.',
      },
      {
        q: 'Why does Moroccan bread taste different?',
        a: 'Semolina in the dough, a wood-fired communal oven, and fifteen minutes between out-of-the-oven and on-the-table.',
      },
    ],
  },
  {
    slug: 'soups-stews',
    label: 'Soups & Stews',
    intro:
      'Harira at sundown, bissara in February, the pot that has been on since noon.',
    faqs: [
      {
        q: 'What is harira?',
        a: 'The Moroccan tomato-and-lentil soup of Ramadan. Lentils, chickpeas, fresh tomato, coriander, parsley, cumin, ginger, saffron, a finishing thread of flour-water, and cinnamon at the very end.',
      },
      {
        q: 'When is harira eaten?',
        a: 'Most commonly at iftar — the breaking of the fast at sunset during Ramadan — alongside dates, eggs, chebakia, and bread. Some households eat it year-round on cool evenings.',
      },
      {
        q: 'What is bissara?',
        a: 'A thick fava bean soup, eaten in winter. Topped with olive oil, cumin, and a pinch of paprika. A breakfast soup in some regions, a supper soup in others.',
      },
    ],
  },
  {
    slug: 'sweets',
    label: 'Sweets',
    intro:
      'Almonds, orange flower, honey that runs slow. Mostly for the table at Eid, sometimes for a Tuesday.',
    faqs: [
      {
        q: 'What is chebakia?',
        a: 'A Ramadan sweet — sesame-and-flour dough fried into a flower shape, then dipped in hot honey and showered with more sesame. Eaten at iftar with harira.',
      },
      {
        q: 'What is ghoriba?',
        a: 'Moroccan shortbread biscuits, cracked on top, made with almonds, semolina, or coconut. Tea-time food.',
      },
      {
        q: 'What is baghrir?',
        a: 'The thousand-hole pancake — a yeasted batter cooked on one side only, lacy with bubbles on top. Served with melted butter and honey.',
      },
    ],
  },
  {
    slug: 'preserves',
    label: 'Preserves',
    intro: 'Lemons in salt, tomatoes in oil, the small jars that change everything.',
    faqs: [
      {
        q: 'How long do preserved lemons take?',
        a: 'Six weeks in salt and lemon juice, in a cool cupboard. The rind softens and turns translucent. Use the rind, not the flesh.',
      },
      {
        q: 'What is smen?',
        a: 'Aged butter, salted, sometimes infused with herbs and left to develop for months or years. A spoonful goes into couscous or harira at the table. An acquired taste.',
      },
      {
        q: 'Why preserve at home?',
        a: 'Texture, salt level, and what is actually in the jar. Three reasons.',
      },
    ],
  },
  {
    slug: 'salads-mezze',
    label: 'Salads & Mezze',
    intro:
      'The little plates that arrive before anything else. Cooked, raw, smoked, charred — never an afterthought.',
    faqs: [
      {
        q: 'What is zaalouk?',
        a: 'A cooked Moroccan salad of aubergine, tomato, garlic, cumin, paprika, and olive oil. Served cold with bread, almost always at the start of a meal.',
      },
      {
        q: 'What is taktouka?',
        a: 'A slow-cooked tomato-and-pepper salad-mezze — green peppers charred, tomatoes broken down, lemon and paprika to finish. Eaten cold, with bread.',
      },
      {
        q: 'What goes in mezze?',
        a: 'Whatever is small and on the table first — olives, two or three salads, bread, sometimes preserved lemon, sometimes a bowl of cumin.',
      },
    ],
  },
  {
    slug: 'street-food',
    label: 'Street Food',
    intro:
      'What the medina eats standing up. Snail broth at midnight, msemen at dawn, sardines off the brazier.',
    faqs: [
      {
        q: 'What does the Marrakech medina eat standing up?',
        a: 'Snail broth at midnight, msemen with cheese at dawn, sardines off a charcoal brazier in the Mellah, and bissara from a small clay bowl in winter.',
      },
      {
        q: 'What is babbouche?',
        a: 'Babbouche is the Moroccan name for the small spiced snail broth sold from carts. The broth carries coriander, mint, anise, liquorice, and orange peel — the snails themselves come second.',
      },
      {
        q: 'Where do you find the best sardine in Marrakech?',
        a: 'Off a charcoal brazier at the Mellah souk, salted, cumin, eaten with bread and your hands.',
      },
    ],
  },
  {
    slug: 'feast-day',
    label: 'Feast Days',
    intro:
      'Eid, Ramadan, the wedding three streets over. The cooking that takes two days and feeds the neighbourhood.',
    faqs: [
      {
        q: 'What is eaten at Eid al-Adha?',
        a: 'Lamb, every part of it. Mechoui — whole lamb slow-roasted in a pit oven — for the first day. Tanjia, brochettes, and offal stews on the days after.',
      },
      {
        q: 'What is eaten at Eid al-Fitr?',
        a: 'Sweets first — chebakia, ghoriba, msemen with honey, baghrir — before any savoury food. The fast is broken in butter and sugar.',
      },
      {
        q: 'What is mechoui?',
        a: 'Whole lamb, slow-roasted for several hours in a pit oven (or, in the medina, in the embers of a hammam fire). The shoulder pulls apart with two fingers. Eid food.',
      },
    ],
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

// Pick a few entries from pillars OTHER than the given one. Used to break
// the silo between /kitchen, /morocco, /travel — improves internal
// PageRank flow and tells search engines these aren't isolated thin pages.
export async function getCrossPillarEntries(
  excludePillar: Pillar,
  limit = 3
): Promise<Entry[]> {
  const all = publishedSorted().filter((e) => e.pillar !== excludePillar);
  const others: Pillar[] = (['kitchen', 'morocco', 'travel'] as const).filter(
    (p) => p !== excludePillar
  );
  // Round-robin so each other-pillar gets at least one slot.
  const buckets: Record<string, Entry[]> = {};
  for (const p of others) buckets[p] = all.filter((e) => e.pillar === p);
  const picked: Entry[] = [];
  for (let round = 0; picked.length < limit; round++) {
    let progressed = false;
    for (const p of others) {
      const e = buckets[p][round];
      if (e) {
        picked.push(e);
        progressed = true;
        if (picked.length >= limit) break;
      }
    }
    if (!progressed) break;
  }
  return picked;
}

// Pick a few kitchen entries from cuisine categories OTHER than the given
// one. Used on /kitchen/[category] hubs to surface adjacent categories.
export async function getCrossCategoryEntries(
  excludeCategory: CuisineCategory,
  limit = 2
): Promise<Entry[]> {
  return publishedSorted()
    .filter(
      (e) =>
        e.pillar === 'kitchen' &&
        e.cuisine_category &&
        e.cuisine_category !== excludeCategory
    )
    .slice(0, limit);
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
