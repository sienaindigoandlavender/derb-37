import Link from 'next/link';
import { formatEntryDateLong } from '@/lib/content';

export default function Byline({ entryDate }: { entryDate: string }) {
  return (
    <p className="text-center font-sc text-[11.5px] tracking-[0.24em] uppercase text-secondary mt-1 mb-7">
      <span>By </span>
      <Link
        href="/about"
        rel="author"
        className="font-semibold text-ink hover:text-secondary"
      >
        J. Ng
      </Link>
      <span aria-hidden className="mx-2 text-light">·</span>
      <span>Derb 37, Marrakech</span>
      <span aria-hidden className="mx-2 text-light">·</span>
      <time dateTime={entryDate}>{formatEntryDateLong(entryDate)}</time>
    </p>
  );
}
