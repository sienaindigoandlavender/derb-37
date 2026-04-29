import type { Metadata } from 'next';
import { marked } from 'marked';
import PageHeading from '@/components/PageHeading';
import { TERMS_OF_SERVICE } from '@/lib/nexus';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'How the writing, recipes, and letters at Derb 37 may be used.',
};

export default function TermsPage() {
  const body = TERMS_OF_SERVICE.replace(/^#\s+.+\n/, '');
  const html = marked.parse(body, { async: false }) as string;

  return (
    <>
      <PageHeading eyebrow="The fine print" title="Terms" />
      <div className="px-6 pb-20">
        <div
          className="entry-body [&>p:first-of-type::first-letter]:!float-none [&>p:first-of-type::first-letter]:!text-inherit [&>p:first-of-type::first-letter]:!font-inherit [&>p:first-of-type::first-letter]:!color-inherit [&>p:first-of-type::first-letter]:!m-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
