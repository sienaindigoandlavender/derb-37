import type { MetadataRoute } from 'next';
import { getAllPublishedEntries } from '@/lib/content';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://derb37.com').replace(/\/$/, '');

// Defensive: encode `&`, quotes, etc. that broke Slow Morocco's sitemap Feb 2026.
function safeSitemapUrl(slug: string): string {
  return encodeURIComponent(slug).replace(/%2F/g, '/');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries = await getAllPublishedEntries();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/kitchen`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/morocco`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/travel`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/archive`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/letters`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const entryRoutes: MetadataRoute.Sitemap = entries.map((entry) => ({
    url: `${BASE}/${safeSitemapUrl(entry.slug)}`,
    lastModified: new Date(entry.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...entryRoutes];
}
