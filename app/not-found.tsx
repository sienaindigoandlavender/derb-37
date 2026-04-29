import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="px-6 py-24 text-center">
      <p className="eyebrow mb-5">Lost in the derb</p>
      <h1 className="display-headline italic text-[44px] md:text-[58px] mb-6">
        This page isn't here.
      </h1>
      <p className="font-display italic text-secondary text-[18px] max-w-md mx-auto mb-10">
        The doorway you knocked at doesn't open onto anything yet. The
        kitchen is still warm, though.
      </p>
      <Link
        href="/"
        className="font-sc text-[11px] tracking-[0.32em] uppercase text-rust hover:text-ink transition-colors"
      >
        ← Back to the journal
      </Link>
    </div>
  );
}
