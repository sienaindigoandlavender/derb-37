import { getLegalPage } from '@/lib/data';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
};

export const revalidate = 3600;

export default async function TermsPage() {
  const page = await getLegalPage('terms');

  return (
    <section className="max-w-[780px] mx-auto px-[6%] pt-14 pb-20">
      <h1 className="font-serif text-[2rem] font-normal text-ink mb-8">
        {page?.title || 'Terms of Use'}
      </h1>
      <div className="prose-entry">
        {page?.content ? (
          <ReactMarkdown>{page.content}</ReactMarkdown>
        ) : (
          <p>Terms of use coming soon.</p>
        )}
      </div>
    </section>
  );
}
