import type { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';

export const metadata: Metadata = {
  title: 'Letters',
  description: 'A small list. A letter when there is a letter. Nothing else.',
};

type Status = 'confirmed' | 'error' | undefined;

export default function LettersPage({ searchParams }: { searchParams: { status?: Status } }) {
  const status = searchParams.status;

  return (
    <div className="content-column pt-4 pb-12">
      <header className="text-center mb-10">
        <p className="post-category mb-6">The list</p>
        <h1 className="post-title">Letters</h1>
        <p className="italic text-secondary text-[15px] max-w-md mx-auto -mt-2">
          A letter when there&apos;s a letter. Nothing else.
        </p>
      </header>

      {status === 'confirmed' && (
        <p className="italic text-secondary text-center max-w-md mx-auto mb-8 text-[15px]">
          You&apos;re on the list. The next letter will find you in your inbox.
        </p>
      )}
      {status === 'error' && (
        <p className="italic text-secondary text-center max-w-md mx-auto mb-8 text-[15px]">
          Something went sideways with that link. Try subscribing again below.
        </p>
      )}

      {status !== 'confirmed' && <Newsletter sourcePage="/letters" />}

      <p className="mt-12 text-center italic text-muted text-[14px] max-w-md mx-auto leading-relaxed">
        A confirmation note will arrive after you sign up. Click the link
        inside it and you&apos;ll be added to the list. Unsubscribing is a
        single click in any letter.
      </p>
    </div>
  );
}
