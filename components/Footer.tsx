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
    <footer className="px-6 pt-12 pb-14 border-t border-border mt-12">
      <div className="mx-auto max-w-[640px] text-center">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8">
          {FOOTER_NAV.map((item, i) => (
            <Fragment key={item.href}>
              <li>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
              {i < FOOTER_NAV.length - 1 && (
                <li aria-hidden className="text-light">·</li>
              )}
            </Fragment>
          ))}
        </ul>

        <p className="post-category mb-6">Kindred</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-10">
          {KINDRED.map((item, i) => (
            <Fragment key={item.href}>
              <li>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  {item.label}
                </a>
              </li>
              {i < KINDRED.length - 1 && (
                <li aria-hidden className="text-light">·</li>
              )}
            </Fragment>
          ))}
        </ul>

        <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-muted">
          Marrakech · Morocco · MMXXVI
        </p>
      </div>
    </footer>
  );
}
