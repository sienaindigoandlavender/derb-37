import Link from 'next/link';
import { Fragment } from 'react';

const FOOTER_NAV = [
  { href: '/kitchen', label: 'Kitchen' },
  { href: '/morocco', label: 'Morocco' },
  { href: '/travel', label: 'Travel' },
  { href: '/archive', label: 'Archive' },
  { href: '/about', label: 'About' },
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
    <footer className="mt-10 border-t border-border">
      <div className="px-6 pt-9 pb-6 mx-auto max-w-[640px] text-center">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-7">
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

        <p className="post-category mb-5">Kindred</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-2">
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
      </div>

      <div className="border-t border-border bg-white">
        <div className="px-6 py-4 mx-auto max-w-[640px] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-[11px] tracking-[0.18em] uppercase text-ink">
          <span>Copyright 2026, Derb 37</span>
          <span aria-hidden className="text-light">|</span>
          <Link href="/privacy" className="hover:text-secondary">Privacy</Link>
          <span aria-hidden className="text-light">/</span>
          <Link href="/terms" className="hover:text-secondary">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
