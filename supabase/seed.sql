-- Derb 37 — Seed notes
-- Twelve short notes, four per pillar, so the site renders on first deploy.
-- Replace [ACCOUNT] in hero_image with the Cloudinary cloud name.

INSERT INTO entries (
  slug, title, pillar, subtitle, excerpt, story_body,
  has_recipe, recipe_title, recipe_yield, recipe_sections, recipe_method,
  cultural_origins, image_prompt, hero_image, hero_caption,
  entry_date, published, "order"
)
VALUES

-- ============ KITCHEN ============

(
  'lamb-dumplings-preserved-lemon',
  'Lamb dumplings, with preserved lemon',
  'kitchen',
  'My hands needed to remember the folding.',
  'Lamb and preserved lemon dumplings, folded on a Tuesday in January. The pleat is the same as my grandmother''s.',
  'Tuesday, January. Lamb and preserved lemon, folded into thin wonton skins. The pleat is the same as my grandmother''s. The kitchen smells of cumin and sesame at once. Zahra walks through, peers, says nothing, smiles.',
  true,
  'Lamb & Preserved Lemon Dumplings',
  'about thirty · serves four',
  '[
    {
      "label": "Filling",
      "ingredients": [
        "500g lamb shoulder, hand-minced",
        "4 spring onions, sliced thin",
        "A thumb of ginger, grated",
        "2 tbsp soy sauce",
        "1 tbsp preserved lemon paste",
        "1 tsp sesame oil",
        "A pinch of white pepper"
      ]
    },
    {
      "label": "To finish",
      "ingredients": [
        "Round wonton wrappers",
        "Water for sealing",
        "Chilli oil and black vinegar"
      ]
    }
  ]'::jsonb,
  'Mix the filling with your hands. Don''t overwork it.

Wet the rim of a wrapper, drop a teaspoon of filling, fold to a half-moon, pleat the seam from one corner across.

Steam over rolling water for eight minutes. Eat at the counter, chilli oil, black vinegar.',
  ARRAY['chinese', 'moroccan'],
  'overhead view of folded dumplings on dark wood counter, scattered preserved lemon zest, linen cloth corner, late morning kitchen light, documentary editorial, muted color, soft natural light, low contrast, film grain, medium format, 35mm, f/2.8 --ar 4:5',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/dumplings.jpg',
  'kitchen counter, late morning',
  '2026-01-14',
  true,
  10
),
(
  'first-harira-of-the-season',
  'The first harira',
  'kitchen',
  'Day one of Ramadan. The pot has been on since noon.',
  'Lentils, chickpeas, celery leaves, cinnamon at the very end. The first harira of the season.',
  'The pot has been on since noon. The whole house smells of cumin and tomato and that cinnamon-at-the-end thing that only happens in Ramadan. Zahra makes hers thicker than mine. I keep adjusting toward her version, year on year. It is almost there.',
  true,
  'Harira',
  'serves six',
  '[
    {
      "label": "For the pot",
      "ingredients": [
        "200g brown lentils, rinsed",
        "150g chickpeas, soaked overnight",
        "1 large onion, fine-chopped",
        "4 ripe tomatoes, peeled and crushed",
        "A handful of celery leaves (not stalks)",
        "A big bunch each of coriander and parsley",
        "1 tsp cumin, 1 tsp turmeric, 1/2 tsp ground ginger",
        "1/4 tsp cinnamon, right at the end",
        "A pinch of saffron",
        "Olive oil, salt, pepper"
      ]
    },
    {
      "label": "To finish",
      "ingredients": [
        "2 tbsp flour mixed with a little cold water",
        "Lemon, dates, bread, at the table"
      ]
    }
  ]'::jsonb,
  'Sweat the onion in olive oil. Tomatoes, celery leaves, herbs, spices in — a couple of minutes until the kitchen smells ridiculous.

Lentils and chickpeas, water to cover (about two litres). Bring up, drop to a simmer, walk away for forty-five minutes.

