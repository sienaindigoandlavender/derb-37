import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="content-column pt-12 pb-20 text-center">
      <h1 className="font-serif text-2xl text-ink mb-4">Lost in the derb</h1>
      <p className="text-sm text-muted mb-8">This page doesn&apos;t exist — but the kitchen is always open.</p>
      <Link href="/" className="comment-link">← Back home</Link>
    </div>
  );
}
