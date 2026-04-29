import Link from 'next/link';
import type { Settings } from '@/lib/content';

export default function Masthead({ settings }: { settings: Settings }) {
  return (
    <header className="pt-16 pb-10 md:pt-24 md:pb-14 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="meta-line mb-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>{settings.volume}</span>
          <span className="text-rule">·</span>
          <span>{settings.issue}</span>
          <span className="text-rule">·</span>
          <span>Marrakech, Morocco</span>
          <span className="text-rule">·</span>
          <span>{settings.season_label}</span>
        </p>
        <Link href="/" className="block">
          <h1 className="display-headline text-[68px] md:text-[104px] leading-[0.95] tracking-[-0.01em] text-ink">
            <span>Derb </span>
            <span className="italic text-rust">37</span>
          </h1>
        </Link>
        <p className="mt-5 font-display italic text-secondary text-[19px] md:text-[21px]">
          {settings.site_tagline}
        </p>
        <div className="ornament-rule mt-10 mx-auto max-w-md">
          <span className="ornament">✦</span>
        </div>
      </div>
    </header>
  );
}
