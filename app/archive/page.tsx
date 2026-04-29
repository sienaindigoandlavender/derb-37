import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPublishedEntries, formatEntryDateLong, pillarShort } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Every letter from Derb 37, in order.',
};

export default async function ArchivePage() {
  const entries = await getAllPublishedEntries();

  const grouped = entries.reduce<Record<string, typeof entries>>((acc, e) => {
    const year = e.entry_date.slice(0, 4);
    (acc[year] ??= []).push(e);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="content-column pt-4 pb-12">
      <header className="text-center mb-10">
        <p className="post-category mb-6">The whole journal</p>
        <h1 className="post-title">Archive</h1>
      </header>

      {years.length === 0 && (
        <p className="text-center italic text-secondary py-20">No letters yet.</p>
      )}

      {years.map((year) => (
        <section key={year} className="mb-14">
          <h2 className="text-center font-serif text-[28px] mb-6 tracking-[0.08em]">
            {year}
          </h2>
          <ul className="divide-y divide-border">
            {grouped[year].map((entry) => (
              <li key={entry.id} className="py-4 flex items-baseline gap-4">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted w-32 shrink-0 hidden sm:inline-block">
                  {formatEntryDateLong(entry.entry_date)}
                </span>
                <div className="flex-1">
                  <Link href={`/${entry.slug}`} className="hover:text-muted transition-colors">
                    <span className="font-serif text-[18px] text-ink">
                      {entry.title}
                    </span>
                  </Link>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted block sm:hidden mt-1">
                    {formatEntryDateLong(entry.entry_date)} · {pillarShort(entry.pillar)}
                  </span>
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted shrink-0 hidden sm:inline-block">
                  {pillarShort(entry.pillar)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
