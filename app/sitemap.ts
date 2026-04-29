import type { MetadataRoute } from 'next';
import { getAllPublishedEntries } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

// Defensive: encode `&`, quotes, etc. that broke Slow Morocco's sitemap Feb 2026.
function safeSitemapUrl(slug: string): string {
  return encodeURIComponent(slug).replace(/%2F/g, '/');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries = await getAllPublishedEntries();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/kitchen`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/morocco`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/travel`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/archive`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const entryRoutes: MetadataRoute.Sitemap = entries.map((entry) => ({
    url: `${SITE_URL}/${safeSitemapUrl(entry.slug)}`,
    lastModified: new Date(entry.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...entryRoutes];
}
