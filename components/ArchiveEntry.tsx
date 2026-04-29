import Link from 'next/link';
import type { Entry } from '@/lib/content';
import { formatEntryDate, pillarShort } from '@/lib/content';

export default function ArchiveEntry({ entry }: { entry: Entry }) {
  return (
    <article className="text-center">
      <Link href={`/${entry.slug}`} className="block group">
        {entry.hero_image && (
          <div className="hero-mount mb-6 aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.hero_image}
              alt={entry.title}
              loading="lazy"
              className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
            />
          </div>
        )}
        <p className="meta-line mb-3">
          {formatEntryDate(entry.entry_date)}
        </p>
        <h3 className="display-headline text-[24px] md:text-[26px] mb-2 px-4 group-hover:text-rust transition-colors">
          {entry.title}
        </h3>
        <p className="font-sc text-[10.5px] tracking-[0.32em] uppercase text-rust">
          {pillarShort(entry.pillar)}
        </p>
      </Link>
    </article>
  );
}
