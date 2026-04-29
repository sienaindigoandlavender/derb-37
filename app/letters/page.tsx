import type { Metadata } from 'next';
import PageHeading from '@/components/PageHeading';
import SubscribeForm from '@/components/SubscribeForm';

export const metadata: Metadata = {
  title: 'Letters',
  description: 'A small list. A letter when there is a letter. Nothing else.',
};

type Status = 'confirmed' | 'error' | undefined;

export default function LettersPage({ searchParams }: { searchParams: { status?: Status } }) {
  const status = searchParams.status;

  return (
    <>
      <PageHeading
        eyebrow="The list"
        title="Letters"
        subtitle="A letter when there's a letter. Nothing else."
      />

      <div className="px-6 pb-24">
        {status === 'confirmed' && (
          <p className="font-display italic text-[20px] text-ink-soft text-center max-w-md mx-auto mb-10">
            You're on the list. The next letter will find you in your inbox.
          </p>
        )}
        {status === 'error' && (
          <p className="font-display italic text-rust text-center max-w-md mx-auto mb-10 text-[18px]">
            Something went sideways with that link. Try subscribing again
            below.
          </p>
        )}
        {status !== 'confirmed' && <SubscribeForm sourcePage="/letters" />}

        <p className="mt-16 text-center font-display italic text-secondary text-[15px] max-w-md mx-auto leading-relaxed">
          A confirmation note will arrive after you sign up. Click the link
          inside it and you'll be added to the list. Unsubscribing is a
          single click in any letter.
        </p>
      </div>
    </>
  );
}