Cinnamon now. Stream the flour-water in slowly, stirring, until it just coats a spoon. Lemon at the table.',
  ARRAY['moroccan'],
  'rustic moroccan harira soup in a clay bowl, steam rising, dates and bread on linen, cinnamon stick, evening kitchen light, documentary editorial photography, warm muted color, soft natural light, low contrast, film grain, medium format, 50mm, f/2.8 --ar 4:5',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/harira.jpg',
  'iftar table, just before the cannon',
  '2026-02-28',
  true,
  9
),
(
  'a-jar-of-preserved-lemons',
  'A jar of preserved lemons',
  'kitchen',
  'Salt, lemons, time. That is the whole recipe.',
  'A two-litre jar in the pantry, layered with salt and small Moroccan lemons. Six weeks until they are kind.',
  'Small Moroccan lemons from the souk this morning, the thin-skinned kind. Quartered through the top so they open like a flower but stay attached at the base. Pack hard with salt, jar them tight, lemon juice over. Six weeks. The pantry will smell like all the good things at once.',
  true,
  'Preserved Lemons',
  'one two-litre jar',
  '[
    {
      "label": "You need",
      "ingredients": [
        "10–12 small thin-skinned lemons (more if your jar is wide)",
        "A generous handful of coarse sea salt",
        "Juice of 4–5 extra lemons, to top up",
        "A clean two-litre jar with a tight lid"
      ]
    }
  ]'::jsonb,
  'Quarter each lemon from the top, almost through, leaving the base attached. Stuff each one with salt.

Layer into the jar, pressing down hard so the juice rises. Top up with extra lemon juice until the lemons are submerged.

Lid on. Pantry. Turn the jar upside down once a week. Six weeks before they are tender. Use the rind, not the flesh.',
  ARRAY['moroccan'],
  'a tall glass jar of preserved lemons on a marble counter, salt scattered, soft window light, terracotta tile, documentary editorial, muted warm color, low contrast, film grain, medium format, 50mm, f/2.8 --ar 4:5',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/preserved-lemons.jpg',
  'pantry shelf, six weeks from now',
  '2026-02-04',
  true,
  8
),
(
  'fish-from-the-mellah',
  'Fish from the Mellah',
  'kitchen',
  'Whatever was good this morning. A whole bream, eventually.',
  'A whole bream from the Mellah souk, charmoula on the bones, a bed of preserved lemon and tomato. Forty minutes in a low oven.',
  'I went for sardines. Came back with a whole bream because the man at the corner stall raised his eyebrows in a particular way. Charmoula on the bones, a bed of tomato and preserved lemon, into a low oven. Forty minutes, no hurry. The kitchen smells of garlic and coriander and the sea.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'whole sea bream on a ceramic platter with charmoula, preserved lemon, tomato, fresh coriander, blue tile counter, soft afternoon light, documentary editorial, muted color, low contrast, film grain, medium format, 35mm, f/2.8 --ar 4:5',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/bream.jpg',
  'kitchen, just out of the oven',
  '2026-04-12',
  true,
  7
),

-- ============ MOROCCO ============

(
  'cannon-at-iftar',
  'The cannon, at iftar',
  'morocco',
  'The minute before sunset, on the rooftop.',
  'The cannon from the Koutoubia, then the spoons. Every house, all at once.',
  'Rooftop, the minute before sunset. The cannon from the Koutoubia. Then the spoons — every house, all at once, metal on ceramic. The whole derb smells of harira for thirty seconds. Eleven Ramadans and I still come up here for it.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'rooftop in marrakech medina at iftar, soft apricot evening light, koutoubia minaret distant, terracotta walls, single tagine and tea glass, documentary editorial, muted warm color, low contrast, film grain, medium format, 50mm, f/2.8 --ar 3:4',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/iftar-rooftop.jpg',
  'rooftop, the minute before the cannon',
  '2026-03-02',
  true,
  6
),
(
  'six-am-in-the-courtyard',
  'Six am in the courtyard',
  'morocco',
  'Bare feet, cold tiles, the chipped Hong Kong cup.',
  'Six am, no fountain yet, just the birds and the muezzin. Yunnan black in a cup that has survived every move.',
  'Bare feet, cold tiles. No fountain yet. Just the birds and the muezzin and then quiet. The courtyard is still cool from last night. Yunnan black in the chipped Hong Kong cup. The zellige goes pink at this hour. Mine for thirty more minutes, then the house wakes up.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'courtyard of a marrakech riad before sunrise, fountain still, blue and pink zellige walls, single ceramic teacup steam rising, lemon tree corner, documentary editorial, muted blue hour color, low contrast, film grain, medium format, 35mm, f/2.8 --ar 4:5',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/courtyard-dawn.jpg',
  'courtyard, before the fountain comes on',
  '2026-02-15',
  true,
  5
),
(
  'tuesday-bread-oven',
  'The Tuesday bread oven',
  'morocco',
  'Khobz on a wooden board, your name in flour.',
  'The communal oven on the corner. Two rounds of khobz, a wooden board, your name written in flour so you get yours back.',
  'Tuesday is communal-oven day. Two rounds of khobz on the wooden board, my initial in flour so the boy knows whose is whose. Forty minutes later he reappears with two hot loaves wrapped in a cloth, and the whole derb is the smell of bread for an hour.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'communal bread oven in marrakech medina, wooden boards with khobz loaves dusted with flour, hands of a baker, warm orange interior light, documentary editorial, muted warm color, low contrast, film grain, medium format, 35mm, f/2.8 --ar 4:5',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/bread-oven.jpg',
  'the corner oven, late morning',
  '2026-02-10',
  true,
  4
),
(
  'cat-and-the-fountain',
  'The cat and the fountain',
  'morocco',
  'Siena asleep where she shouldn''t be. The cat watching.',
  'The fountain talks to itself at night. The cat watches Siena from the lemon tree. A small derb truce.',
  'The fountain talks to itself at night. The cat is in the lemon tree, watching Siena asleep on the daybed she is not supposed to be on. They have an agreement, the two of them, that I am not part of. I let them have it. I close the kitchen and go upstairs.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'marrakech riad courtyard at night, fountain glowing softly, daybed with linen throw, lemon tree shadow, cat silhouette, candle light, documentary editorial, muted warm color, low contrast, film grain, medium format, 50mm, f/2 --ar 4:5',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/courtyard-night.jpg',
  'courtyard, after the kitchen closes',
  '2026-04-04',
  true,
  3
),

