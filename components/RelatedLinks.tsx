import Link from 'next/link';
import type { Entry } from '@/lib/content';
import { pillarShort, formatEntryDate } from '@/lib/content';

export default function RelatedLinks({
  entries,
  eyebrow = 'Related elsewhere',
  intro,
}: {
  entries: Entry[];
  eyebrow?: string;
  intro?: string;
}) {
  if (!entries.length) return null;

  return (
    <section className="mt-14 pt-10 border-t border-border" aria-labelledby="related-heading">
      <header className="text-center mb-7">
        <p id="related-heading" className="eyebrow mb-2">
          {eyebrow}
        </p>
        {intro && (
          <p className="font-display italic text-secondary text-[16px] max-w-md mx-auto">
            {intro}
          </p>
        )}
      </header>

      <ul className="max-w-[620px] mx-auto space-y-5 list-none">
        {entries.map((e) => (
          <li key={e.id}>
            <Link href={`/${e.slug}`} className="block group">
              <p className="font-sc text-[12px] tracking-[0.22em] uppercase text-secondary mb-1">
                {pillarShort(e.pillar)} · {formatEntryDate(e.entry_date)}
              </p>
              <p className="font-display italic text-ink text-[22px] leading-snug group-hover:text-secondary">
                {e.title}
              </p>
              {e.excerpt && (
                <p className="font-serif text-[15px] leading-[1.6] text-body mt-1">
                  {e.excerpt}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
