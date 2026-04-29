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
      <p className="post-category mb-4">Lost in the derb</p>
      <h1 className="post-title">This page isn&apos;t here</h1>
      <p className="italic text-secondary text-[15px] max-w-md mx-auto mb-7">
        The doorway you knocked at doesn&apos;t open onto anything yet. The
        kitchen is still warm, though.
      </p>
      <Link href="/" className="comment-link">
        ← Back to the journal
      </Link>
    </div>
  );
}
