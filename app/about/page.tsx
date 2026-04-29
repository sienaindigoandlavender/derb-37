import type { Metadata } from 'next';
import Link from 'next/link';
import { canonical, breadcrumbsJsonLd } from '@/lib/seo';

const DESC =
  'Derb 37 is a small journal of notes and recipes from a 300-year-old riad in the Marrakech medina, written by Jacqueline Ng.';

export const metadata: Metadata = {
  title: 'About',
  description: DESC,
  alternates: { canonical: canonical('/about') },
  openGraph: {
    type: 'profile',
    url: canonical('/about'),
    title: 'About — Jacqueline Ng',
    description: DESC,
  },
  twitter: { title: 'About — Jacqueline Ng', description: DESC },
};

export default function AboutPage() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="content-column pt-2 pb-10">
        <header className="text-center mb-8">
          <p className="post-category mb-4">A note from the writer</p>
          <h1 className="post-title">About</h1>
        </header>

        <div className="post-body">
          <p>
            I&apos;m Jacqueline. I live in a 300-year-old house with a green door
            I painted myself, on a small derb in the Ksour quarter of the
            Marrakech medina.
          </p>
          <p>
            I cook. I write short notes about what I cook. The kitchen is a
            crossroads — Chinese grandmother, Mauritian summers, Canadian
            winters, Moroccan everything-else — and the cooking is what comes
            of all of that. The recipes go in because I want to remember
            them. The notes go in because I want to remember the days they
            came from.
          </p>
          <p>
            Three pillars: <em>Kitchen</em>, <em>Morocco</em>, <em>Travel</em>.
            Kitchen is most of it. Morocco is what I see when I look up from
            the kitchen. Travel is when I leave for a week and bring something
            home.
          </p>
          <p>
            The house also welcomes guests. If you want to come and stay, the
            riad is at{' '}
            <Link href="https://riaddisiena.com" target="_blank" rel="noopener noreferrer">
              riaddisiena.com
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 pt-5 text-center border-t border-border">
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-ink">
            — Jacqueline · Derb 37 · Marrakech
          </p>
        </div>
      </div>
    </>
  );
}
