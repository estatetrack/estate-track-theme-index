// Capture each card type at actual size (clipped to the element).
// Usage: node cards.mjs   → writes thumbnails/cards/<label>.png + cards.json
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const PORT = 9222, BASE = 'http://localhost:8765', ROOT = '/Users/daniel/Projects/Themes';
const OUT = path.join(ROOT, 'thumbnails', 'cards');
fs.mkdirSync(OUT, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
function hr(p, m = 'GET') { return new Promise((res, rej) => { const r = http.request({ host: 'localhost', port: PORT, path: p, method: m }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d || '{}')); } catch { res(d); } }); }); r.on('error', rej); r.end(); }); }
class CDP { constructor(u){this.ws=new WebSocket(u);this.id=0;this.cbs=new Map();} open(){return new Promise((res,rej)=>{this.ws.onopen=()=>res();this.ws.onerror=()=>rej(new Error('ws'));this.ws.onmessage=ev=>{const m=JSON.parse(ev.data);if(m.id&&this.cbs.has(m.id)){const{resolve,reject}=this.cbs.get(m.id);this.cbs.delete(m.id);m.error?reject(new Error(JSON.stringify(m.error))):resolve(m.result);}};});} send(method,params={}){const id=++this.id;return new Promise((resolve,reject)=>{this.cbs.set(id,{resolve,reject});this.ws.send(JSON.stringify({id,method,params}));});} }

const FINDERS = {
  prop: `[...document.querySelectorAll('article')].find(el=>{const t=el.textContent||'';return /£[\\d,]/.test(t)&&/bed|pcm/i.test(t)})`,
  popup: `(()=>{const a=[...document.querySelectorAll('article')].find(el=>{const t=el.textContent||'';const r=el.getBoundingClientRect();return /£[\\d,]/.test(t)&&r.width>180&&r.width<420&&getComputedStyle(el).position!=='static'});return a||[...document.querySelectorAll('article')].find(el=>/£[\\d,]/.test(el.textContent||''))})()`,
  card: `document.querySelector('article') || [...document.querySelectorAll('div')].find(el=>{const cs=getComputedStyle(el);const r=el.getBoundingClientRect();return parseFloat(cs.borderTopLeftRadius)>3 && cs.boxShadow!=='none' && r.width>200 && r.width<760 && r.height>120})`,
};
const CARDS = [
  { label: 'property-card-grid', page: 'Property Listings.html', pre: [], find: FINDERS.prop },
  { label: 'property-card-list', page: 'Property Listings.html', pre: [{ click: 'List' }, { wait: 600 }], find: FINDERS.prop },
  { label: 'property-card-map', page: 'Property Listings.html', pre: [{ click: 'Map' }, { wait: 800 }, { clickRe: '£' }, { wait: 500 }], find: FINDERS.popup },
  { label: 'testimonial-card', page: 'Testimonials Listings.dc.html', pre: [{ wait: 500 }], find: `[...document.querySelectorAll('div')].find(el=>{const t=el.textContent||'';const r=el.getBoundingClientRect();return /★/.test(t)&&/(google|trustpilot)/i.test(t)&&!/verified reviews|rated excellent/i.test(t)&&r.width>=340&&r.width<=400&&r.height>=200&&r.height<=440})` },
  { label: 'video-review-card', page: 'Video Testimonials.dc.html', pre: [{ wait: 500 }], find: `[...document.querySelectorAll('article,div')].find(el=>{const t=el.textContent||'';const r=el.getBoundingClientRect();return /\\d:\\d\\d/.test(t)&&r.width>240&&r.width<480&&r.height>200&&el.querySelectorAll('*').length<55})` },
  { label: 'news-card', page: 'News Listings.dc.html', pre: [{ wait: 500 }], find: `[...document.querySelectorAll('article,a,div')].find(el=>{const t=el.textContent||'';const r=el.getBoundingClientRect();const cs=getComputedStyle(el);return /min read/i.test(t)&&r.width>240&&r.width<480&&r.height>340&&parseFloat(cs.borderTopLeftRadius)>4&&el.querySelectorAll('img,.et-ph,[class*=ph]').length>0})` },
];

const manifest = [];
for (const c of CARDS) {
  const url = BASE + '/' + encodeURIComponent(c.page);
  const tab = await hr('/json/new?' + encodeURIComponent(url), 'PUT');
  const cdp = new CDP(tab.webSocketDebuggerUrl); await cdp.open();
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1400, deviceScaleFactor: 2, mobile: false });
  await cdp.send('Page.navigate', { url }); await sleep(3800);
  const ev = e => cdp.send('Runtime.evaluate', { expression: e, returnByValue: true }).then(r => r.result.value).catch(x => 'ERR:' + x.message);
  for (const a of c.pre) {
    if (a.wait) { await sleep(a.wait); continue; }
    if (a.click) await ev(`[...document.querySelectorAll('button,a')].find(b=>(b.textContent||'').trim()===${JSON.stringify(a.click)})?.click()`);
    if (a.clickRe) await ev(`[...document.querySelectorAll('button,a')].find(b=>new RegExp(${JSON.stringify(a.clickRe)}).test(b.textContent||''))?.click()`);
    await sleep(300);
  }
  const rect = await ev(`(()=>{const el=${c.find};if(!el)return null;el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect();return {x:Math.max(0,r.left+window.scrollX-6),y:Math.max(0,r.top+window.scrollY-6),w:Math.round(r.width+12),h:Math.round(r.height+12)}})()`);
  if (!rect) { console.log(`✗ ${c.label}: card not found on ${c.page}`); await hr('/json/close/' + tab.id); continue; }
  await sleep(300);
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: rect.x, y: rect.y, width: rect.w, height: rect.h, scale: 1 } });
  fs.writeFileSync(path.join(OUT, c.label + '.png'), Buffer.from(shot.data, 'base64'));
  manifest.push({ label: c.label, page: c.page, w: rect.w, h: rect.h });
  console.log(`✓ ${c.label}  ${rect.w}x${rect.h}css  (from ${c.page})`);
  await hr('/json/close/' + tab.id);
}
fs.writeFileSync(path.join(OUT, 'cards.json'), JSON.stringify(manifest, null, 2));
process.exit(0);
