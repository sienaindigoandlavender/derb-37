import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="content-column pt-12 pb-20 text-center">
      <p className="post-category mb-6">Lost in the derb</p>
      <h1 className="post-title">This page isn&apos;t here</h1>
      <p className="italic text-secondary text-[15px] max-w-md mx-auto mb-8">
        The doorway you knocked at doesn&apos;t open onto anything yet. The
        kitchen is still warm, though.
      </p>
      <Link href="/" className="comment-link">
        ← Back to the journal
      </Link>
    </div>
  );
}
