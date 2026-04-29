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

const KINDRED = [
  { href: 'https://riaddisiena.com', label: 'Riad di Siena' },
  { href: 'https://slowmorocco.com', label: 'Slow Morocco' },
  { href: 'https://derb.so', label: 'Derb' },
  { href: 'https://darija.io', label: 'Darija' },
  { href: 'https://tamazight.io', label: 'Tamazight' },
  { href: 'https://ksour.org', label: 'Ksour' },
  { href: 'https://tamazgha.africa', label: 'Tamazgha' },
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

        <div className="my-10 ornament-rule mx-auto max-w-md">
          <span className="ornament">✦</span>
        </div>

        <p className="eyebrow mb-5">Kindred</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mb-10 font-sc text-[10.5px] tracking-[0.32em] uppercase text-secondary">
          {KINDRED.map((item, i) => (
            <Fragment key={item.href}>
              <li>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rust transition-colors px-1"
                >
                  {item.label}
                </a>
              </li>
              {i < KINDRED.length - 1 && <li aria-hidden className="text-rule">·</li>}
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
