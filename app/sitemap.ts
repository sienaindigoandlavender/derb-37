import type { MetadataRoute } from 'next';
import { getEntries } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://derb37.com';

  const staticRoutes = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${base}/kitchen`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/culture`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/behind-the-walls`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    // Knowledge APIs for AI discovery
    { url: `${base}/api/knowledge/entries`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.3 },
    { url: `${base}/api/knowledge/recipes`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.3 },
    { url: `${base}/api/glossary`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  const entries = await getEntries();
  const entryRoutes = entries.map((entry) => ({
    url: `${base}/${entry.slug}`,
    lastModified: new Date(entry.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...entryRoutes];
}
