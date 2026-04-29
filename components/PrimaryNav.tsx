import Link from 'next/link';
import { Fragment } from 'react';

const ITEMS = [
  { href: '/kitchen', label: 'Kitchen' },
  { href: '/morocco', label: 'Morocco' },
  { href: '/travel', label: 'Travel' },
  { href: '/archive', label: 'Archive' },
  { href: '/about', label: 'About' },
  { href: '/letters', label: 'Letters' },
];

export default function PrimaryNav() {
  return (
    <nav className="px-6 pb-12">
      <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 font-sc text-[12px] tracking-[0.32em] uppercase text-ink-soft">
        {ITEMS.map((item, i) => (
          <Fragment key={item.href}>
            <li>
              <Link href={item.href} className="hover:text-rust transition-colors px-1.5 py-1">
                {item.label}
              </Link>
            </li>
            {i < ITEMS.length - 1 && <li aria-hidden className="text-rule">·</li>}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
}
