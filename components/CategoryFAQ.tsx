import type { FAQ } from '@/lib/content';

export default function CategoryFAQ({
  faqs,
  categoryLabel,
}: {
  faqs: FAQ[];
  categoryLabel: string;
}) {
  if (!faqs.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: `${categoryLabel} — Frequently Asked Questions`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <section className="mt-14 pt-10 border-t border-border" aria-labelledby="faq-heading">
      <header className="text-center mb-8">
        <p id="faq-heading" className="eyebrow mb-3">
          Questions
        </p>
        <p className="font-display italic text-ink text-[18px] max-w-md mx-auto">
          On {categoryLabel.toLowerCase()}.
        </p>
      </header>

      <dl className="max-w-[620px] mx-auto space-y-7">
        {faqs.map((f, i) => (
          <div key={i}>
            <dt className="font-display italic text-ink text-[22px] leading-snug mb-1.5">
              {f.q}
            </dt>
            <dd className="font-serif text-[17px] leading-[1.7] text-body">
              {f.a}
            </dd>
          </div>
        ))}
      </dl>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
