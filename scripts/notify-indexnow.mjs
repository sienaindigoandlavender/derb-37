// Post-build hook: ping IndexNow with the full URL list from sitemap.xml.
// Bing and Yandex use this; Google ignores it; it's free and harmless.
//
// Skips silently if IDX_KEY is unset. Skips silently if NEXT_PUBLIC_SITE_URL
// is unset.
//
// Usage (Vercel post-deploy or manual): node scripts/notify-indexnow.mjs

const key = process.env.IDX_KEY;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');

if (!key) {
  console.log('[indexnow] IDX_KEY unset — skipping ping.');
  process.exit(0);
}
if (!siteUrl) {
  console.log('[indexnow] NEXT_PUBLIC_SITE_URL unset — skipping ping.');
  process.exit(0);
}

const sitemapUrl = `${siteUrl}/sitemap.xml`;

let xml;
try {
  const res = await fetch(sitemapUrl);
  if (!res.ok) {
    console.warn(`[indexnow] sitemap fetch ${res.status} — skipping ping.`);
    process.exit(0);
  }
  xml = await res.text();
} catch (err) {
  console.warn('[indexnow] sitemap fetch failed:', err.message);
  process.exit(0);
}

const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g))
  .map((m) => m[1].trim())
  .filter((u) => u.startsWith(siteUrl));

if (urls.length === 0) {
  console.log('[indexnow] no URLs found in sitemap — skipping.');
  process.exit(0);
}

const host = new URL(siteUrl).hostname;
const body = {
  host,
  key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList: urls,
};

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  if (res.ok || res.status === 202) {
    console.log(`[indexnow] submitted ${urls.length} URLs (HTTP ${res.status}).`);
  } else {
    const text = await res.text().catch(() => '');
    console.warn(`[indexnow] HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
} catch (err) {
  console.warn('[indexnow] submit failed:', err.message);
}
