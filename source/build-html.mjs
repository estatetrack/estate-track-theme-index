// Build a self-contained, shareable HTML from the Theme Index markdown.
// Downscales every referenced thumbnail to a web JPEG and base64-embeds it.
// Usage: node thumbnails/build-html.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = '/Users/daniel/Projects/Themes';
const MD = path.join(ROOT, 'Estate_Track_Theme_Index.md');
const OUT = path.join(ROOT, 'Estate_Track_Theme_Index.html');
const WEBDIR = path.join(ROOT, 'thumbnails', '_web');
fs.mkdirSync(WEBDIR, { recursive: true });

let md = fs.readFileSync(MD, 'utf8');

// ---------- image pre-pass: downscale + base64-embed ----------
const cache = new Map();
let embedded = 0, missing = 0;
function embed(rel, displayW) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) { missing++; return null; }
  const target = Math.min((displayW || 280) * 2, 1200);
  const key = rel + '@' + target;
  if (cache.has(key)) return cache.get(key);
  const outJpg = path.join(WEBDIR, rel.replace(/[\/]/g, '__').replace(/\.png$/, '') + '_' + target + '.jpg');
  try {
    if (!fs.existsSync(outJpg)) {
      execFileSync('sips', ['--resampleWidth', String(target), '-s', 'format', 'jpeg', '-s', 'formatOptions', '78', abs, '--out', outJpg], { stdio: 'ignore' });
    }
    const uri = 'data:image/jpeg;base64,' + fs.readFileSync(outJpg).toString('base64');
    cache.set(key, uri); embedded++; return uri;
  } catch { missing++; return null; }
}
md = md.replace(/<img\s+([^>]*?)src="(thumbnails\/[^"]+\.png)"([^>]*?)>/g, (m, pre, src, post) => {
  const wm = (pre + post).match(/width="(\d+)"/);
  const uri = embed(src, wm ? parseInt(wm[1], 10) : 280);
  return uri ? '<img ' + pre + 'src="' + uri + '"' + post + '>' : m;
});

// ---------- markdown -> html ----------
const SC = String.fromCharCode(0), ST = String.fromCharCode(1), SE = String.fromCharCode(2);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = t => t.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');

function inline(t) {
  const codes = [], tags = [];
  t = t.replace(/`([^`]+)`/g, (m, c) => { codes.push('<code>' + esc(c) + '</code>'); return SC + (codes.length - 1) + SE; });
  t = t.replace(/<img\b[^>]*>/g, m => { tags.push(m); return ST + (tags.length - 1) + SE; });
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, x, u) => '<a href="' + u + '">' + x + '</a>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[\s(])_([^_]+)_(?=$|[\s).,;:])/g, '$1<em>$2</em>');
  t = t.replace(/(^|[\s(])\*([^*]+)\*(?=$|[\s).,;:])/g, '$1<em>$2</em>');
  t = t.replace(new RegExp(ST + '(\\d+)' + SE, 'g'), (m, i) => tags[+i]);
  t = t.replace(new RegExp(SC + '(\\d+)' + SE, 'g'), (m, i) => codes[+i]);
  return t;
}
const isSep = s => /\|/.test(s) && /^[\s:|-]+$/.test(s.trim()) && s.includes('-');
function splitRow(line) { let s = line.trim(); if (s.startsWith('|')) s = s.slice(1); if (s.endsWith('|')) s = s.slice(0, -1); return s.split('|').map(c => c.trim()); }

function blocks(src) {
  const L = src.split('\n'); let h = '', i = 0;
  while (i < L.length) {
    const line = L[i];
    if (/^```/.test(line)) { const b = []; i++; while (i < L.length && !/^```/.test(L[i])) b.push(L[i++]); i++; h += '<pre><code>' + esc(b.join('\n')) + '</code></pre>\n'; continue; }
    if (/^\s*$/.test(line)) { i++; continue; }
    const hm = line.match(/^(#{1,6})\s+(.*)$/);
    if (hm) { const lv = hm[1].length, tx = hm[2].trim(); h += '<h' + lv + ' id="' + slug(tx) + '">' + inline(tx) + '</h' + lv + '>\n'; i++; continue; }
    if (/^---+\s*$/.test(line)) { h += '<hr/>\n'; i++; continue; }
    if (line.includes('|') && i + 1 < L.length && isSep(L[i + 1])) {
      const head = splitRow(line); i += 2; const rows = [];
      while (i < L.length && L[i].includes('|') && !/^\s*$/.test(L[i])) rows.push(splitRow(L[i++]));
      h += '<table><thead><tr>' + head.map(c => '<th>' + inline(c) + '</th>').join('') + '</tr></thead><tbody>' +
        rows.map(r => '<tr>' + r.map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table>\n';
      continue;
    }
    if (/^>\s?/.test(line)) { const b = []; while (i < L.length && /^>\s?/.test(L[i])) b.push(L[i++].replace(/^>\s?/, '')); h += '<blockquote>' + blocks(b.join('\n')) + '</blockquote>\n'; continue; }
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ord = /^\s*\d+\.\s+/.test(line); const b = [];
      while (i < L.length && /^\s*([-*]|\d+\.)\s+/.test(L[i])) b.push(L[i++].replace(/^\s*([-*]|\d+\.)\s+/, ''));
      const tg = ord ? 'ol' : 'ul'; h += '<' + tg + '>' + b.map(x => '<li>' + inline(x) + '</li>').join('') + '</' + tg + '>\n'; continue;
    }
    if (/^<\w+/.test(line)) { h += line + '\n'; i++; continue; }
    const b = [line]; i++;
    while (i < L.length && !/^\s*$/.test(L[i]) && !/^(#{1,6}\s|>|---+\s*$|```|\s*([-*]|\d+\.)\s+|<\w+)/.test(L[i]) && !(L[i].includes('|') && i + 1 < L.length && isSep(L[i + 1]))) b.push(L[i++]);
    h += '<p>' + inline(b.join(' ')) + '</p>\n';
  }
  return h;
}

