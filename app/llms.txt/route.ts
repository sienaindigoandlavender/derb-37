// /llms.txt — curated index for AI engines, per the emerging
// llmstxt.org convention. Built dynamically from the entries array
// so it stays in sync as content is added.
//
// Spec: https://llmstxt.org/

import {
  CUISINE_CATEGORIES,
  cuisineCategoryLabel,
  getAllPublishedEntries,
} from '@/lib/content';
import { GLOSSARY } from '@/lib/glossary';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 3600;

export async function GET() {
  const entries = await getAllPublishedEntries();

  const lines: string[] = [];

  lines.push('# Derb 37');
  lines.push('');
  lines.push(
    '> The cuisine of Morocco, written from inside it. A journal of recipes, kitchen notes, and dispatches from a 300-year-old riad in the Marrakech medina, by J. Ng.'
  );
  lines.push('');
  lines.push(
    'Derb 37 is the personal journal of J. Ng, written from a riad on a small derb in the Ksour quarter of the Marrakech medina. The site is structured around three pillars — Kitchen, Morocco, Travel — with the Kitchen pillar broken into eight cuisine hubs. A glossary of Moroccan cuisine and medina terms is published at /glossary.'
  );
  lines.push('');

  lines.push('## About');
  lines.push(
    `- [About](${SITE_URL}/about): J. Ng, the writer. The riad. The architecture of a house turned inward.`
  );
  lines.push('');

  lines.push('## The Kitchen — eight cuisine hubs');
  lines.push(
    `- [From the Kitchen](${SITE_URL}/kitchen): The cuisine of Morocco — what was on the stove, what came home from the souk, what made it onto the table.`
  );
  for (const cat of CUISINE_CATEGORIES) {
    lines.push(
      `- [${cat.label}](${SITE_URL}/kitchen/${cat.slug}): ${cat.intro}`
    );
  }
  lines.push('');

  lines.push('## The other pillars');
  lines.push(
    `- [My Morocco](${SITE_URL}/morocco): A first-person record of life inside the medina — Ramadan, ritual, the sound the souk makes at certain hours.`
  );
  lines.push(
    `- [Travel](${SITE_URL}/travel): Slow weeks elsewhere — the table I sat at, the bread I ate, the way the light moved.`
  );
  lines.push('');

  lines.push('## Glossary');
  lines.push(
    `- [Glossary of Moroccan cuisine and medina terms](${SITE_URL}/glossary): Short, definitive entries on the Arabic and Darija words that recur in the notes — harira, tagine, smen, ras el hanout, msemen, riad, derb, mellah, iftar, zellige, and more.`
  );
  lines.push('');

  lines.push('## Notes');
  for (const e of entries) {
    const summary = (e.excerpt || e.subtitle || '').trim();
    lines.push(
      `- [${e.title}](${SITE_URL}/${e.slug})${
        e.cuisine_category ? ` — *${cuisineCategoryLabel(e.cuisine_category)}*` : ''
      }${summary ? ': ' + summary : ''}`
    );
  }
  lines.push('');

  lines.push('## Glossary terms');
  for (const g of GLOSSARY) {
    lines.push(`- **${g.term}**${g.also ? ` (${g.also})` : ''}: ${g.definition}`);
  }
  lines.push('');

  lines.push('## Optional');
  lines.push(`- [Archive](${SITE_URL}/archive): Every note, in date order.`);
  lines.push(`- [Privacy](${SITE_URL}/privacy)`);
  lines.push(`- [Terms](${SITE_URL}/terms)`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
