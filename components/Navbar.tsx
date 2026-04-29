'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, Fragment } from 'react';
import { HeaderTagine } from '@/components/MedinaIllustrations';

const NAV_LINKS = [
  { href: '/kitchen', label: 'Kitchen' },
  { href: '/morocco', label: 'Morocco' },
  { href: '/travel', label: 'Travel' },
  { href: '/archive', label: 'Archive' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="pt-12 pb-7">
      <div className="flex justify-center mb-3">
        <HeaderTagine className="text-[#3a3a3a]" />
      </div>

      <div className="text-center">
        <Link href="/" className="inline-block" aria-label="Derb 37 — home">
          <p className="wordmark">
            Derb <span className="amp">37</span>
          </p>
        </Link>
      </div>

      <p className="text-center font-display italic text-secondary text-[18px] mt-3 mb-7">
        a journal from a house in the medina
      </p>

      <nav
        className="text-center max-w-[680px] mx-auto px-6 border-t border-border pt-5"
        aria-label="Primary"
      >
        <ul className="hidden md:flex flex-wrap justify-center items-center gap-x-3 gap-y-2 list-none">
          {NAV_LINKS.map((link, i) => {
            const active =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href + '/'));
            return (
              <Fragment key={link.href}>
                <li>
                  <Link
                    href={link.href}
                    className={`nav-link px-1 ${active ? '!text-ink' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
                {i < NAV_LINKS.length - 1 && (
                  <li aria-hidden className="text-light">·</li>
                )}
              </Fragment>
            );
          })}
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden nav-link"
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>

        {mobileOpen && (
          <div className="md:hidden mt-3 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block nav-link ${pathname === link.href ? '!text-ink' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
