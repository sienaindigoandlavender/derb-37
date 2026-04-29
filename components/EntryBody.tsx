import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

export default function EntryBody({ body }: { body: string | null }) {
  if (!body) return null;
  const html = marked.parse(body, { async: false }) as string;

  return (
    <div className="px-6">
      <div
        className="entry-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="ornament-divider" aria-hidden>
        ✦ ✦ ✦
      </div>
    </div>
  );
}
