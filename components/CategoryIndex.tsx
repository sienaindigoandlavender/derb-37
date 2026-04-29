import Link from 'next/link';
import { Fragment } from 'react';
import { CUISINE_CATEGORIES } from '@/lib/content';

export default async function CategoryIndex({
  counts,
  activeSlug,
}: {
  counts: Partial<Record<string, number>>;
  activeSlug?: string;
}) {
  return (
    <nav className="mb-10" aria-label="Cuisine categories">
      <p className="eyebrow text-center mb-4">By cuisine</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 list-none">
        {CUISINE_CATEGORIES.map((cat, i) => {
          const active = activeSlug === cat.slug;
          const count = counts[cat.slug] || 0;
          return (
            <Fragment key={cat.slug}>
              <li>
                <Link
                  href={`/kitchen/${cat.slug}`}
                  className={`nav-link ${active ? '!text-ink underline underline-offset-4 decoration-rust' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {cat.label}
                  {count > 0 && (
                    <span className="ml-1 font-display italic font-normal not-italic text-[10px] text-secondary">
                      ({count})
                    </span>
                  )}
                </Link>
              </li>
              {i < CUISINE_CATEGORIES.length - 1 && (
                <li aria-hidden className="text-light">·</li>
              )}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
}
