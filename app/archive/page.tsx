import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeading from '@/components/PageHeading';
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
    <>
      <PageHeading
        eyebrow="The whole journal"
        title="Archive"
        subtitle="Every letter, in order, by date."
      />
      <div className="px-6 pb-24 mx-auto max-w-3xl">
        {years.length === 0 && (
          <p className="text-center font-display italic text-secondary text-[19px]">
            No letters yet.
          </p>
        )}
        {years.map((year) => (
          <section key={year} className="mb-16">
            <h2 className="display-headline italic text-[34px] mb-6 text-center">
              {year}
            </h2>
            <ul className="divide-y divide-rule">
              {grouped[year].map((entry) => (
                <li key={entry.id} className="py-5 flex items-baseline gap-6">
                  <span className="font-sc text-[10.5px] tracking-[0.32em] uppercase text-secondary w-32 shrink-0">
                    {formatEntryDateLong(entry.entry_date)}
                  </span>
                  <div className="flex-1">
                    <Link href={`/${entry.slug}`} className="hover:text-rust transition-colors">
                      <span className="font-display text-[20px] text-ink">
                        {entry.title}
                      </span>
                    </Link>
                  </div>
                  <span className="font-sc text-[10.5px] tracking-[0.32em] uppercase text-rust shrink-0">
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
