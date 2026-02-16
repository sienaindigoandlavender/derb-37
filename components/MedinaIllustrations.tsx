// Medina-inspired SVG line illustrations
// The HeaderTagine replaces Mimi's wreath at the top of the page
// The small icons appear between posts like her pig/utensil drawings

// Large tagine for header — prominent, like Mimi's wreath
export function HeaderTagine({ className = '' }: { className?: string }) {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Lid knob */}
      <circle cx="60" cy="10" r="5" />
      {/* Steam curls */}
      <path d="M54 6 C52 0 56 -4 54 -8" strokeWidth="1" opacity="0.35" />
      <path d="M66 6 C68 0 64 -4 66 -8" strokeWidth="1" opacity="0.35" />
      <path d="M60 5 C60 1 62 -2 60 -6" strokeWidth="1" opacity="0.25" />
      {/* Conical lid */}
      <path d="M60 15 C60 15 64 30 74 42 C82 50 92 56 95 58" />
      <path d="M60 15 C60 15 56 30 46 42 C38 50 28 56 25 58" />
      {/* Decorative band on lid */}
      <path d="M36 48 C44 52 76 52 84 48" strokeWidth="1" opacity="0.35" />
      {/* Zigzag pattern on lid */}
      <path d="M42 44 L45 40 L48 44 L51 40 L54 44 L57 40 L60 44 L63 40 L66 44 L69 40 L72 44 L75 40 L78 44" strokeWidth="0.8" opacity="0.25" />
      {/* Base dish */}
      <ellipse cx="60" cy="60" rx="40" ry="10" />
      {/* Base shadow */}
      <path d="M25 65 C35 72 85 72 95 65" strokeWidth="0.8" opacity="0.2" />
      {/* Small decorative dots on base */}
      <circle cx="40" cy="60" r="1.5" opacity="0.2" />
      <circle cx="50" cy="58" r="1.5" opacity="0.2" />
      <circle cx="60" cy="57" r="1.5" opacity="0.2" />
      <circle cx="70" cy="58" r="1.5" opacity="0.2" />
      <circle cx="80" cy="60" r="1.5" opacity="0.2" />
    </svg>
  );
}

// Small tagine icon — between date and category in each post
export function SmallTagineSVG({ className = '' }: { className?: string }) {
  return (
    <svg width="28" height="24" viewBox="0 0 40 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="20" cy="4" r="2" />
      <path d="M20 6 C20 6 22 12 26 16 C29 19 32 20 32 20" />
      <path d="M20 6 C20 6 18 12 14 16 C11 19 8 20 8 20" />
      <ellipse cx="20" cy="22" rx="14" ry="4" />
    </svg>
  );
}

// Divider icons for between posts
function MintTeaSmall({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="30" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 12 L6 32 C6 35 10 36 15 36 C20 36 24 35 24 32 L22 12" />
      <ellipse cx="15" cy="12" rx="7" ry="2.5" />
      <path d="M15 10 L15 6" />
      <path d="M15 8 C13 7 12 8 13 9" strokeWidth="0.8" />
      <path d="M15 7 C17 6 18 7 17 8" strokeWidth="0.8" />
    </svg>
  );
}

function ArchSmall({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="28" viewBox="0 0 30 35" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 33 L5 15 C5 6 15 2 15 2 C15 2 25 6 25 15 L25 33" />
      <path d="M8 33 L8 16 C8 9 15 5 15 5 C15 5 22 9 22 16 L22 33" strokeWidth="0.7" opacity="0.5" />
    </svg>
  );
}

function ZelligeSmall({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="15,2 18,10 26,8 20,14 26,22 18,19 15,28 12,19 4,22 10,14 4,8 12,10" opacity="0.6" />
    </svg>
  );
}

function SpiceSmall({ className = '' }: { className?: string }) {
  return (
    <svg width="22" height="28" viewBox="0 0 30 35" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 5 C10 5 4 22 5 25 C6 28 24 28 25 25 C26 22 20 5 15 5Z" />
      <path d="M10 15 C12 16 18 16 20 15" strokeWidth="0.5" opacity="0.3" />
      <path d="M8 20 C11 22 19 22 22 20" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

function BreadSmall({ className = '' }: { className?: string }) {
  return (
    <svg width="28" height="20" viewBox="0 0 36 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="18" cy="14" rx="14" ry="8" />
      <path d="M18 7 L18 21" strokeWidth="0.6" opacity="0.35" />
      <path d="M5 14 L31 14" strokeWidth="0.6" opacity="0.35" />
    </svg>
  );
}

function FountainSmall({ className = '' }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="15" cy="15" r="11" opacity="0.5" />
      <circle cx="15" cy="15" r="6" opacity="0.3" />
      <circle cx="15" cy="15" r="2.5" opacity="0.2" />
    </svg>
  );
}

const DIVIDER_ICONS = [SmallTagineSVG, MintTeaSmall, ArchSmall, ZelligeSmall, SpiceSmall, BreadSmall, FountainSmall];

// Divider between posts — centered small illustration
export function MedinaDivider({ index = 0 }: { index?: number }) {
  const Icon = DIVIDER_ICONS[index % DIVIDER_ICONS.length];
  return (
    <div className="flex justify-center py-6">
      <Icon className="text-[#bbb]" />
    </div>
  );
}
