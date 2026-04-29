import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not found',
  description: 'This page is not on Derb 37.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="content-column pt-10 pb-16 text-center">
      <p className="eyebrow mb-5">Lost in the derb</p>
      <h1 className="font-display italic font-medium text-ink text-[40px] leading-[1.05] tracking-[-0.005em] mb-5">
        This page isn&apos;t here
      </h1>
      <p className="font-display italic text-secondary text-[18px] max-w-md mx-auto mb-8">
        The doorway you knocked at doesn&apos;t open onto anything yet. The
        kitchen is still warm, though.
      </p>
      <Link href="/" className="comment-link">
        ← Back to the journal
      </Link>
    </div>
  );
}
