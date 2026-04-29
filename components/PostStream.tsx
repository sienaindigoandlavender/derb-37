import Link from 'next/link';
import Image from 'next/image';
import { marked } from 'marked';
import type { Entry } from '@/lib/content';
import { pillarShort } from '@/lib/content';
import { SmallTagineSVG } from '@/components/MedinaIllustrations';

marked.setOptions({ gfm: true, breaks: false });

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + (dateStr.length === 10 ? 'T00:00:00Z' : ''));
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function PostStream({
  entry,
  asPermalink = false,
}: {
  entry: Entry;
  asPermalink?: boolean;
}) {
  const bodyHtml = entry.story_body
    ? (marked.parse(entry.story_body, { async: false }) as string)
    : '';
  const methodHtml = entry.recipe_method
    ? (marked.parse(entry.recipe_method, { async: false }) as string)
    : '';

  const TitleTag = asPermalink ? 'h1' : 'h2';

  return (
    <article className="mb-8 pb-2">
      <div className="post-date-row">
        <time className="post-date-text" dateTime={entry.entry_date}>
          {formatDate(entry.entry_date)}
        </time>
      </div>

      <div className="flex justify-center mb-3">
        <SmallTagineSVG className="text-secondary" />
      </div>

      <div className="text-center mb-1">
        <span className="post-category">
          <Link href={`/${entry.pillar}`}>{pillarShort(entry.pillar)}</Link>
        </span>
      </div>

      <TitleTag className="post-title">
        {asPermalink ? (
          entry.title
        ) : (
          <Link href={`/${entry.slug}`}>{entry.title}</Link>
        )}
      </TitleTag>

      {entry.hero_image && (
        <figure className="mb-5">
          <Image
            src={entry.hero_image}
            alt={entry.hero_caption || entry.title}
            width={690}
            height={518}
            className="w-full h-auto"
            priority={asPermalink}
            sizes="(max-width: 768px) 100vw, 690px"
          />
          {entry.hero_caption && (
            <figcaption className="text-[11px] tracking-[0.06em] text-secondary italic text-center mt-2">
              {entry.hero_caption}
            </figcaption>
          )}
        </figure>
      )}

      {bodyHtml && (
        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      )}

      {entry.images && entry.images.length > 0 && (
        <div className="my-5 space-y-4">
          {entry.images.map((img, i) => (
            <figure key={i}>
              <Image
                src={img.url}
                alt={img.alt || entry.title}
                width={690}
                height={518}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 690px"
              />
              {img.caption && (
                <figcaption className="text-[11px] tracking-[0.06em] text-secondary mt-2 italic text-center">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {entry.has_recipe && (
        <div className="post-body mt-6 pt-5 border-t border-border">
          {entry.recipe_title && (
            <p>
              <strong>{entry.recipe_title}</strong>
              {entry.recipe_yield && (
                <>
                  {' '}— <em className="text-secondary">{entry.recipe_yield}</em>
                </>
              )}
            </p>
          )}

          {entry.recipe_sections && entry.recipe_sections.length > 0 && (
            <div className="recipe-ingredients my-3">
              {entry.recipe_sections.map((section, si) => (
                <div key={si} className="mb-3">
                  {section.label && (
                    <p className="font-sans text-[10.5px] tracking-[0.22em] uppercase text-secondary mb-1.5 mt-3">
                      {section.label}
                    </p>
                  )}
                  {section.ingredients.map((ing, i) => (
                    <span key={i} className="block">
                      {ing}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}

          {methodHtml && (
            <div
              className="mt-3"
              dangerouslySetInnerHTML={{ __html: methodHtml }}
            />
          )}
        </div>
      )}
    </article>
  );
}
