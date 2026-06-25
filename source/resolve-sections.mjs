// Map each section slug to a representative crop, verify via snippet, write map.
import fs from 'node:fs';
import path from 'node:path';
const ROOT = '/Users/daniel/Projects/Themes/thumbnails';

// slug -> [pageSlug, secIndex(1-based)]  (representative instance)
const MAP = {
  'hero-home': ['home', 1], 'topbar+header': ['home', 2], 'footer': ['home', 13],
  'image-text-split': ['home', 3], 'stats-band': ['home', 5], 'featured-properties': ['home', 6],
  'services-grid': ['home', 7], 'video-testimonials': ['home', 8], 'testimonials-slider': ['home', 9],
  'cta-banner': ['home', 10], 'latest-news': ['home', 11], 'newsletter': ['home', 12],
  'hero-internal': ['about', 1], 'property-search': ['property-listings', 3],
  'property-media': ['single-property', 3], 'property-header': ['single-property', 4],
  'property-material-info': ['single-property', 5], 'property-local-area': ['single-property', 6],
  'property-tools': ['single-property', 7], 'property-viewing': ['single-property', 8],
  'similar-properties': ['single-property', 9], 'sell-prompt': ['single-property', 10],
  'development-search': ['development-search', 3], 'development-media': ['individual-development', 3],
  'development-header': ['individual-development', 4], 'development-plots': ['individual-development', 5],
  'valuation-chooser': ['valuation-overview', 3], 'valuation-form': ['instant-valuation', 3],
  'virtual-valuation-explainer': ['virtual-valuation', 3], 'faq-accordion': ['faqs', 3],
  'report-tabs': ['property-and-area-report', 2], 'report-property': ['property-and-area-report', 3],
  'preval-hero': ['pre-val-pack', 1], 'preval-valuer': ['pre-val-pack', 3],
  'postval-hero': ['post-val-proposal', 1], 'postval-comparables': ['post-val-proposal', 5],
  'team-grid': ['meet-the-team', 3], 'team-member-profile': ['single-team-member', 3],
  'branch-list': ['branches-overview', 3], 'branch-detail': ['branch-contact', 3],
  'area-hub': ['area-guide-and-data-overview', 3], 'area-guide': ['individual-area-guide', 3],
  'market-data': ['individual-market-data', 4], 'news-index': ['news-listings', 3],
  'news-article': ['single-news-article', 1], 'testimonials-list': ['testimonials-listings', 3],
  'fees-table': ['pricing-and-fees', 3], 'register-form': ['register', 3],
  'review-form': ['leave-a-review', 3], 'enquiry-form': ['general-enquiries', 3],
  'sitemap-index': ['sitemap', 3], 'service-detail': ['individual-service', 3],
  'agent-finder': ['find-an-agent', 3], 'rich-text': ['about', 3],
  'three-up-cards': ['services', 5], 'logo-carousel': ['about', 7],
};
const out = {};
for (const [slug, [page, idx]] of Object.entries(MAP)) {
  const mf = path.join(ROOT, page, 'manifest.json');
  if (!fs.existsSync(mf)) { console.log(`✗ ${slug}: no manifest ${page}`); continue; }
  const m = JSON.parse(fs.readFileSync(mf, 'utf8'));
  const sec = m.sections[idx - 1];
  if (!sec) { console.log(`✗ ${slug}: ${page} has no sec ${idx}`); continue; }
  const rel = `thumbnails/${page}/${sec.file}`;
  out[slug] = rel;
  console.log(`${slug.padEnd(26)} -> ${rel.padEnd(46)} « ${sec.txt.slice(0, 46)} »`);
}
fs.writeFileSync(path.join(ROOT, 'section-thumbs.json'), JSON.stringify(out, null, 2));
console.log('\nwrote', Object.keys(out).length, 'mappings to section-thumbs.json');
