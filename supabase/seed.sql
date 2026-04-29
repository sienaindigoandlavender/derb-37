-- Derb 37 — Seed entries
-- Three sample letters, one per pillar, so the site renders on first deploy.
-- Replace [ACCOUNT] in hero_image with the Cloudinary cloud name.

INSERT INTO entries (
  slug, title, pillar, subtitle, excerpt, story_body,
  has_recipe, recipe_title, recipe_yield, recipe_sections, recipe_method,
  cultural_origins, image_prompt, hero_image, hero_caption,
  entry_date, published, "order"
)
VALUES
(
  'lamb-dumplings-preserved-lemon',
  'Lamb dumplings, with preserved lemon',
  'kitchen',
  'I make these every January. My hands need to remember the folding.',
  'I make these every January. Not because anyone here celebrates Chinese New Year — they don''t — but because my hands remember the folding.',
  'I make these every January. Not because anyone here celebrates Chinese New Year — they don''t — but because my hands remember the folding, and the folding is the part of my grandmother that I still carry.

The first batch is always too thin at the seam. The second is better. By the third I have stopped thinking about it, which is the whole point. The radio is on the kitchen counter. The window is open. There are preserved lemons on the cutting board, soft and tender from a jar I packed in October, the salt crystallised at the rim. I scrape the flesh out and keep only the rind, mince it small, and stir it into the lamb with the spring onion and a thumb of grated ginger. The smell is a place I have lived in twice over.

In Hong Kong my grandmother folded white cabbage and pork. In Marrakech I fold lamb and preserved lemon. The dumpling is the same dumpling. The hand is the same hand. The street outside is different.

I steam the first round and eat them standing at the counter with chilli oil and black vinegar in two small saucers. The pleat holds. The lemon is bright against the lamb. Outside in the courtyard the cat is asleep under the lemon tree. The fountain is on. It is a Tuesday in January and the kitchen is exactly the kitchen I wanted.',
  true,
  'Lamb & Preserved Lemon Dumplings',
  'makes about thirty · serves four',
  '[
    {
      "label": "For the filling",
      "ingredients": [
        "500g lamb shoulder, hand-minced",
        "4 spring onions, white and pale green, sliced thin",
        "A thumb of ginger, grated on the small holes",
        "2 tablespoons soy sauce",
        "1 tablespoon preserved lemon paste, more if your jar is mild",
        "1 teaspoon sesame oil, no more",
        "A pinch of white pepper"
      ]
    },
    {
      "label": "To finish",
      "ingredients": [
        "One packet round wonton wrappers, the thin kind",
        "A small bowl of water for sealing",
        "Chilli oil and black vinegar, for the table"
      ]
    }
  ]'::jsonb,
  'Mix everything for the filling in a bowl with your hands. Don''t overwork it — fold it together until it just holds.

Take a wrapper, dab the rim with water, drop a teaspoon of filling in the centre. Fold to a half-moon, pleat the seam from one corner to the other. Stand each one on a tray with the pleated edge up.

Steam in batches over rolling water for about eight minutes — they puff and the pastry goes a bit translucent. Eat at the counter with chilli oil and black vinegar.',
  ARRAY['chinese', 'moroccan'],
  'overhead view of folded dumplings on dark wood counter, scattered preserved lemon zest, linen cloth corner, late morning kitchen light, documentary editorial photography, muted but luminous color, soft natural light, open shadows, low contrast, film photography look, medium format, 35mm, f/2.8, ISO 200, grain 8% --style raw --s 70 --ar 4:5',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/dumplings.jpg',
  '— at the kitchen counter, late morning',
  '2026-01-14',
  true,
  1
),
(
  'cannon-at-iftar',
  'The cannon, and what comes after',
  'morocco',
  'A few minutes before sunset on the rooftop, the year I stopped counting Ramadans.',
  'I''m on the rooftop at the hour before iftar. The kitchen is done. The medina is the quietest it gets all year.',
  'I''m on the rooftop at the hour before iftar. The kitchen is done — harira on a low flame, dates on the blue plate, *chebakia* stacked in the tin, eggs on the table next to the salt. Same table every night for a month. The souks are empty in a way they are empty no other time. The cats have inherited the alleys.

Any minute now the cannon goes off from the Koutoubia. You feel it in your sternum more than you hear it. And then — the spoons. Hundreds of them at once, metal touching ceramic in every house at the same second. Doors open. Children run from the hammam with their hair wet. The whole derb smells like harira for thirty seconds because every kitchen is eating the same soup.

This is my eleventh Ramadan in this house and I still come up here for the first few minutes. I should be downstairs. The bread is still warm. The harira will get a skin if I don''t serve it. But the rooftop at this hour is the part of the year I don''t want to forget.

The light is the colour of the inside of an apricot. The muezzin starts. I go downstairs.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'rooftop in marrakech medina at iftar, soft apricot evening light, koutoubia minaret in distance, terracotta walls, low parapet, single tagine and tea glass on a small table, documentary editorial photography, muted warm color, low contrast, film grain, medium format, 50mm, f/2.8, ISO 400, --style raw --ar 3:4',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/iftar-rooftop.jpg',
  '— from the rooftop, the minute before the cannon',
  '2026-03-02',
  true,
  2
),
(
  'a-week-in-essaouira',
  'A week in Essaouira, slowly',
  'travel',
  'Three hours west and somehow another country. The wind, the gulls, the fish on the grill at four.',
  'Three hours west of Marrakech and the air goes salt. The wind is the loudest thing about Essaouira and you forget how loud it is until you''re back in the medina and everything sounds muffled by comparison.',
  'Three hours west of Marrakech and the air goes salt. The wind is the loudest thing about Essaouira and you forget how loud it is until you''re back in the medina and everything sounds muffled by comparison.

We rented a tiny house behind the ramparts with a roof terrace barely big enough for two chairs and an ashtray. The blue is everywhere. I had forgotten that. The doors, the boats, the fishermen''s overalls — all the same blue, faded by the same wind, every year.

Lunch was at the port stalls four days running. You point at the fish on the ice. They weigh it, salt it, throw it on the grill, hand it to you on a square of butcher paper with half a lemon and a slick of harissa. Sardines so small you eat them whole. A monkfish tail one day. A whole sea bream the next.

In the late afternoons we walked the beach all the way to the dunes. The light is a different light here — flatter, whiter, salt-bright. I came home with sand in everything and a small jar of argan oil from a co-operative outside the city. Marrakech smelled, as it always does after a week away, like cumin and dust and home.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'wide shot of essaouira port at low light, blue painted fishing boats lined along the harbour wall, white seabirds, fishermen folding nets, documentary editorial photography, salt-flat light, slightly desaturated blues, low contrast, film grain, medium format, 35mm, f/4 --style raw --ar 3:2',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/essaouira-port.jpg',
  '— port, late afternoon, day four',
  '2026-04-08',
  true,
  3
)
ON CONFLICT (slug) DO NOTHING;
