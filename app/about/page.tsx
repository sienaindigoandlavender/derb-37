import type { Metadata } from 'next';
import { canonical, breadcrumbsJsonLd } from '@/lib/seo';

const DESC =
  'Derb 37 — short notes from a 300-year-old riad in the Marrakech medina, by Jacqueline. A kitchen, mostly. And a life, around the kitchen.';

export const metadata: Metadata = {
  title: 'About',
  description: DESC,
  alternates: { canonical: canonical('/about') },
  openGraph: {
    type: 'profile',
    url: canonical('/about'),
    title: 'About — Derb 37',
    description: DESC,
  },
  twitter: { title: 'About — Derb 37', description: DESC },
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
      <div className="content-column pt-2 pb-12">
        <header className="text-center mb-9">
          <p className="eyebrow mb-4">A note from the writer</p>
          <h1 className="font-display italic font-medium text-ink text-[48px] leading-[1.05] tracking-[-0.005em]">
            About
          </h1>
          <div className="ornament-rule mt-7 mx-auto max-w-md">
            <span className="ornament">✦</span>
          </div>
        </header>

        <figure className="text-center mb-8">
          <blockquote className="!border-0 !pl-0 !my-0 font-display italic text-ink text-[22px] leading-snug">
            “I had a farm in Africa, at the foot of the Ngong Hills.”
          </blockquote>
          <figcaption className="eyebrow mt-3 inline-block">
            Out of Africa, Isak Dinesen
          </figcaption>
        </figure>

        <div className="post-body">
          <p>
            I read those words as a young woman, already daydreaming — mostly
            about Robert Redford washing my hair on a verandah somewhere. I
            read them again, decades later, and finally understood the ache
            underneath the gold light. The losses. The thing that was never
            really hers to lose.
          </p>
          <p>I don&apos;t have a farm in Kenya.</p>
          <p>
            I have one in Morocco. And a riad — three hundred years old, in
            a quarter of Marrakech where the streets are too narrow for cars
            and the light moves through the courtyard like it has somewhere
            to be. The allure is different. No savannah, no lions. Just a
            kitchen that runs on Zahra&apos;s instincts, a fountain that
            talks to itself at night, Siena asleep somewhere she
            shouldn&apos;t be, and a cat that has opinions about her.
          </p>
          <p>
            A riad turns inward by design. Blank walls to the street,
            everything beautiful held in the centre — the courtyard, the
            fountain, the sky framed in a square. You don&apos;t see a riad
            from the outside. You walk into it. The life happens facing in.
          </p>
          <p>
            The years here have taken the same shape. Less performing, more
            paying attention. Less out there, more in here. A journey
            within, aligned with the architecture.
          </p>
          <p>
            This is where I write from. Derb 37 — the address, and the
            name.
          </p>
          <p>
            Not a travel blog. Not a riad blog. A kitchen, mostly. And a
            life, around the kitchen.
          </p>
        </div>

        <div className="mt-10 pt-6 text-center border-t border-border">
          <p className="font-display italic text-[20px] text-ink mb-1">
            — Jacqueline
          </p>
          <p className="eyebrow">Derb 37 · Marrakech</p>
        </div>
      </div>
    </>
  );
}
