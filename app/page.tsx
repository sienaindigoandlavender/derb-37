import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import { MedinaDivider, SmallTagineSVG } from '@/components/MedinaIllustrations';
import { getLatestEntries, Entry } from '@/lib/data';
import { getPillarConfig } from '@/lib/pillars';
import ReactMarkdown from 'react-markdown';

const DEMO_ENTRIES: Entry[] = [
  {
    id: 1, slug: 'first-harira-of-the-season', title: 'The first harira of the season',
    pillar: 'kitchen', lane: 'jacquelines_kitchen', format: 'story_recipe',
    voice: 'jacqueline', season: 'Ramadan, day one',
    story_body: `The harira has been going since noon and the whole house smells extraordinary. Lentils, chickpeas, tomatoes, that cumin-and-cinnamon thing that only happens during Ramadan. I'm on the kitchen step with my tea, which is a bad place to sit because I keep getting in the way, but it's the best spot to catch the steam coming off the pot.

My neighbour's version is better than mine. I've accepted this. She uses celery leaves — just the leaves, not the stalks — and I kept getting it wrong for actual years, buying the wrong thing at the souk and wondering why the flavour was off. Embarrassing.

It's just gone four and the bread is at the communal oven. The cat is under the lemon tree doing absolutely nothing. I should probably set the table — we always have the same thing: harira, dates, *chebakia*, eggs. Every night for a month. It never gets old.

I'll put the recipe below — I've been tweaking it for about six years and it's finally getting close. The secret is the flour-water at the end and definitely the celery leaves. Definitely.`,
    recipe_title: 'Harira', recipe_intro: 'Getting close. Six years of tweaking.',
    ingredients: [
      { item: 'brown lentils, rinsed', amount: '200g' },
      { item: 'chickpeas, soaked overnight', amount: '150g' },
      { item: 'onion, finely chopped', amount: '1 large' },
      { item: 'ripe tomatoes, peeled and crushed', amount: '4' },
      { item: 'celery leaves, not stalks', amount: 'a handful' },
      { item: 'fresh coriander', amount: 'a big bunch' },
      { item: 'fresh parsley', amount: 'a big bunch' },
      { item: 'cumin', amount: '1 tsp' },
      { item: 'turmeric', amount: '1 tsp' },
      { item: 'ground ginger', amount: '½ tsp' },
      { item: 'cinnamon, right at the end', amount: '¼ tsp' },
      { item: 'saffron threads if you have them', amount: 'a pinch' },
      { item: 'flour mixed with a little water', amount: '2 tbsp' },
      { item: 'olive oil' },
      { item: 'salt and pepper' },
    ],
    method: `Big pot, olive oil, onion until soft. Tomatoes, celery leaves, all the herbs, all the spices — a couple of minutes until the smell is ridiculous.

Lentils and chickpeas in, water to cover, about 2 litres. Bring it up, drop to a simmer, walk away for 45 minutes.

The flour-water goes in at the end. Slowly, stirring. Thick enough to coat a spoon, still pourable. Season. Lemon at the table. Dates. Bread.`,
    cultural_origins: ['moroccan'], hero_image: null, image_prompt: null, images: null,
    published: true, order: 1, created_at: '2026-02-28T18:00:00Z', updated_at: '2026-02-28T18:00:00Z',
  },
  {
    id: 2, slug: 'dumplings-in-the-riad', title: 'Dumplings in the riad',
    pillar: 'kitchen', lane: 'jacquelines_kitchen', format: 'story_recipe',
    voice: 'jacqueline', season: null,
    story_body: `January, so dumplings. Nobody in Marrakech cares about Chinese New Year but my hands want to fold things, so here I am with a bag of frozen wrappers from the Chinese grocery near Guéliz. The owner is from Wenzhou. He keeps the good skins behind the counter — you have to ask.

A friend watched me making these once and said the folds were the same as pastilla. I'd been here five years and never noticed. Same pleat, same wrapper, different continent, different grandmother.

Today it's lamb and coriander because there was no pork. I used to think of this as the compromise version but it might actually be better? Earthy and green and very Moroccan. The kitchen smells like cumin and sesame oil at the same time, which is basically the smell of my whole life in one room.

I should write down the recipe at some point but honestly I just eyeball it — a bit of this, a bit of that, fold, pinch, steam. My grandmother didn't write things down either. Maybe that's the tradition I'm actually keeping.`,
    recipe_title: null, recipe_intro: null, ingredients: null, method: null,
    cultural_origins: ['chinese', 'moroccan'], hero_image: null, image_prompt: null, images: null,
    published: true, order: 2, created_at: '2026-02-20T12:00:00Z', updated_at: '2026-02-20T12:00:00Z',
  },
  {
    id: 3, slug: 'six-am', title: 'Six am',
    pillar: 'walls', lane: null, format: 'story_recipe',
    voice: 'jacqueline', season: null,
    story_body: `Bare feet, cold tiles. No fountain yet. Just the birds and the muezzin and then quiet. The courtyard is still cool from last night — I don't know if it's the walls or the fountain basin, but at six it's still blue and a bit chilly and completely mine.

My tea is the Yunnan black in the cup I brought from Hong Kong. It's chipped. It's survived every move. Not mint tea — mint tea is for later, for guests.

The zouak on the ceiling has gone a bit pink where the restoration wasn't done right. The blues are still gorgeous. At this hour, with the steam coming off the cup, everything looks exactly the way it should.

By half seven the spell breaks — fountain on, kettle on, someone's footsteps on the stairs. I don't mind. But I do like getting here first.`,
    recipe_title: null, recipe_intro: null, ingredients: null, method: null,
    cultural_origins: null, hero_image: null, image_prompt: null, images: null,
    published: true, order: 3, created_at: '2026-02-15T08:00:00Z', updated_at: '2026-02-15T08:00:00Z',
  },
  {
    id: 4, slug: 'the-cannon', title: 'The cannon',
    pillar: 'culture', lane: null, format: 'story_recipe',
    voice: 'jacqueline', season: 'Ramadan',
    story_body: `Writing this on the rooftop. It's the hour before iftar and the medina is the quietest it gets all year. The kitchen is done — harira, dates, *chebakia*, eggs, bread. Same table every night for a month. The souks are empty. The cats are in charge.

Any minute now the cannon goes off from the Koutoubia and then — the spoons. You can hear them from up here. Hundreds of them, all at once, metal on ceramic. Doors open. Children run. The whole derb smells like harira for about thirty seconds because every house is eating the same thing at the same time.

Eleven Ramadans and I still love this bit. I should go downstairs and eat but I always stay up here for the first few minutes, just listening.`,
    recipe_title: null, recipe_intro: null, ingredients: null, method: null,
    cultural_origins: ['moroccan'], hero_image: null, image_prompt: null, images: null,
    published: true, order: 4, created_at: '2026-02-10T18:00:00Z', updated_at: '2026-02-10T18:00:00Z',
  },
];

