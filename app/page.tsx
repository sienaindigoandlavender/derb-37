import EntryFeatured from '@/components/EntryFeatured';
import EntryBody from '@/components/EntryBody';
import RecipeCard from '@/components/RecipeCard';
import Signature from '@/components/Signature';
import ArchiveGrid from '@/components/ArchiveGrid';
import Colophon from '@/components/Colophon';
import { getLatestEntry, getRecentEntries } from '@/lib/content';

export const revalidate = 300;

export default async function Home() {
  const latest = await getLatestEntry();
  const archive = await getRecentEntries({ limit: 6, excludeId: latest?.id });

  if (!latest) {
    return (
      <>
        <div className="px-6 py-24 text-center">
          <p className="font-display italic text-secondary text-[20px]">
            The first letter is being written.
          </p>
        </div>
        <Colophon />
      </>
    );
  }

  return (
    <>
      <EntryFeatured entry={latest} headingLevel="h1" />
      <article>
        <EntryBody body={latest.story_body} />
        {latest.has_recipe && <RecipeCard entry={latest} />}
        <Signature />
      </article>
      {archive.length > 0 && (
        <ArchiveGrid
          entries={archive}
          eyebrow="More from the journal"
          title="Recent letters"
        />
      )}
      <Colophon />
    </>
  );
}
