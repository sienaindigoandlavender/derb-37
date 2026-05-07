// Pre-build hook: write the IndexNow ownership keyfile into public/ if
// IDX_KEY is set. IndexNow servers fetch https://derb37.com/<KEY>.txt
// to verify ownership before accepting submissions.
//
// Skips silently if IDX_KEY is unset (local builds, preview branches).

import { mkdirSync, writeFileSync, readdirSync, unlinkSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

const key = process.env.IDX_KEY;
if (!key) {
  console.log('[indexnow] IDX_KEY unset — skipping keyfile setup.');
  process.exit(0);
}

if (!/^[a-f0-9]{8,128}$/i.test(key)) {
  console.warn('[indexnow] IDX_KEY does not look like a hex string — skipping.');
  process.exit(0);
}

mkdirSync(PUBLIC_DIR, { recursive: true });

// Clean up any stale IndexNow keyfiles (rotated keys, accidental commits).
for (const name of readdirSync(PUBLIC_DIR)) {
  if (/^[a-f0-9]{8,128}\.txt$/i.test(name) && name !== `${key}.txt`) {
    try {
      unlinkSync(join(PUBLIC_DIR, name));
      console.log(`[indexnow] removed stale keyfile ${name}`);
    } catch {}
  }
}

const target = join(PUBLIC_DIR, `${key}.txt`);
writeFileSync(target, key, 'utf8');

try {
  const size = statSync(target).size;
  console.log(`[indexnow] wrote ${key.slice(0, 6)}…${key.slice(-4)}.txt (${size}B)`);
} catch {
  console.log('[indexnow] keyfile written.');
}
