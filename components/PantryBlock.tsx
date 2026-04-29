import type { Pantry } from '@/lib/content';

export default function PantryBlock({ pantry }: { pantry: Pantry }) {
  return (
    <aside className="mt-10 pt-8" aria-labelledby="pantry-heading">
      <div className="ornament-rule mx-auto max-w-md mb-7">
        <span className="ornament">✦</span>
      </div>

      <p id="pantry-heading" className="eyebrow text-center mb-4">
        From the Pantry
      </p>

      {pantry.intro && (
        <p className="font-display italic text-ink text-[17px] text-center max-w-md mx-auto mb-7 leading-snug">
          {pantry.intro}
        </p>
      )}

      <ul className="space-y-5 max-w-[560px] mx-auto list-none">
        {pantry.items.map((item, i) => (
          <li key={i}>
            <a
              href={item.zfriti_url}
              rel="noopener"
              className="font-display italic text-ink text-[20px] underline underline-offset-[4px] decoration-rust hover:decoration-ink"
            >
              {item.name}
            </a>
            {item.note && (
              <p className="font-serif text-[16.5px] leading-[1.65] text-body mt-1.5">
                {item.note}
              </p>
            )}
          </li>
        ))}
      </ul>

      <p className="text-center text-secondary font-display italic text-[13px] mt-8">
        Stocked at{' '}
        <a
          href="https://zfriti.com"
          rel="noopener"
          className="underline underline-offset-[3px] decoration-rust"
        >
          zfriti.com
        </a>
        .
      </p>
    </aside>
  );
}