-- ============ TRAVEL ============

(
  'a-week-in-essaouira',
  'A week in Essaouira',
  'travel',
  'Three hours west, salt in the air.',
  'A week in Essaouira — sardines on the grill, the wind, the same blue everywhere.',
  'Three hours west of Marrakech and the air goes salt. Sardines on the grill at the port, four days running. Blue boats, blue doors, blue overalls — same blue, faded the same way. Came home with sand in everything and a small jar of argan oil.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'wide shot of essaouira port at low light, blue painted fishing boats along harbour wall, white seabirds, documentary editorial, salt-flat light, slightly desaturated blues, film grain, medium format, 35mm, f/4 --ar 3:2',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/essaouira-port.jpg',
  'port, late afternoon, day four',
  '2026-04-08',
  true,
  2
),
(
  'three-days-in-tangier',
  'Three days in Tangier',
  'travel',
  'A balcony over the strait, a plate of small fish.',
  'A balcony over the Strait of Gibraltar. Spain in the haze. Anchovies on toast and a glass of something cold.',
  'A small hotel above the medina, a balcony over the Strait. Spain in the haze if you squint. Lunch at a tile-floor place near the kasbah — a plate of fried small fish, a glass of something cold, a slice of lemon. The light here is different from Marrakech. Cooler. More Atlantic.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'view from a tangier balcony over the strait of gibraltar, spain faint in haze, white wall foreground, small ceramic plate of olives, documentary editorial, salt-blue color palette, low contrast, film grain, medium format, 35mm, f/4 --ar 3:2',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/tangier-balcony.jpg',
  'balcony, tangier, lunch',
  '2026-03-22',
  true,
  1
),
(
  'chefchaouen-in-fog',
  'Chefchaouen, in fog',
  'travel',
  'Blue everything, and a morning that wouldn''t lift.',
  'Chefchaouen in February — blue walls, blue stairs, blue doors. The fog never lifted. I was glad.',
  'Two nights in Chefchaouen and the fog never lifted. Blue walls, blue stairs, blue doors — the whole town hand-painted into the colour of an idea. I drank mint tea on a wet step at eight in the morning and didn''t see another tourist for an hour. I was glad.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'narrow blue painted street in chefchaouen morocco in morning fog, wet stones, tea glass on a stoop, no people, documentary editorial, soft cool color, low contrast, film grain, medium format, 35mm, f/2.8 --ar 3:2',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/chefchaouen-fog.jpg',
  'morning, the upper medina',
  '2026-02-19',
  true,
  11
),
(
  'high-atlas-in-spring',
  'The High Atlas, in spring',
  'travel',
  'Snow on the peaks, almond blossom in the valley.',
  'A weekend in the High Atlas. Snow above, almond blossom below, a tagine slow on the fire.',
  'A weekend in a stone house in the Atlas. Snow on the peaks, almond blossom in the valley, a tagine slow on the fire. The neighbour came by with bread still warm and didn''t stay long enough to be thanked. I keep thinking about the silence up there.',
  false,
  null, null, null, null,
  ARRAY['moroccan', 'amazigh'],
  'high atlas valley in spring, snow capped peaks, almond trees in pink blossom, stone berber village, single woman walking, documentary editorial, muted natural color, low contrast, film grain, medium format, 35mm, f/4 --ar 3:2',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/atlas-spring.jpg',
  'valley road, almond blossom',
  '2026-03-14',
  true,
  12
)

ON CONFLICT (slug) DO NOTHING;
