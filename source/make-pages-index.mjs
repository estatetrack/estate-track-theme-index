// Generate a clickable index.html for the live theme pages.
// Usage: node make-pages-index.mjs <siteDir>
import fs from 'node:fs';
import path from 'node:path';

const SITE = process.argv[2];
if (!SITE) { console.error('pass the site dir'); process.exit(1); }
const enc = s => encodeURIComponent(s);
const has = f => fs.existsSync(path.join(SITE, f));
const resolve = base => [base + '.html', base + '.dc.html'].find(has) || null; // prefer new .html bundles

const groups = [
  ['Home', ['Home - Buttons hero', 'Home - Search hero', 'Home - Form hero', 'Home - Image hero']],
  ['Mobile (full-screen)', ['Mobile - Buttons hero', 'Mobile - Search hero', 'Mobile - Form hero', 'Mobile - Property Listings']],
  ['Global elements', ['Promo Modal', 'Cookie Consent', 'Promo Modal & Cookie Consent']],
  ['Section demos', ['Image Sections', 'Text Sections', 'Video Sections']],
  ['Properties & search', ['Property Listings', 'Single Property', 'Development Search', 'Individual Development']],
  ['Valuation & lead capture', ['Valuation Overview', 'Instant Valuation', 'Instant Valuation Landing', 'Book a Valuation', 'Book a Valuation with Diary', 'Virtual Valuation', 'Property & Area Report']],
  ['Appraisals', ['Pre-Val Pack', 'Post-Val Proposal']],
  ['Branches & people', ['Meet the Team', 'Single Team Member', 'Agent Listings', 'Branch Listings', 'Find an Agent', 'Branches Overview', 'Branch Contact']],
  ['Area & market data', ['Area Guide & Data Overview', 'Individual Area Guide', 'Individual Market Data']],
  ['Content & social proof', ['News Listings', 'Single News Article', 'Testimonials Listings', 'Video Testimonials', 'Leave a Review']],
  ['Services & company', ['About', 'Services', 'Individual Service', 'Pricing & Fees', 'Register', 'General Enquiries']],
  ['Legal & utility', ['Sitemap', 'FAQs', 'Legal']],
  ['Shared components', ['PropertyCard', 'NewsCard', 'TestimonialCard', 'VideoTestimonialCard', 'FilterSelect', 'Style Foundation']],
];

let body = '';
let count = 0;
for (const [title, names] of groups) {
  const items = names.map(n => { const f = resolve(n); if (!f) return null; count++; return `<a href="./${f.split('/').map(enc).join('/')}">${n}</a>`; }).filter(Boolean);
  if (items.length) body += `<h2>${title}</h2>\n<div class="grid">${items.join('')}</div>\n`;
}
// (legacy "Mobile Screens/" phone-frame demos are no longer listed — superseded by the full-screen Mobile group above)

const css = `
:root{--bg:#fbfaf7;--surface:#fff;--ink:#1f2530;--muted:#5b6472;--border:#e7e4dd;--accent:#3f7ea6;--primary:#2b3340}
*{box-sizing:border-box}body{margin:0;font:16px/1.6 "Hanken Grotesk",system-ui,sans-serif;color:var(--ink);background:var(--bg)}
header{background:var(--primary);color:#fff;padding:34px 40px}
header h1{font:600 30px/1.15 "Newsreader",Georgia,serif;margin:0 0 6px}
header p{margin:0;color:#c9d3df;font-size:15px}
header a{color:#9fd0ea}
main{max-width:1000px;margin:0 auto;padding:24px 40px 80px}
h2{font:600 19px/1.2 "Newsreader",serif;color:var(--primary);margin:30px 0 12px;border-bottom:1px solid var(--border);padding-bottom:6px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
.grid a{display:block;padding:12px 14px;background:var(--surface);border:1px solid var(--border);border-radius:9px;text-decoration:none;color:var(--ink);font-size:14.5px;font-weight:500;transition:.15s}
.grid a:hover{border-color:var(--accent);box-shadow:0 4px 14px rgba(20,24,33,.08);transform:translateY(-1px);color:var(--accent)}
@media(max-width:620px){header,main{padding-left:20px;padding-right:20px}}
`;
const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Estate Track — "Home" Theme · Live pages</title>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;600&family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${css}</style></head><body>
<header><h1>Estate Track — "Home" Theme · Live pages</h1>
<p>${count} live pages — click any to view the rendered page. &nbsp;·&nbsp; <a href="https://estate-track-theme-index.vercel.app">Open the documented Index &amp; Blueprint →</a></p></header>
<main>${body}</main></body></html>`;
fs.writeFileSync(path.join(SITE, 'index.html'), html);
console.log('wrote index.html with', count, 'page links');
