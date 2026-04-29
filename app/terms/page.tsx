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
    <div className="content-column pt-2 pb-12">
      <header className="text-center mb-9">
        <p className="eyebrow mb-4">The fine print</p>
        <h1 className="font-display italic font-medium text-ink text-[44px] leading-[1.05] tracking-[-0.005em]">
          Terms
        </h1>
        <div className="ornament-rule mt-7 mx-auto max-w-md">
          <span className="ornament">✦</span>
        </div>
      </header>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
