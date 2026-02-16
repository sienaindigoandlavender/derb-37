#!/bin/bash
# Run this after unzipping on macOS:
#   cd derb37 && bash setup.sh
#
# Renames __slug__ to [slug] (macOS unzip mangles square brackets)

if [ -d "app/__slug__" ]; then
  mv "app/__slug__" "app/[slug]"
  echo "✓ Renamed app/__slug__ → app/[slug]"
else
  if [ -d "app/[slug]" ]; then
    echo "✓ app/[slug] already exists"
  else
    echo "✗ Neither app/__slug__ nor app/[slug] found — check your extraction"
  fi
fi

echo ""
echo "Next steps:"
echo "  1. npm install"
echo "  2. Add Supabase env vars on Vercel"
echo "  3. Run schema.sql in Supabase SQL editor"
echo "  4. vercel deploy"
