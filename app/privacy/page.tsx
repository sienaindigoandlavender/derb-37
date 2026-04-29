import type { Metadata } from 'next';
import { marked } from 'marked';
import PageHeading from '@/components/PageHeading';
import { PRIVACY_POLICY } from '@/lib/nexus';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Derb 37 handles email addresses, analytics, and your privacy.',
};

export default function PrivacyPage() {
  // Strip the leading H1 so PageHeading can own the title.
  const body = PRIVACY_POLICY.replace(/^#\s+.+\n/, '');
  const html = marked.parse(body, { async: false }) as string;

  return (
    <>
      <PageHeading eyebrow="The fine print" title="Privacy" />
      <div className="px-6 pb-20">
        <div
          className="entry-body [&>p:first-of-type::first-letter]:!float-none [&>p:first-of-type::first-letter]:!text-inherit [&>p:first-of-type::first-letter]:!font-inherit [&>p:first-of-type::first-letter]:!color-inherit [&>p:first-of-type::first-letter]:!m-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
