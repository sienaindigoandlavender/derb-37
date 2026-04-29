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
  { href: '/letters', label: 'Letters' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="pt-12 pb-6">
      {/* Tagine illustration — like Mimi's wreath */}
      <div className="flex justify-center mb-4">
        <HeaderTagine className="text-[#555]" />
      </div>

      {/* Site name — BLACK, bold caps, like MIMI THORISSON */}
      <div className="text-center mb-2">
        <Link href="/" className="inline-block">
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '36px',
              fontWeight: 'bold',
              letterSpacing: '0.14em',
              color: '#222',
              textTransform: 'uppercase',
            }}
          >
            Derb 37
          </h1>
        </Link>
      </div>

      <p className="text-center text-[12px] tracking-[0.18em] uppercase text-muted font-sans mb-6">
        a journal from a house in the medina
      </p>

      {/* Nav — horizontal links with line above */}
      <nav className="text-center border-t border-border pt-5 max-w-[640px] mx-auto px-6">
        <ul className="hidden md:flex justify-center gap-8 list-none">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href + '/'));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${active ? '!text-ink' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden nav-link"
          aria-label="Menu"
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>

        {mobileOpen && (
          <div className="md:hidden mt-4 space-y-3">
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
