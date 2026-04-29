import type { Metadata } from 'next';
import { marked } from 'marked';
import { TERMS_OF_SERVICE } from '@/lib/nexus';
import { canonical } from '@/lib/seo';

const DESC = 'How the writing, recipes, and photography on Derb 37 may be used.';

export const metadata: Metadata = {
  title: 'Terms',
  description: DESC,
  alternates: { canonical: canonical('/terms') },
  openGraph: {
    type: 'website',
    url: canonical('/terms'),
    title: 'Terms',
    description: DESC,
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const body = TERMS_OF_SERVICE.replace(/^#\s+.+\n/, '');
  const html = marked.parse(body, { async: false }) as string;

  return (
    <div className="content-column pt-2 pb-10">
      <header className="text-center mb-8">
        <p className="post-category mb-4">The fine print</p>
        <h1 className="post-title">Terms</h1>
      </header>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
