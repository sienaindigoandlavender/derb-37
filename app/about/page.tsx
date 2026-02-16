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
        <p>I live in a 300-year-old house in the Marrakech medina. It sits in the Ksour quarter, near Jemaa el Fna, on a quiet derb where the neighbours know each other&apos;s bread by shape. The courtyard has a fountain and the kitchen smells like cumin and cinnamon and whatever I&apos;m experimenting with that week.</p>

        <p>I came to Morocco eleven years ago. I stayed because the food was extraordinary, the light was extraordinary, and the house wouldn&apos;t let me leave.</p>

        <p>This is a journal about what I cook and what life looks like from inside these walls. My kitchen is a crossroads — Chinese and Mauritian and Canadian and everywhere I&apos;ve lived, filtered through whatever is at the souk that morning. Sometimes there are recipes. Sometimes it&apos;s just what the courtyard looked like at six am with the steam coming off my tea.</p>

        <p>The house also welcomes guests. If you&apos;re curious about that, you can find more at <a href="https://riaddisiena.com" target="_blank" rel="noopener noreferrer">riaddisiena.com</a>.</p>
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-sm text-secondary">
          <strong className="text-ink">Jacqueline</strong><br />
          37 Derb Fhal Zfriti, Ksour, Marrakech
        </p>
      </div>

      <Newsletter />
    </div>
  );
}
