import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // AI crawlers — explicit allow for knowledge endpoints
      { userAgent: 'GPTBot', allow: ['/api/knowledge/', '/api/glossary'] },
      { userAgent: 'ChatGPT-User', allow: ['/api/knowledge/', '/api/glossary'] },
      { userAgent: 'OAI-SearchBot', allow: ['/api/knowledge/', '/api/glossary'] },
      { userAgent: 'anthropic-ai', allow: ['/api/knowledge/', '/api/glossary'] },
      { userAgent: 'Claude-Web', allow: ['/api/knowledge/', '/api/glossary'] },
      { userAgent: 'PerplexityBot', allow: ['/api/knowledge/', '/api/glossary'] },
      { userAgent: 'Google-Extended', allow: ['/api/knowledge/', '/api/glossary'] },
      { userAgent: 'Bingbot', allow: ['/api/knowledge/', '/api/glossary'] },
    ],
    sitemap: 'https://derb37.com/sitemap.xml',
  };
}
