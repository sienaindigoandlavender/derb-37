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
      <div className="content-column pt-2 pb-12">
        <header className="text-center mb-10">
          <p className="eyebrow mb-4">The whole journal</p>
          <h1 className="font-display italic font-medium text-ink text-[44px] leading-[1.05] tracking-[-0.005em]">
            Archive
          </h1>
          <div className="ornament-rule mt-7 mx-auto max-w-md">
            <span className="ornament">✦</span>
          </div>
        </header>

        {years.length === 0 && (
          <p className="text-center font-display italic text-secondary py-16 text-[18px]">
            No notes yet.
          </p>
        )}

        {years.map((year) => (
          <section key={year} className="mb-12">
            <h2 className="text-center font-display italic text-[28px] text-ink mb-5">
              {year}
            </h2>
            <ul className="divide-y divide-border">
              {grouped[year].map((entry) => (
                <li key={entry.id} className="py-4 flex items-baseline gap-4">
                  <span className="font-sc text-[10.5px] tracking-[0.32em] uppercase text-secondary w-36 shrink-0 hidden sm:inline-block">
                    {formatEntryDateLong(entry.entry_date)}
                  </span>
                  <div className="flex-1">
                    <Link href={`/${entry.slug}`} className="hover:text-secondary transition-colors">
                      <span className="font-display italic text-[20px] text-ink">
                        {entry.title}
                      </span>
                    </Link>
                    <span className="font-sc text-[10px] tracking-[0.32em] uppercase text-secondary block sm:hidden mt-1">
                      {formatEntryDateLong(entry.entry_date)} · {pillarShort(entry.pillar)}
                    </span>
                  </div>
                  <span className="font-sc text-[10.5px] tracking-[0.32em] uppercase text-rust shrink-0 hidden sm:inline-block">
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
