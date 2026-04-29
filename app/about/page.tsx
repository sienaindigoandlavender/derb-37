import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeading from '@/components/PageHeading';
import Signature from '@/components/Signature';

export const metadata: Metadata = {
  title: 'About',
  description: 'A journal from a 300-year-old house in the Marrakech medina, written by Jacqueline.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeading eyebrow="A note from the writer" title="About" />
      <div className="px-6 pb-12">
        <div className="entry-body">
          <p>
            I live in a house with a green door I painted myself. It is three
            hundred years old. It sits on a small derb in the Ksour quarter
            of the Marrakech medina, close enough to the Koutoubia that I can
            hear the call to prayer over my morning tea.
          </p>
          <p>
            I cook. I write about what I cook. The kitchen is a crossroads —
            Chinese grandmother, Mauritian summers, Canadian winters,
            Moroccan everything-else — and the cooking is what comes of all
            of that. Some nights it is dumplings. Some nights it is a tagine
            that has been on the stove since lunch. The recipes go in
            because I want to remember them. The letters go in because I want
            to remember the days they came from.
          </p>
          <p>
            There are three pillars to this journal — <em>Kitchen</em>,{' '}
            <em>Morocco</em>, <em>Travel</em>. They are not categories so
            much as moods. The kitchen is most of it. Morocco is what I see
            when I look up from the kitchen. Travel is when I leave for a
            week and bring something home.
          </p>
          <p>
            I live in a 300-year-old house that also welcomes guests — if
            you want to come and stay, the riad is at{' '}
            <Link href="https://riaddisiena.com" target="_blank" rel="noopener noreferrer">
              riaddisiena.com
            </Link>
            .
          </p>
          <p>
            Otherwise: thank you for reading. The letters are written for
            anyone who wants to read them, and there is a list at{' '}
            <Link href="/letters">Letters</Link> for the ones who would like
            them in their inbox.
          </p>
        </div>
      </div>
      <Signature />
    </>
  );
}
