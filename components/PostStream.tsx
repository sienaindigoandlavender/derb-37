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
    <article className="mb-10 pb-4">
      {/* Date with flanking lines */}
      <div className="post-date-row">
        <span className="post-date-text">{formatDate(entry.entry_date)}</span>
      </div>

      {/* Small tagine icon */}
      <div className="flex justify-center mb-4">
        <SmallTagineSVG className="text-muted" />
      </div>

      {/* Category with underline */}
      <div className="text-center mb-2">
        <span className="post-category">
          <Link href={`/${entry.pillar}`}>{pillarShort(entry.pillar)}</Link>
        </span>
      </div>

      {/* Title — ALL CAPS, centered */}
      <TitleTag className="post-title">
        {asPermalink ? (
          entry.title
        ) : (
          <Link href={`/${entry.slug}`}>{entry.title}</Link>
        )}
      </TitleTag>

      {entry.subtitle && (
        <p className="text-center italic text-secondary text-[15px] mb-6 -mt-2">
          {entry.subtitle}
        </p>
      )}

      {/* Hero image */}
      {entry.hero_image && (
        <div className="mb-6">
          <Image
            src={entry.hero_image}
            alt={entry.title}
            width={710}
            height={536}
            className="w-full h-auto"
            priority={asPermalink}
            sizes="(max-width: 768px) 100vw, 710px"
          />
          {entry.hero_caption && (
            <p className="text-xs text-muted italic text-center mt-2">
              {entry.hero_caption}
            </p>
          )}
        </div>
      )}

      {/* Body */}
      {bodyHtml && (
        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      )}

      {/* Inline images */}
      {entry.images && entry.images.length > 0 && (
        <div className="my-6 space-y-4">
          {entry.images.map((img, i) => (
            <figure key={i}>
              <Image
                src={img.url}
                alt={img.alt}
                width={710}
                height={536}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 710px"
              />
              {img.caption && (
                <figcaption className="text-xs text-muted mt-2 italic text-center">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {/* Recipe */}
      {entry.has_recipe && (
        <div className="post-body mt-8">
          {entry.recipe_title && (
            <p>
              <strong>{entry.recipe_title}</strong>
            </p>
          )}
          {entry.recipe_yield && (
            <p>
              <em>{entry.recipe_yield}</em>
            </p>
          )}

          {entry.recipe_sections && entry.recipe_sections.length > 0 && (
            <div className="recipe-ingredients my-4">
              {entry.recipe_sections.map((section, si) => (
                <div key={si} className="mb-4">
                  {section.label && (
                    <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-muted mb-2">
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
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: methodHtml }}
            />
          )}
        </div>
      )}

      {/* Read-more link on stream view */}
      {!asPermalink && (
        <div className="text-center mt-8">
          <Link href={`/${entry.slug}`} className="comment-link">
            Continue reading →
          </Link>
        </div>
      )}
    </article>
  );
}
