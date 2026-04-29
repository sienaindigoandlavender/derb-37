-- Derb 37 — Supabase schema
-- Run this in the Supabase SQL Editor for the project assigned to derb37.com.
-- This file is intentionally excluded from any zip artifact produced for the
-- site build (per build instructions); commit it to git so it can be re-run.

-- ============ ENTRIES ============

CREATE TABLE IF NOT EXISTS entries (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  pillar TEXT NOT NULL CHECK (pillar IN ('kitchen', 'morocco', 'travel')),
  subtitle TEXT,
  excerpt TEXT,
  story_body TEXT,
  has_recipe BOOLEAN DEFAULT false,
  recipe_title TEXT,
  recipe_yield TEXT,
  recipe_sections JSONB,
  recipe_method TEXT,
  cultural_origins TEXT[],
  season TEXT,
  image_prompt TEXT,
  hero_image TEXT,
  hero_caption TEXT,
  images JSONB,
  entry_date DATE NOT NULL,
  published BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS entries_pillar_idx ON entries(pillar) WHERE published = true;
CREATE INDEX IF NOT EXISTS entries_published_idx ON entries(published, entry_date DESC);

-- ============ SETTINGS ============

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO settings (key, value) VALUES
  ('site_title', 'Derb 37'),
  ('site_tagline', 'a journal from a house in the medina'),
  ('volume', 'Vol. I'),
  ('issue', 'No. III'),
  ('season_label', 'Spring 2026')
ON CONFLICT (key) DO NOTHING;

-- ============ RLS ============

ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public reads published entries" ON entries;
CREATE POLICY "public reads published entries" ON entries
  FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "public reads settings" ON settings;
CREATE POLICY "public reads settings" ON settings
  FOR SELECT USING (true);
