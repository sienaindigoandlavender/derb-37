export const PILLARS = {
  kitchen: {
    label: 'Kitchen',
    color: 'herb',
    colorHex: '#5a7247',
    description: 'What I cook, where I find it, and what the souk looked like this morning',
    href: '/kitchen',
    lanes: {
      jacquelines_kitchen: { label: "Jacqueline's Kitchen", description: 'What happens when Hong Kong meets Marrakech.' },
      pantry: { label: 'Pantry Notes', description: 'Ingredients, techniques, market guides.' },
    },
  },
  culture: {
    label: 'Culture',
    color: 'saffron',
    colorHex: '#c9a04a',
    description: 'Ramadan rhythms, neighborhood life, the derb at dusk',
    href: '/culture',
    lanes: null,
  },
  walls: {
    label: 'Behind the Walls',
    color: 'clay',
    colorHex: '#b8856e',
    description: 'Tadelakt, zellige, courtyard light, the house as a living thing',
    href: '/behind-the-walls',
    lanes: null,
  },
} as const;

export type PillarKey = keyof typeof PILLARS;

export function getPillarConfig(key: string) {
  return PILLARS[key as PillarKey] || null;
}

export function getPillarColorClass(pillar: string): string {
  const map: Record<string, string> = {
    kitchen: 'text-herb',
    culture: 'text-saffron',
    walls: 'text-clay',
  };
  return map[pillar] || 'text-muted';
}

export function getPillarBgClass(pillar: string): string {
  const map: Record<string, string> = {
    kitchen: 'bg-herb',
    culture: 'bg-saffron',
    walls: 'bg-clay',
  };
  return map[pillar] || 'bg-muted';
}
