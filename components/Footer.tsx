import Link from 'next/link';
import { Fragment } from 'react';

const FOOTER_NAV = [
  { href: '/kitchen', label: 'Kitchen' },
  { href: '/morocco', label: 'Morocco' },
  { href: '/travel', label: 'Travel' },
  { href: '/archive', label: 'Archive' },
  { href: '/about', label: 'About' },
  { href: '/letters', label: 'Letters' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export default function Footer() {
  return (
    <footer className="px-6 pt-14 pb-16 border-t border-rule">
      <div className="mx-auto max-w-3xl text-center">
        <Link href="/" className="inline-block mb-3">
          <span className="display-headline text-[34px]">
            Derb <em className="italic text-rust">37</em>
          </span>
        </Link>
        <p className="font-display italic text-secondary text-[15px] mb-8">
          a journal from a house in the medina
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mb-8 font-sc text-[10.5px] tracking-[0.32em] uppercase text-secondary">
          {FOOTER_NAV.map((item, i) => (
            <Fragment key={item.href}>
              <li>
                <Link href={item.href} className="hover:text-rust transition-colors px-1">
                  {item.label}
                </Link>
              </li>
              {i < FOOTER_NAV.length - 1 && <li aria-hidden className="text-rule">·</li>}
            </Fragment>
          ))}
        </ul>
        <p className="font-sc text-[10.5px] tracking-[0.32em] uppercase text-secondary">
          Marrakech · Morocco · MMXXVI
        </p>
      </div>
    </footer>
  );
}
