// Map the friendly "Home Page Images" files to the exact uploads/ names the page expects.
// Usage: node make-uploads.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/daniel/Projects/Themes';
const SRC = path.join(ROOT, 'Home Page Images');
const PAGE = path.join(ROOT, 'Home/site_handoff/Home with Images.dc.html');
const DEST = path.join(ROOT, 'Home/site_handoff/uploads');
fs.mkdirSync(DEST, { recursive: true });

const page = fs.readFileSync(PAGE, 'utf8');
const refs = [...new Set([...page.matchAll(/uploads\/([^'"]+)/g)].map(m => decodeURIComponent(m[1])))];

const direct = {
  'buying.jpg': 'buying.jpg', 'conveyancing.jpg': 'conveyancing.jpg', 'lettings.jpg': 'lettings.jpg',
  'mortgages.jpg': 'mortgages.jpg', 'selling.jpg': 'selling.jpg', 'valuations.jpg': 'valuations.jpg',
  'hero video.mp4': 'hero video.mp4', 'one.jpg': 'home page section one.jpg', 'two .jpg': 'home page section two .jpg',
};
const houses = ['house 1.webp', 'house 2.webp', 'house 3.webp', 'house 4.webp', 'house 5.webp', 'house 6.webp'];
const videos = ['video review 1.png', 'video review 2.png', 'video review 3.png'];
const newsSub = ['home page section one.jpg', 'home page section two .jpg', 'cta banner.jpg']; // placeholders — no news photos supplied

const result = [], missing = [];
for (const ref of refs) {
  let src = null, note = '';
  if (direct[ref]) src = direct[ref];
  else if (/^cta banner-.*\.jpg$/.test(ref)) src = 'cta banner.jpg';
  else if (ref.endsWith('.webp')) src = houses.shift();
  else if (/^Stan_Smith.*\.png$/.test(ref)) src = videos.shift();
  else if (/^news\d/.test(ref)) { src = newsSub.shift(); note = ' (placeholder — no news image supplied)'; }
  if (!src || !fs.existsSync(path.join(SRC, src))) { missing.push(ref + (src ? ` (src "${src}" not found)` : ' (no mapping)')); continue; }
  fs.copyFileSync(path.join(SRC, src), path.join(DEST, ref));
  result.push(`${src}  →  uploads/${ref}${note}`);
}
console.log('COPIED ' + result.length + ' files:');
result.forEach(r => console.log('  ' + r));
if (missing.length) { console.log('\nUNMAPPED (' + missing.length + '):'); missing.forEach(m => console.log('  ' + m)); }
