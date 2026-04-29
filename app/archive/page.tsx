import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllPublishedEntries,
  formatEntryDateLong,
  pillarShort,
} from '@/lib/content';
import { canonical, breadcrumbsJsonLd } from '@/lib/seo';

export const revalidate = 300;

const DESC = 'Every note from Derb 37, in date order — kitchen, Morocco, travel.';

export const metadata: Metadata = {
  title: 'Archive',
  description: DESC,
  alternates: { canonical: canonical('/archive') },
  openGraph: {
    type: 'website',
    url: canonical('/archive'),
    title: 'Archive',
    description: DESC,
  },
  twitter: { title: 'Archive', description: DESC },
};

export default async function ArchivePage() {
  const entries = await getAllPublishedEntries();

  const grouped = entries.reduce<Record<string, typeof entries>>((acc, e) => {
    const year = e.entry_date.slice(0, 4);
    (acc[year] ??= []).push(e);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const breadcrumbs = breadcrumbsJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Archive', path: '/archive' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="content-column pt-2 pb-10">
        <header className="text-center mb-8">
          <p className="post-category mb-4">The whole journal</p>
          <h1 className="post-title">Archive</h1>
        </header>

        {years.length === 0 && (
          <p className="text-center italic text-secondary py-16">No notes yet.</p>
        )}

        {years.map((year) => (
          <section key={year} className="mb-10">
            <h2 className="text-center font-serif text-[24px] mb-4 tracking-[0.08em] text-ink">
              {year}
            </h2>
            <ul className="divide-y divide-border">
              {grouped[year].map((entry) => (
                <li key={entry.id} className="py-3 flex items-baseline gap-4">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-secondary w-32 shrink-0 hidden sm:inline-block">
                    {formatEntryDateLong(entry.entry_date)}
                  </span>
                  <div className="flex-1">
                    <Link href={`/${entry.slug}`} className="hover:text-secondary transition-colors">
                      <span className="font-serif text-[17px] text-ink">
                        {entry.title}
                      </span>
                    </Link>
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-secondary block sm:hidden mt-1">
                      {formatEntryDateLong(entry.entry_date)} · {pillarShort(entry.pillar)}
                    </span>
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-secondary shrink-0 hidden sm:inline-block">
                    {pillarShort(entry.pillar)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
