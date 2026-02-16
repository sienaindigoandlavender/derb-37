import type { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Derb 37 — a food and life journal from inside a 300-year-old house in the Marrakech medina.',
};

export default function AboutPage() {
  return (
    <div className="content-column pt-4 pb-12">
      <div className="post-body">
        <p>This is a journal from a house. The house is 300 years old. It sits in the Ksour quarter of the Marrakech medina, near Jemaa el Fna, on a quiet derb where the neighbors know each other&apos;s bread by shape.</p>

        <p>I came to Morocco eleven years ago. Not as a tourist, not with a business plan. I came to understand something — about craft, about time, about how a culture holds its knowledge. I&apos;m still understanding it. The house is where that happens.</p>

        <p>What you&apos;ll find here is what life inside these walls actually looks like. The kitchen, mostly — because food is how this house speaks. My recipes are the crossroads kind: Chinese and Mauritian and Canadian and everywhere I&apos;ve lived, filtered through what&apos;s at the Marrakech souk that morning.</p>

        <p>You&apos;ll also find the courtyard, the zellige, the tadelakt, the way light moves through the house at different hours. The cannon at sunset during Ramadan. The bread oven at the end of the street. The medina waking up.</p>

        <p>I don&apos;t show my face here. You&apos;ll know me through the cooking and the writing.</p>

        <p>The house also welcomes guests. If you&apos;re curious about that, you can find more at <a href="https://riaddisiena.com" target="_blank" rel="noopener noreferrer">riaddisiena.com</a>.</p>
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-sm text-secondary">
          <strong className="text-ink">Jacqueline</strong><br />
          37 Derb Fhal Zfriti, Ksour, Marrakech.
        </p>
      </div>

      <Newsletter />
    </div>
  );
}