const body = blocks(md);
const nav = [...body.matchAll(/<h([12]) id="([^"]+)">(.*?)<\/h\1>/g)].map(m => '<a class="lvl' + m[1] + '" href="#' + m[2] + '">' + m[3].replace(/<[^>]+>/g, '') + '</a>').join('');

const css = [
':root{--bg:#fbfaf7;--surface:#fff;--ink:#1f2530;--muted:#5b6472;--border:#e7e4dd;--accent:#3f7ea6;--primary:#2b3340}',
'*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:12px}',
'body{margin:0;font:16px/1.6 "Hanken Grotesk",system-ui,-apple-system,sans-serif;color:var(--ink);background:var(--bg)}',
'#nav{position:fixed;top:0;left:0;width:264px;height:100vh;overflow:auto;background:var(--primary);color:#e9ecf1;padding:18px 14px}',
'#nav h2{font:600 13px/1.3 "Hanken Grotesk";letter-spacing:.14em;text-transform:uppercase;color:#9fb0c2;margin:0 0 12px;padding:0 8px}',
'#nav a{display:block;padding:4px 8px;border-radius:7px;color:#c9d3df;text-decoration:none;font-size:13px}',
'#nav a.lvl1{margin-top:10px;font-weight:600;color:#fff;font-size:13.5px}',
'#nav a.lvl2{padding-left:18px;color:#aebccb;font-size:12.5px}',
'#nav a:hover{background:rgba(255,255,255,.08);color:#fff}',
'#main{margin-left:264px;max-width:920px;padding:40px 48px 120px}',
'h1{font:600 30px/1.15 "Newsreader",Georgia,serif;color:var(--primary);margin:54px 0 6px;padding-top:26px;border-top:3px solid var(--border)}',
'#main>h1:first-of-type{border-top:none;padding-top:0;margin-top:0;font-size:38px}',
'h2{font:600 23px/1.2 "Newsreader",serif;color:var(--primary);margin:34px 0 10px}',
'h3{font:600 17px/1.3 "Hanken Grotesk";color:var(--accent);margin:30px 0 8px;padding-top:6px}',
'p{margin:10px 0}a{color:var(--accent)}',
'img{max-width:100%;height:auto;border:1px solid var(--border);border-radius:10px;box-shadow:0 6px 18px rgba(20,24,33,.08);margin:6px 0;background:#fff}',
'hr{border:none;border-top:1px solid var(--border);margin:26px 0}',
'ul,ol{margin:10px 0;padding-left:22px}li{margin:5px 0}',
'code{font:13px/1.4 ui-monospace,Menlo,monospace;background:#eef1f4;color:#324155;padding:1.5px 6px;border-radius:5px}',
'pre{background:#1f2530;color:#e9ecf1;padding:14px 16px;border-radius:10px;overflow:auto}pre code{background:none;color:inherit;padding:0}',
'blockquote{margin:14px 0;padding:8px 16px;border-left:4px solid var(--accent);background:#f1f5f8;border-radius:0 8px 8px 0;color:#33414f}',
'table{border-collapse:collapse;width:100%;margin:14px 0;font-size:14px;background:var(--surface);border:1px solid var(--border);border-radius:10px;overflow:hidden}',
'th,td{border:1px solid var(--border);padding:9px 12px;text-align:left;vertical-align:top}',
'th{background:#f0ede6;font-weight:600}tr:nth-child(even) td{background:#faf9f6}',
'td img{box-shadow:none;margin:0}',
'@media print{#nav{display:none}#main{margin-left:0;max-width:none}}',
'@media(max-width:820px){#nav{position:static;width:auto;height:auto}#main{margin-left:0;padding:20px}}'
].join('\n');

const htmlDoc = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">\n' +
'<meta name="viewport" content="width=device-width,initial-scale=1">\n' +
'<title>Estate Track — "Home" Theme Index</title>\n' +
'<link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;600&family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">\n' +
'<style>' + css + '</style></head><body>\n' +
'<nav id="nav"><h2>Contents</h2>' + nav + '</nav>\n' +
'<main id="main">' + body + '</main>\n</body></html>';

fs.writeFileSync(OUT, htmlDoc);
const mb = (Buffer.byteLength(htmlDoc) / 1048576).toFixed(1);
console.log('Wrote ' + OUT + '  (' + mb + ' MB, ' + embedded + ' images embedded, ' + missing + ' missing/skipped, ' + (nav.split('</a>').length - 1) + ' nav entries)');
