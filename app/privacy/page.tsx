import type { Metadata } from 'next';
import { marked } from 'marked';
import { PRIVACY_POLICY } from '@/lib/nexus';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Derb 37 handles email addresses, analytics, and your privacy.',
};

export default function PrivacyPage() {
  const body = PRIVACY_POLICY.replace(/^#\s+.+\n/, '');
  const html = marked.parse(body, { async: false }) as string;

  return (
    <div className="content-column pt-4 pb-12">
      <header className="text-center mb-10">
        <p className="post-category mb-6">The fine print</p>
        <h1 className="post-title">Privacy</h1>
      </header>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
