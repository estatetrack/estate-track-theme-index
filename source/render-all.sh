#!/bin/bash
# Render thumbnails + manifests for every .dc.html page.
cd /Users/daniel/Projects/Themes || exit 1
SRC="Home/site_handoff"
LOG="thumbnails/render.log"
: > "$LOG"
count=0; ok=0; fail=0
for f in "$SRC"/*.dc.html; do
  name="$(basename "$f")"
  slug="$(echo "$name" | sed 's/\.dc\.html$//' | tr '[:upper:]' '[:lower:]' | sed 's/&/and/g; s/[^a-z0-9]\+/-/g; s/^-//; s/-$//')"
  count=$((count+1))
  if node thumbnails/shoot.mjs "$name" "$slug" >>"$LOG" 2>&1; then
    ok=$((ok+1)); echo "[$count] OK   $slug"
  else
    fail=$((fail+1)); echo "[$count] FAIL $slug"
  fi
done
echo "DONE total=$count ok=$ok fail=$fail" | tee -a "$LOG"
