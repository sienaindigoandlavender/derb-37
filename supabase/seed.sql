-- Derb 37 — Seed notes
-- Three short notes, one per pillar, so the site renders on first deploy.
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
  'My hands needed to remember the folding.',
  'Lamb and preserved lemon dumplings. The pleat is the same as my grandmother''s.',
  'Lamb and preserved lemon, folded into thin wonton skins on a Tuesday in January. The pleat is the same as my grandmother''s. The kitchen smells of cumin and sesame at once.',
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

Wet the rim of a wrapper, drop a teaspoon of filling, fold to a half-moon, pleat the seam.

Steam over rolling water for eight minutes. Eat at the counter with chilli oil and black vinegar.',
  ARRAY['chinese', 'moroccan'],
  'overhead view of folded dumplings on dark wood counter, scattered preserved lemon zest, linen cloth corner, late morning kitchen light, documentary editorial, muted color, soft natural light, low contrast, film grain, medium format, 35mm, f/2.8 --ar 4:5',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/dumplings.jpg',
  'kitchen counter, late morning',
  '2026-01-14',
  true,
  1
),
(
  'cannon-at-iftar',
  'The cannon, at iftar',
  'morocco',
  'The minute before sunset, on the rooftop.',
  'A few minutes before iftar on the rooftop. The cannon goes off and the spoons start.',
  'Rooftop, the minute before sunset. The cannon from the Koutoubia. Then the spoons — every house, all at once. The whole derb smells of harira for thirty seconds. Eleven Ramadans and I still come up here for it.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'rooftop in marrakech medina at iftar, soft apricot evening light, koutoubia minaret distant, terracotta walls, single tagine and tea glass, documentary editorial, muted warm color, low contrast, film grain, medium format, 50mm, f/2.8 --ar 3:4',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/iftar-rooftop.jpg',
  'rooftop, the minute before the cannon',
  '2026-03-02',
  true,
  2
),
(
  'a-week-in-essaouira',
  'A week in Essaouira',
  'travel',
  'Three hours west, salt in the air.',
  'A week in Essaouira — sardines on the grill, the wind, the same blue everywhere.',
  'Three hours west of Marrakech and the air goes salt. Sardines on the grill at the port four days running. Blue boats, blue doors, blue overalls. Came home with sand in everything and a small jar of argan oil.',
  false,
  null, null, null, null,
  ARRAY['moroccan'],
  'wide shot of essaouira port at low light, blue painted fishing boats lined along harbour wall, white seabirds, documentary editorial, salt-flat light, slightly desaturated blues, film grain --ar 3:2',
  'https://res.cloudinary.com/[ACCOUNT]/derb37/essaouira-port.jpg',
  'port, late afternoon, day four',
  '2026-04-08',
  true,
  3
)
ON CONFLICT (slug) DO NOTHING;
