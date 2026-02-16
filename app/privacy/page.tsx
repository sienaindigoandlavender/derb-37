import { getLegalPage } from '@/lib/data';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export const revalidate = 3600;

export default async function PrivacyPage() {
  const page = await getLegalPage('privacy');

  return (
    <section className="max-w-[780px] mx-auto px-[6%] pt-14 pb-20">
      <h1 className="font-serif text-[2rem] font-normal text-ink mb-8">
        {page?.title || 'Privacy Policy'}
      </h1>
      <div className="prose-entry">
        {page?.content ? (
          <ReactMarkdown>{page.content}</ReactMarkdown>
        ) : (
          <p>Privacy policy coming soon.</p>
        )}
      </div>
    </section>
  );
}
