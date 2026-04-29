import type { Metadata } from 'next';
import { marked } from 'marked';
import { PRIVACY_POLICY } from '@/lib/nexus';
import { canonical } from '@/lib/seo';

const DESC = 'How Derb 37 handles analytics and your privacy.';

export const metadata: Metadata = {
  title: 'Privacy',
  description: DESC,
  alternates: { canonical: canonical('/privacy') },
  openGraph: {
    type: 'website',
    url: canonical('/privacy'),
    title: 'Privacy',
    description: DESC,
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const body = PRIVACY_POLICY.replace(/^#\s+.+\n/, '');
  const html = marked.parse(body, { async: false }) as string;

  return (
    <div className="content-column pt-2 pb-12">
      <header className="text-center mb-9">
        <p className="eyebrow mb-4">The fine print</p>
        <h1 className="font-display italic font-medium text-ink text-[44px] leading-[1.05] tracking-[-0.005em]">
          Privacy
        </h1>
        <div className="ornament-rule mt-7 mx-auto max-w-md">
          <span className="ornament">✦</span>
        </div>
      </header>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