export const revalidate = 300;

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
      {/* Date with flanking lines */}
      <div className="post-date-row">
        <span className="post-date-text">{formatDate(entry.created_at)}</span>
      </div>

      {/* Small tagine icon */}
      <div className="flex justify-center mb-4">
        <SmallTagineSVG className="text-[#999]" />
      </div>

      {/* Category with underline */}
      <div className="text-center mb-4">
        <span className="post-category">{categoryText}</span>
      </div>

      {/* Title — ALL CAPS, centered */}
      <h3 className="post-title">
        <Link href={`/${entry.slug}`}>{entry.title}</Link>
      </h3>

      {/* Hero image */}
      {entry.hero_image && (
        <div className="mb-6">
          <Image
            src={entry.hero_image}
            alt={entry.title}
            width={710}
            height={536}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 710px"
          />
        </div>
      )}

      {/* Full post body */}
      {entry.story_body && (
        <div className="post-body">
          <ReactMarkdown>{entry.story_body}</ReactMarkdown>
        </div>
      )}

      {/* Inline images */}
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

      {/* Recipe */}
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
          {entry.method && (
            <div className="mt-4"><ReactMarkdown>{entry.method}</ReactMarkdown></div>
          )}
        </div>
      )}
    </article>
  );
}

export default async function HomePage() {
  let entries = await getLatestEntries(8);
  if (entries.length === 0) entries = DEMO_ENTRIES;

  return (
    <div className="content-column pt-4 pb-12">
      {entries.map((entry, i) => (
        <div key={entry.id}>
          <PostStream entry={entry} />
          {i < entries.length - 1 && <MedinaDivider index={i} />}
        </div>
      ))}

      <Newsletter />
    </div>
  );
}
