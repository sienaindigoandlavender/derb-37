import { Entry, getEntries } from '@/lib/data';
import { PillarKey, PILLARS } from '@/lib/pillars';
import Newsletter from '@/components/Newsletter';
import { MedinaDivider, SmallTagineSVG } from '@/components/MedinaIllustrations';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getPillarConfig } from '@/lib/pillars';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function PostStream({ entry }: { entry: Entry }) {
  const pillar = getPillarConfig(entry.pillar);
  const laneLabel = entry.lane === 'jacquelines_kitchen' ? "Jacqueline's Kitchen"
    : entry.lane === 'pantry' ? 'Pantry Notes'
    : null;
  const categoryText = laneLabel || pillar?.label || entry.pillar;

  return (
    <article className="mb-10 pb-4">
      <div className="post-date-row">
        <span className="post-date-text">{formatDate(entry.created_at)}</span>
      </div>
      <div className="flex justify-center mb-4">
        <SmallTagineSVG className="text-[#999]" />
      </div>
      <div className="text-center mb-4">
        <span className="post-category">{categoryText}</span>
      </div>
      <h3 className="post-title">
        <Link href={`/${entry.slug}`}>{entry.title}</Link>
      </h3>

      {entry.hero_image && (
        <div className="mb-6">
          <Image src={entry.hero_image} alt={entry.title} width={710} height={536} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 710px" />
        </div>
      )}
      {entry.story_body && (
        <div className="post-body"><ReactMarkdown>{entry.story_body}</ReactMarkdown></div>
      )}
      {entry.images && entry.images.length > 0 && (
        <div className="my-6 space-y-4">
          {entry.images.map((img, i) => (
            <figure key={i}>
              <Image src={img.url} alt={img.alt} width={710} height={536} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 710px" />
              {img.caption && <figcaption className="text-xs text-muted mt-2 italic text-center">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {(entry.recipe_title || entry.ingredients) && (
        <div className="post-body mt-8">
          {entry.recipe_title && <p><strong>{entry.recipe_title}</strong></p>}
          {entry.recipe_intro && <p><em>{entry.recipe_intro}</em></p>}
          {entry.ingredients && (
            <div className="recipe-ingredients my-4">
              {entry.ingredients.map((ing, i) => (
                <span key={i} className="block">
                  {ing.amount && <>{ing.amount} </>}{ing.item}{ing.note && <> — <em>{ing.note}</em></>}
                </span>
              ))}
            </div>
          )}
          {entry.method && <div className="mt-4"><ReactMarkdown>{entry.method}</ReactMarkdown></div>}
        </div>
      )}
    </article>
  );
}

type Props = { pillar: PillarKey };

export default async function PillarPage({ pillar }: Props) {
  const config = PILLARS[pillar];
  const entries = await getEntries(pillar);
  const lanes = config.lanes;

  return (
    <div className="content-column pt-4 pb-12">
      <div className="text-center mb-12">
        <h1 className="post-title !text-[26px] !mb-4">{config.label}</h1>
        <p className="font-serif text-base text-secondary">{config.description}</p>
        {lanes && (
          <div className="mt-4 flex justify-center gap-8">
            <Link href={config.href} className="nav-link !text-[#222]">All</Link>
            {Object.entries(lanes).map(([key, lane]) => (
              <Link key={key} href={`${config.href}?lane=${key}`} className="nav-link">{lane.label}</Link>
            ))}
          </div>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-xl text-ink mb-2">Coming soon</p>
          <p className="text-sm text-muted">The first entries are being written.</p>
        </div>
      ) : (
        entries.map((entry, i) => (
          <div key={entry.id}>
            <PostStream entry={entry} />
            {i < entries.length - 1 && <MedinaDivider index={i} />}
          </div>
        ))
      )}

      <Newsletter />
    </div>
  );
}
