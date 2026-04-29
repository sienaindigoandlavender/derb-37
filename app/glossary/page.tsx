import type { Metadata } from 'next';
import Link from 'next/link';
import { GLOSSARY, GLOSSARY_GROUPS } from '@/lib/glossary';
import { breadcrumbsJsonLd, canonical, SITE_URL } from '@/lib/seo';

const DESC =
  'A glossary of Moroccan cuisine and medina terms — harira, tagine, smen, ras el hanout, msemen, riad, derb, mellah, iftar — defined cleanly, written from inside the medina by J. Ng.';

export const metadata: Metadata = {
  title: 'Glossary',
  description: DESC,
  alternates: { canonical: canonical('/glossary') },
  openGraph: {
    type: 'website',
    url: canonical('/glossary'),
    title: 'Glossary · Derb 37',
    description: DESC,
  },
  twitter: { title: 'Glossary · Derb 37', description: DESC },
  keywords: [
    'Moroccan cuisine glossary',
    'tagine definition',
    'harira definition',
    'ras el hanout',
    'smen',
    'msemen',
    'riad meaning',
    'derb meaning',
    'medina',
    'mellah',
    'iftar',
  ],
};

export default function GlossaryPage() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Glossary', path: '/glossary' },
  ]);

  // schema.org DefinedTermSet — every glossary entry is a DefinedTerm.
  // Lets AI engines lift definitions back to derb37 cleanly.
  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}/glossary#set`,
    name: 'Glossary of Moroccan cuisine and medina terms',
    inDefinedTermSet: `${SITE_URL}/glossary`,
    hasDefinedTerm: GLOSSARY.map((g) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE_URL}/glossary#${g.term.toLowerCase().replace(/\s+/g, '-')}`,
      name: g.term,
      alternateName: g.also,
      inDefinedTermSet: `${SITE_URL}/glossary#set`,
      termCode: g.term.toLowerCase().replace(/\s+/g, '-'),
      description: g.definition,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }}
      />
      <div className="content-column pt-2 pb-12">
        <header className="text-center mb-10">
          <p className="eyebrow mb-4">A reference</p>
          <h1 className="font-display italic font-medium text-ink text-[44px] leading-[1.05] tracking-[-0.005em]">
            Glossary
          </h1>
          <p className="font-display italic text-ink text-[18px] mt-4 max-w-md mx-auto leading-snug">
            The Moroccan cuisine and medina words that turn up in the notes —
            defined plainly, in the same voice as the rest of the journal.
          </p>
          <div className="ornament-rule mt-7 mx-auto max-w-md">
            <span className="ornament">✦</span>
          </div>
        </header>

        {GLOSSARY_GROUPS.map((group) => {
          const items = GLOSSARY.filter((g) => g.group === group.slug);
          if (!items.length) return null;
          return (
            <section key={group.slug} className="mb-12">
              <header className="text-center mb-7">
                <p className="eyebrow mb-2">{group.label}</p>
                <p className="font-display italic text-secondary text-[16px]">
                  {group.intro}
                </p>
              </header>

              <dl className="max-w-[640px] mx-auto space-y-7">
                {items.map((g) => {
                  const id = g.term.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <div key={id} id={id}>
                      <dt className="font-display italic text-ink text-[24px] leading-snug">
                        {g.arabic ? (
                          <span lang="ar-Latn">{g.term}</span>
                        ) : (
                          g.term
                        )}
                        {g.also && (
                          <span className="text-secondary text-[18px] not-italic font-normal">
                            {' '}
                            ·{' '}
                            <span lang="ar-Latn">{g.also}</span>
                          </span>
                        )}
                      </dt>
                      <dd className="font-serif text-[17.5px] leading-[1.7] text-body mt-1.5">
                        {g.definition}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          );
        })}

        <div className="mt-10 pt-6 text-center border-t border-border">
          <Link href="/kitchen" className="comment-link">
            ← The kitchen
          </Link>
        </div>
      </div>
    </>
  );
}
