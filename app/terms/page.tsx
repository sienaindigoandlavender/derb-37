import type { Metadata } from 'next';
import { marked } from 'marked';
import { TERMS_OF_SERVICE } from '@/lib/nexus';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'How the writing, recipes, and letters at Derb 37 may be used.',
};

export default function TermsPage() {
  const body = TERMS_OF_SERVICE.replace(/^#\s+.+\n/, '');
  const html = marked.parse(body, { async: false }) as string;

  return (
    <div className="content-column pt-4 pb-12">
      <header className="text-center mb-10">
        <p className="post-category mb-6">The fine print</p>
        <h1 className="post-title">Terms</h1>
      </header>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
