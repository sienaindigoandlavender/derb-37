// Glossary of Moroccan cuisine and medina terms — written in J. Ng's voice,
// short, definitive, citable. Used by /glossary and emitted as a
// schema.org DefinedTermSet so AI engines can lift definitions cleanly.

export type GlossaryEntry = {
  term: string;
  /** Optional alternative spelling shown alongside the headword. */
  also?: string;
  /** Marked with lang="ar" on the rendered page. */
  arabic?: boolean;
  /** kitchen | medina | rite */
  group: 'kitchen' | 'medina' | 'rite';
  /** A definition. One or two short sentences. No fluff. */
  definition: string;
};

export const GLOSSARY: GlossaryEntry[] = [
  // ============ KITCHEN ============
  {
    term: 'harira',
    arabic: true,
    group: 'kitchen',
    definition:
      'The Moroccan tomato-and-lentil soup of Ramadan. Lentils, chickpeas, fresh tomato, coriander, parsley, cumin, ginger, saffron, a finishing thread of flour-water, cinnamon at the end.',
  },
  {
    term: 'bissara',
    arabic: true,
    group: 'kitchen',
    definition:
      'A thick fava bean soup, eaten in winter. Olive oil, cumin, and paprika on top. A breakfast soup in some regions, a supper soup in others.',
  },
  {
    term: 'tagine',
    also: 'tajine',
    arabic: true,
    group: 'kitchen',
    definition:
      'Both the conical clay cooking pot and the slow-braised dish that lives in it. The lid traps and recycles steam, so meat braises in its own moisture for hours.',
  },
  {
    term: 'tanjia',
    arabic: true,
    group: 'kitchen',
    definition:
      'A Marrakchi dish — lamb, preserved lemon, cumin, garlic — slow-cooked for hours in a tall clay urn, traditionally in the embers of a hammam fire.',
  },
  {
    term: 'mechoui',
    arabic: true,
    group: 'kitchen',
    definition:
      'Whole lamb, slow-roasted for several hours in a pit oven. The shoulder pulls apart with two fingers. Feast-day food.',
  },
  {
    term: 'khobz',
    arabic: true,
    group: 'kitchen',
    definition:
      'The everyday round bread of Morocco. Wheat and semolina, low-baked, often carried to the communal oven on a wooden board.',
  },
  {
    term: 'msemen',
    arabic: true,
    group: 'kitchen',
    definition:
      'A square, layered flatbread folded and folded again, then cooked on a hot pan. Sweet for breakfast with honey, savoury for tea.',
  },
  {
    term: 'baghrir',
    arabic: true,
    group: 'kitchen',
    definition:
      'The thousand-hole pancake — a yeasted batter cooked on one side only, lacy with bubbles on top. Served with butter and honey.',
  },
  {
    term: 'chebakia',
    arabic: true,
    group: 'kitchen',
    definition:
      'A sesame-and-flour Ramadan sweet, fried into a flower shape and dipped in hot honey. Eaten at iftar alongside harira.',
  },
  {
    term: 'ghoriba',
    arabic: true,
    group: 'kitchen',
    definition:
      'Moroccan shortbread biscuits, cracked on top, made with almonds, semolina, or coconut. Tea-time food.',
  },
  {
    term: 'zaalouk',
    arabic: true,
    group: 'kitchen',
    definition:
      'A cooked salad-mezze of aubergine, tomato, garlic, cumin, and olive oil. Served cold with bread.',
  },
  {
    term: 'taktouka',
    arabic: true,
    group: 'kitchen',
    definition:
      'A slow-cooked tomato-and-pepper salad — green peppers charred, tomatoes broken down, lemon and paprika to finish. Eaten cold.',
  },
  {
    term: 'charmoula',
    arabic: true,
    group: 'kitchen',
    definition:
      'A herb marinade for fish — coriander, parsley, cumin, paprika, lemon, garlic, olive oil. Goes onto the fish before the fish goes into the oven.',
  },
  {
    term: 'ras el hanout',
    arabic: true,
    group: 'kitchen',
    definition:
      'A house spice blend, name from the Arabic for "top of the shop". No two are the same — typically ten to twenty spices, ground fresh.',
  },
  {
    term: 'smen',
    arabic: true,
    group: 'kitchen',
    definition:
      'Aged butter, salted, sometimes herbed, left to develop for months or years. A spoonful goes into couscous or harira at the table. Acquired.',
  },
  {
    term: 'preserved lemon',
    group: 'kitchen',
    definition:
      'Small thin-skinned lemons, quartered, packed in salt and lemon juice for six weeks. Use the rind, not the flesh.',
  },

  // ============ MEDINA ============
  {
    term: 'derb',
    arabic: true,
    group: 'medina',
    definition:
      'A small alley in a Moroccan medina — often dead-end, often known by a family name. The address of this house.',
  },
  {
    term: 'medina',
    arabic: true,
    group: 'medina',
    definition:
      'The walled old city of a Moroccan town. Cars do not fit; donkeys do. Marrakech has one of the largest in North Africa.',
  },
  {
    term: 'mellah',
    arabic: true,
    group: 'medina',
    definition:
      'The historic Jewish quarter of a Moroccan city. In Marrakech, also the source of the best fish in the medina.',
  },
  {
    term: 'souk',
    arabic: true,
    group: 'medina',
    definition:
      'A market. In a Marrakech medina, often one trade per alley — a souk of dyers, a souk of slipper-makers, a souk of brass.',
  },
  {
    term: 'riad',
    arabic: true,
    group: 'medina',
    definition:
      'A traditional Moroccan house turned inward, around a central courtyard with a fountain. Blank walls to the street. The sky is the only wall facing out.',
  },
  {
    term: 'zellige',
    arabic: true,
    group: 'medina',
    definition:
      'Hand-cut tile mosaic, set in geometric patterns. Cooler at six in the morning than at four in the afternoon. The signature surface of a riad.',
  },
  {
    term: 'ksour',
    arabic: true,
    group: 'medina',
    definition:
      'Plural of ksar — a fortified earthen quarter. Also the name of the quarter of the Marrakech medina where Derb 37 is found.',
  },

  // ============ RITE ============
  {
    term: 'iftar',
    arabic: true,
    group: 'rite',
    definition:
      'The breaking of the fast just after sunset during Ramadan. Begins with dates and water, then harira, eggs, chebakia, bread.',
  },
  {
    term: 'Eid al-Fitr',
    arabic: true,
    group: 'rite',
    definition:
      'The feast that closes Ramadan. Sweets first — chebakia, ghoriba, baghrir with honey — before any savoury food.',
  },
  {
    term: 'Eid al-Adha',
    arabic: true,
    group: 'rite',
    definition:
      'The feast of sacrifice. Lamb, every part of it. Mechoui from a pit oven on the first day; tanjia, brochettes, offal stews on the days after.',
  },
];

export const GLOSSARY_GROUPS: { slug: 'kitchen' | 'medina' | 'rite'; label: string; intro: string }[] = [
  {
    slug: 'kitchen',
    label: 'In the kitchen',
    intro: 'The cooking words — pots, breads, soups, the spice jar.',
  },
  {
    slug: 'medina',
    label: 'In the medina',
    intro: 'The address — derbs, souks, walls, the courtyard inside.',
  },
  {
    slug: 'rite',
    label: 'In the calendar',
    intro: 'The days that have their own table.',
  },
];
