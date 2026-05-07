// Auto-link glossary terms inside rendered entry HTML. First-occurrence
// only per entry. Skips text inside <a>, <h1..h6>, <pre>, <code>, and
// inside any HTML tag attribute. Each term and its alternate spelling
// share a single slot — once one is linked, the other is skipped.

import { GLOSSARY } from './glossary';

const SKIP_TAGS = new Set([
  'a',
  'pre',
  'code',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
]);

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function termSlug(term: string): string {
  return term.toLowerCase().replace(/\s+/g, '-');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type Segment = { text: string; eligible: boolean };

function segment(html: string): Segment[] {
  const segs: Segment[] = [];
  let depth = 0;
  let buffer = '';
  let i = 0;

  while (i < html.length) {
    const ch = html[i];
    if (ch === '<') {
      if (buffer) {
        segs.push({ text: buffer, eligible: depth === 0 });
        buffer = '';
      }
      const close = html.indexOf('>', i);
      if (close === -1) {
        segs.push({ text: html.slice(i), eligible: false });
        return segs;
      }
      const tag = html.slice(i, close + 1);
      segs.push({ text: tag, eligible: false });
      const tagMatch = /^<\/?([a-zA-Z][a-zA-Z0-9]*)/.exec(tag);
      if (tagMatch) {
        const tn = tagMatch[1].toLowerCase();
        if (SKIP_TAGS.has(tn) && !tag.endsWith('/>')) {
          if (tag.startsWith('</')) depth = Math.max(0, depth - 1);
          else depth++;
        }
      }
      i = close + 1;
    } else {
      buffer += ch;
      i++;
    }
  }
  if (buffer) segs.push({ text: buffer, eligible: depth === 0 });
  return segs;
}

/**
 * Replace the first text occurrence of each glossary term in `html` with a
 * link to /glossary#<slug>. First-occurrence only: each term gets at most
 * one link per call. Designed for rendered entry HTML.
 */
export function linkGlossaryTerms(html: string): string {
  if (!html) return html;

  // Build candidates, longest-first so e.g. "preserved lemon" beats "lemon".
  const candidates: { match: string; slug: string }[] = [];
  for (const t of GLOSSARY) {
    const slug = termSlug(t.term);
    candidates.push({ match: t.term, slug });
    if (t.also) candidates.push({ match: t.also, slug });
  }
  candidates.sort((a, b) => b.match.length - a.match.length);

  const segs = segment(html);
  const usedSlugs = new Set<string>();

  for (const { match, slug } of candidates) {
    if (usedSlugs.has(slug)) continue;
    const pattern = new RegExp(`\\b${escapeRegex(match)}\\b`, 'i');
    for (let s = 0; s < segs.length; s++) {
      const seg = segs[s];
      if (!seg.eligible) continue;
      const m = pattern.exec(seg.text);
      if (m) {
        const before = seg.text.slice(0, m.index);
        const matched = m[0];
        const after = seg.text.slice(m.index + m[0].length);
        seg.text =
          before +
          `<a class="glossary-link" href="/glossary#${slug}">${escapeHtml(matched)}</a>` +
          after;
        usedSlugs.add(slug);
        break;
      }
    }
  }

  return segs.map((s) => s.text).join('');
}
