'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HeaderTagine } from '@/components/MedinaIllustrations';

const NAV_LINKS = [
  { href: '/kitchen', label: 'Kitchen' },
  { href: '/culture', label: 'My Morocco' },
  { href: '/behind-the-walls', label: 'Behind the Walls' },
  { href: 'https://riaddisiena.com', label: 'The Riad', external: true },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="pt-10 pb-6">
      {/* Tagine illustration — like Mimi's wreath */}
      <div className="flex justify-center mb-4">
        <HeaderTagine className="text-[#555]" />
      </div>

      {/* Site name — BLACK, bold caps, like MIMI THORISSON */}
      <div className="text-center mb-6">
        <Link href="/" className="inline-block">
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '36px',
            fontWeight: 'bold',
            letterSpacing: '0.14em',
            color: '#222',
            textTransform: 'uppercase',
          }}>
            Derb 37
          </h1>
        </Link>
      </div>

      {/* Nav — horizontal links with line above */}
      <nav className="text-center border-t border-[#ddd] pt-5 max-w-[600px] mx-auto">
        <ul className="hidden md:flex justify-center gap-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {(link as any).external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className={`nav-link ${pathname === link.href || pathname.startsWith(link.href + '/') ? '!text-[#222]' : ''}`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden nav-link"
          aria-label="Menu"
        >
          Menu
        </button>

        {mobileOpen && (
          <div className="md:hidden mt-4 space-y-3">
            {NAV_LINKS.map((link) => (
              (link as any).external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block nav-link"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block nav-link ${pathname === link.href ? '!text-[#222]' : ''}`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
