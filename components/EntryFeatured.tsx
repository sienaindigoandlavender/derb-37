import type { Entry } from '@/lib/content';
import { formatEntryDate, pillarShort } from '@/lib/content';

function emphasiseHeadline(title: string) {
  // Italicise the last word for editorial emphasis.
  const parts = title.trim().split(/\s+/);
  if (parts.length < 2) return <>{title}</>;
  const last = parts.pop();
  return (
    <>
      {parts.join(' ')}{' '}
      <em className="italic text-rust font-display">{last}</em>
    </>
  );
}

export default function EntryFeatured({ entry, headingLevel = 'h2' }: { entry: Entry; headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel;
  return (
    <section className="px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="meta-line flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-7">
          <span>{pillarShort(entry.pillar)}</span>
          <span className="text-rule">·</span>
          <span>{formatEntryDate(entry.entry_date)}</span>
          <span className="text-rule">·</span>
          <span>Derb 37, Marrakech</span>
        </p>

        <Heading className="display-headline text-[40px] md:text-[58px] leading-[1.06] mb-6">
          {emphasiseHeadline(entry.title)}
        </Heading>

        {entry.subtitle && (
          <p className="font-display italic text-secondary text-[19px] md:text-[22px] max-w-xl mx-auto leading-snug mb-10">
            {entry.subtitle}
          </p>
        )}
      </div>

      {entry.hero_image && (
        <figure className="mx-auto max-w-[820px] mt-2 mb-12">
          <div className="hero-mount">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={entry.hero_image} alt={entry.title} loading="eager" />
          </div>
          {entry.hero_caption && (
            <figcaption className="mt-4 text-center font-display italic text-secondary text-[15px]">
              {entry.hero_caption}
            </figcaption>
          )}
        </figure>
      )}
    </section>
  );
}
