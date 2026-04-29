'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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
    <header className="pt-9 pb-4">
      <div className="flex justify-center mb-3">
        <HeaderTagine className="text-ink" />
      </div>

      <div className="text-center mb-1">
        <Link href="/" className="inline-block" aria-label="Derb 37 — home">
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '34px',
              fontWeight: 'bold',
              letterSpacing: '0.13em',
              color: '#0a0a0a',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Derb 37
          </p>
        </Link>
      </div>

      <p className="text-center text-[10.5px] tracking-[0.22em] uppercase text-secondary font-sans mb-5">
        notes from a house in the medina
      </p>

      <nav className="text-center border-t border-border pt-4 max-w-[640px] mx-auto px-6" aria-label="Primary">
        <ul className="hidden md:flex justify-center gap-7 list-none">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href + '/'));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${active ? '!text-ink' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
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
