import type { Entry } from '@/lib/content';
import ArchiveEntry from './ArchiveEntry';

export default function ArchiveGrid({
  entries,
  eyebrow,
  title,
}: {
  entries: Entry[];
  eyebrow?: string;
  title?: string;
}) {
  if (!entries.length) return null;
  return (
    <section className="px-6 py-16 md:py-24">
      {(eyebrow || title) && (
        <header className="text-center mb-14">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          {title && (
            <h2 className="display-headline italic text-[36px] md:text-[44px]">
              {title}
            </h2>
          )}
          <div className="ornament-rule mt-7 mx-auto max-w-md">
            <span className="ornament">✦</span>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
        {entries.map((entry) => (
          <ArchiveEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
