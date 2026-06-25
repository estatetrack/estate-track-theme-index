// Zero-dependency CDP screenshotter.
// Usage: node shoot.mjs "<Page File.dc.html>" <out-slug>
// Produces: thumbnails/<slug>/page.png (full page) + thumbnails/<slug>/sec-NN.png (per DOM section)
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const DEBUG_PORT = 9222;
const BASE = 'http://localhost:8765';
const OUTROOT = path.resolve('thumbnails');

const pageFile = process.argv[2];
const slug = process.argv[3];
const VW = Number(process.argv[4]) || 1280; // viewport width (use 390 for mobile)
if (!pageFile || !slug) { console.error('args: <pageFile> <slug> [width]'); process.exit(1); }

const sleep = ms => new Promise(r => setTimeout(r, ms));

function httpReq(pathname, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: 'localhost', port: DEBUG_PORT, path: pathname, method }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => { try { resolve(JSON.parse(d || '{}')); } catch { resolve(d); } });
    });
    req.on('error', reject); req.end();
  });
}

class CDP {
  constructor(wsUrl) { this.ws = new WebSocket(wsUrl); this.id = 0; this.cbs = new Map(); }
  open() {
    return new Promise((res, rej) => {
      this.ws.onopen = () => res();
      this.ws.onerror = e => rej(new Error('ws error'));
      this.ws.onmessage = ev => {
        const m = JSON.parse(ev.data);
        if (m.id && this.cbs.has(m.id)) { const { resolve, reject } = this.cbs.get(m.id); this.cbs.delete(m.id); m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result); }
      };
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => { this.cbs.set(id, { resolve, reject }); this.ws.send(JSON.stringify({ id, method, params })); });
  }
}

async function main() {
  const url = BASE + '/' + pageFile.split('/').map(encodeURIComponent).join('/');
  const tab = await httpReq('/json/new?' + encodeURIComponent(url), 'PUT');
  const cdp = new CDP(tab.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: VW, height: 1200, deviceScaleFactor: 2, mobile: VW < 600 });
  await cdp.send('Page.navigate', { url });
  await sleep(3800);
  try { await cdp.send('Runtime.evaluate', { expression: 'document.fonts.ready.then(()=>1)', awaitPromise: true }); } catch {}
  // neutralise "bundled page" centering wrappers so content flows full-height from the top
  await cdp.send('Runtime.evaluate', { expression: 'try{var b=document.body;b.style.display="block";b.style.minHeight="0";b.style.alignItems="initial";b.style.justifyContent="initial";b.style.height="auto";}catch(e){}' });
  // bundled mobile pages wrap content in a viewport-height srcdoc iframe — expand it to its content height
  await cdp.send('Runtime.evaluate', { expression: 'try{var f=document.querySelector("iframe");if(f&&f.contentDocument){var h=f.contentDocument.documentElement.scrollHeight;f.style.height=h+"px";f.setAttribute("height",h);f.style.maxHeight="none";document.body.style.height="auto";}}catch(e){}' });
  await sleep(500);

  const { result } = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const W = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, ${VW});
      const H = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const nodes = [...document.querySelectorAll('header, section, footer')]
        .filter(el => !el.closest('section')?.parentElement?.closest('section')) // keep top-level-ish
        .filter(el => { const r = el.getBoundingClientRect(); return r.height > 30 && r.width > 200; });
      const seen = new Set();
      const sections = [];
      for (const el of nodes) {
        const r = el.getBoundingClientRect();
        const y = Math.round(r.top + window.scrollY), h = Math.round(r.height);
        const key = y + 'x' + h;
        if (seen.has(key)) continue; seen.add(key);
        const txt = (el.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 80);
        sections.push({ tag: el.tagName.toLowerCase(), id: el.id || '', y, h, txt });
      }
      sections.sort((a, b) => a.y - b.y);
      return { W, H, sections };
    })()`
  });

  const { W, H, sections } = result.value;
  const outdir = path.join(OUTROOT, slug);
  fs.mkdirSync(outdir, { recursive: true });

  // Full page
  const full = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
  fs.writeFileSync(path.join(outdir, 'page.png'), Buffer.from(full.data, 'base64'));

  // Per section
  const manifest = [];
  let i = 0;
  for (const s of sections) {
    i++;
    const num = String(i).padStart(2, '0');
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: s.y, width: W, height: s.h, scale: 1 } });
    const fname = `sec-${num}.png`;
    fs.writeFileSync(path.join(outdir, fname), Buffer.from(shot.data, 'base64'));
    manifest.push({ file: fname, ...s });
  }
  fs.writeFileSync(path.join(outdir, 'manifest.json'), JSON.stringify({ page: pageFile, slug, W, H, sections: manifest }, null, 2));
  console.log(`OK ${slug}: full ${W}x${H}, ${manifest.length} sections`);
  manifest.forEach(m => console.log(`  ${m.file}  y=${m.y} h=${m.h}  [${m.tag}${m.id ? '#' + m.id : ''}] ${m.txt}`));

  await httpReq('/json/close/' + tab.id);
  process.exit(0);
}
main().catch(e => { console.error('FAIL', e); process.exit(1); });
