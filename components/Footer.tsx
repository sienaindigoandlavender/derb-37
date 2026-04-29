import Link from 'next/link';
import { Fragment } from 'react';

const FOOTER_NAV = [
  { href: '/kitchen', label: 'Kitchen' },
  { href: '/morocco', label: 'Morocco' },
  { href: '/travel', label: 'Travel' },
  { href: '/archive', label: 'Archive' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/about', label: 'About' },
];

const KINDRED = [
  { href: 'https://riaddisiena.com', label: 'Riad di Siena' },
  { href: 'https://zfriti.com', label: 'Zfriti' },
  { href: 'https://slowmorocco.com', label: 'Slow Morocco' },
  { href: 'https://derb.so', label: 'Derb' },
  { href: 'https://darija.io', label: 'Darija' },
  { href: 'https://tamazight.io', label: 'Tamazight' },
  { href: 'https://ksour.org', label: 'Ksour' },
  { href: 'https://tamazgha.africa', label: 'Tamazgha' },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="px-6 pt-10 pb-7 mx-auto max-w-[680px] text-center">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-9">
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

        <ul className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 opacity-80">
          {KINDRED.map((item, i) => (
            <Fragment key={item.href}>
              <li>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kindred-link"
                >
                  {item.label}
                </a>
              </li>
              {i < KINDRED.length - 1 && (
                <li aria-hidden className="text-light text-[9px]">·</li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>

      <div className="border-t border-border bg-paper">
        <div className="px-6 py-4 mx-auto max-w-[680px] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sc text-[13px] tracking-[0.22em] uppercase text-black font-semibold">
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
