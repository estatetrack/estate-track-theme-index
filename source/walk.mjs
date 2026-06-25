// Drive interactive pages through their states and screenshot each.
// Usage: node thumbnails/walk.mjs <configKey|all>
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const PORT = 9222, BASE = 'http://localhost:8765', ROOT = '/Users/daniel/Projects/Themes';
const sleep = ms => new Promise(r => setTimeout(r, ms));
function hr(p, m = 'GET') { return new Promise((res, rej) => { const r = http.request({ host: 'localhost', port: PORT, path: p, method: m }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d || '{}')); } catch { res(d); } }); }); r.on('error', rej); r.end(); }); }
class CDP { constructor(u){this.ws=new WebSocket(u);this.id=0;this.cbs=new Map();} open(){return new Promise((res,rej)=>{this.ws.onopen=()=>res();this.ws.onerror=()=>rej(new Error('ws'));this.ws.onmessage=ev=>{const m=JSON.parse(ev.data);if(m.id&&this.cbs.has(m.id)){const{resolve,reject}=this.cbs.get(m.id);this.cbs.delete(m.id);m.error?reject(new Error(JSON.stringify(m.error))):resolve(m.result);}};});} send(method,params={}){const id=++this.id;return new Promise((resolve,reject)=>{this.cbs.set(id,{resolve,reject});this.ws.send(JSON.stringify({id,method,params}));});} }

const RUNNER = `(function(a){
  const txt=el=>(el.textContent||'').replace(/\\s+/g,' ').trim();
  const clk=()=>[...document.querySelectorAll('button,a,[role=button]')];
  if(a.fill!=null){ const ins=[...document.querySelectorAll('input:not([type=checkbox]),textarea')];
    const inp=a.match?ins.find(i=>new RegExp(a.match,'i').test((i.placeholder||'')+' '+(i.type||''))):ins[a.idx||0];
    if(!inp)return 'fill miss '+(a.match||a.idx);
    const proto=inp.tagName==='TEXTAREA'?window.HTMLTextAreaElement:window.HTMLInputElement;
    Object.getOwnPropertyDescriptor(proto.prototype,'value').set.call(inp,a.fill);
    inp.dispatchEvent(new Event('input',{bubbles:true}));inp.dispatchEvent(new Event('change',{bubbles:true}));return 'filled';}
  if(a.click){const b=clk().find(x=>new RegExp('^\\\\s*'+a.click,'i').test(txt(x)));if(b){b.click();return 'click '+txt(b).slice(0,24);}return 'click miss '+a.click;}
  if(a.clickExact){const b=clk().find(x=>txt(x).toLowerCase()===a.clickExact.toLowerCase());if(b){b.click();return 'exact '+a.clickExact;}return 'exact miss '+a.clickExact;}
  if(a.clickRe){const b=clk().find(x=>new RegExp(a.clickRe,'i').test(txt(x)));if(b){b.click();return 're '+txt(b).slice(0,24);}return 're miss '+a.clickRe;}
  if(a.open){const b=clk().find(x=>new RegExp(a.open,'i').test(txt(x)));if(b){b.click();return 'open '+txt(b).slice(0,18);}return 'open miss';}
  if(a.check!=null){const cs=[...document.querySelectorAll('input[type=checkbox]')];const c=a.idx===-1?cs[cs.length-1]:cs[a.idx||0];if(c){c.click();return 'checked';}return 'no checkbox';}
  if(a.star){const ss=[...document.querySelectorAll('[aria-label*=star i],[class*=star i]')].filter(e=>e.tagName==='BUTTON'||e.getAttribute('role')==='button'||e.onclick);const s=ss[a.star-1]||ss[ss.length-1];if(s){s.click();return 'star '+a.star;}return 'no stars';}
  if(a.nativeSelect){const sel=document.querySelector('select');if(!sel)return 'no select';const o=[...sel.options].find(o=>new RegExp(a.nativeSelect,'i').test(o.textContent));if(o){sel.value=o.value;sel.dispatchEvent(new Event('change',{bubbles:true}));return 'select '+o.textContent.slice(0,18);}return 'opt miss';}
  return 'noop';
})(__A__)`;

const C = {
  'instant-valuation': { page: 'Instant Valuation.dc.html', slug: 'instant-valuation', states: [
    { label: 'Step 1 — Address lookup', acts: [] },
    { label: 'Step 2 — Property details', acts: [{fill:'GL52 6XX',match:'postcode|gl\\d'},{click:'Find address'},{wait:700},{clickRe:'GL\\d|road|hill|street|close|lane|crescent'},{click:'Continue'}] },
    { label: 'Step 3 — Your details', acts: [{clickExact:'Detached'},{clickExact:'4'},{clickExact:'Good'},{click:'Continue'}] },
    { label: 'Step 4 — Instant result', acts: [{fill:'Alex Smith',match:'name'},{fill:'alex@example.com',match:'email'},{fill:'07700 900000',match:'phone|tel'},{check:true,idx:0},{clickRe:'reveal|estimate|see my'}] },
  ]},
  'instant-valuation-landing': { page: 'Instant Valuation Landing.html', slug: 'instant-valuation-landing', states: [
    { label: 'Step 1 — Address lookup', acts: [] },
    { label: 'Step 2 — Property details', acts: [{fill:'GL52 6XX',match:'postcode|gl\\d'},{click:'Find address'},{wait:700},{clickRe:'GL\\d|road|hill|street|close|lane|crescent'},{click:'Continue'}] },
    { label: 'Step 3 — Your details', acts: [{clickExact:'Detached'},{clickExact:'4'},{clickExact:'Good'},{click:'Continue'}] },
    { label: 'Step 4 — Instant result', acts: [{fill:'Alex Smith',match:'name'},{fill:'alex@example.com',match:'email'},{fill:'07700 900000',match:'phone|tel'},{check:true,idx:0},{clickRe:'reveal|estimate|see my'}] },
  ]},
  'book-a-valuation': { page: 'Book a Valuation.dc.html', slug: 'book-a-valuation', states: [
    { label: 'Booking request form', acts: [] },
    { label: 'Request received', acts: [{fill:'GL52 6XX',match:'postcode|gl\\d'},{click:'Find address'},{wait:700},{clickRe:'GL\\d|road|hill|crescent|street|close'},{clickExact:'Detached'},{clickExact:'4'},{clickExact:'Selling'},{fill:'Alex Smith',match:'name'},{fill:'alex@example.com',match:'email'},{fill:'07700 900000',match:'phone|tel'},{check:true,idx:-1},{clickRe:'request my valuation|request valuation'}] },
  ]},
  'virtual-valuation': { page: 'Virtual Valuation.dc.html', slug: 'virtual-valuation', states: [
    { label: 'Choose video or phone', acts: [] },
    { label: 'Booking received', acts: [{clickRe:'video call'},{fill:'GL52 6XX',match:'postcode|gl\\d'},{click:'Find address'},{wait:700},{clickRe:'GL\\d|road|hill|crescent|street|close'},{clickExact:'Detached'},{clickExact:'4'},{clickExact:'Selling'},{fill:'Alex Smith',match:'name'},{fill:'alex@example.com',match:'email'},{fill:'07700 900000',match:'phone|tel'},{check:true,idx:-1},{clickRe:'book my virtual'}] },
  ]},
  'register': { page: 'Register.dc.html', slug: 'register', states: [
    { label: 'Requirements (buying)', acts: [] },
    { label: "You're registered", acts: [{fill:'Cheltenham',match:'cheltenham|charl|looking'},{fill:'300,000',idx:1},{fill:'500,000',idx:2},{fill:'Alex',match:'first name'},{fill:'Smith',match:'last name'},{fill:'alex@example.com',match:'email'},{fill:'07700 900000',match:'phone|tel'},{check:true,idx:-1},{clickRe:'register my requirements'}] },
  ]},
  'leave-a-review': { page: 'Leave a Review.dc.html', slug: 'leave-a-review', states: [
    { label: 'Review form', acts: [] },
    { label: 'Thank you', acts: [{star:5},{fill:'Alex Smith',match:'full name'},{fill:'alex@example.com',match:'email'},{open:'Please choose'},{wait:450},{clickExact:'Selling my home'},{fill:'Great service from start to finish, highly recommended.',match:'experience|review|tell us'},{check:true,idx:-1},{clickRe:'submit review'}] },
  ]},
  'general-enquiries': { page: 'General Enquiries.dc.html', slug: 'general-enquiries', states: [
    { label: 'Enquiry form', acts: [] },
    { label: 'Message sent', acts: [{open:'Please choose'},{wait:400},{clickExact:'Cheltenham'},{open:'Please choose'},{wait:400},{clickRe:'sell'},{fill:'Alex',match:'first name'},{fill:'Smith',match:'last name'},{fill:'alex@example.com',match:'email'},{fill:'07700 900000',match:'phone|tel'},{fill:'Looking for advice on selling my home.',match:'help'},{check:true,idx:-1},{clickRe:'send message'}] },
  ]},
  'branch-contact': { page: 'Branch Contact.dc.html', slug: 'branch-contact', states: [
    { label: 'Contact form', acts: [] },
    { label: 'Message sent', acts: [{nativeSelect:'sell'},{fill:'Alex Smith',match:'full name'},{fill:'07700 900000',match:'phone'},{fill:'alex@example.com',match:'email'},{fill:'A question about selling.',match:'help'},{check:true,idx:-1},{clickRe:'send message'}] },
  ]},
  'property-and-area-report': { page: 'Property & Area Report.dc.html', slug: 'property-and-area-report', states: [
    { label: 'Property report tab', acts: [] },
    { label: 'Area report tab', acts: [{clickExact:'Area report'}] },
  ]},
  'pre-val-pack': { page: 'Pre-Val Pack.dc.html', slug: 'pre-val-pack', states: [
    { label: 'Pre-visit survey', acts: [] },
    { label: 'Sent to your valuer', acts: [{fill:'New kitchen 2023, new boiler.',match:'new kitchen|improvement'},{fill:'Keen to understand pricing and timescales.',match:'pricing|question'},{fill:'07700 900000',match:'mobile|landline|phone'},{clickRe:'send to'}] },
  ]},
  'post-val-proposal': { page: 'Post-Val Proposal.dc.html', slug: 'post-val-proposal', states: [
    { label: 'Proposal', acts: [] },
    { label: 'Instructed', acts: [{clickRe:"i'd like to proceed"}] },
  ]},
};

const arg = process.argv[2];
const keys = arg === 'all' ? Object.keys(C) : [arg];
for (const key of keys) {
  const cfg = C[key]; if (!cfg) { console.error('unknown', key); continue; }
  const outdir = path.join(ROOT, 'thumbnails', cfg.slug); fs.mkdirSync(outdir, { recursive: true });
  const url = BASE + '/' + encodeURIComponent(cfg.page);
  const tab = await hr('/json/new?' + encodeURIComponent(url), 'PUT');
  const cdp = new CDP(tab.webSocketDebuggerUrl); await cdp.open();
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1200, deviceScaleFactor: 2, mobile: false });
  await cdp.send('Page.navigate', { url }); await sleep(3800);
  const ev = e => cdp.send('Runtime.evaluate', { expression: e, returnByValue: true }).then(r => r.result.value).catch(x => 'ERR:' + x.message);
  const manifest = []; let n = 0;
  console.log('\n=== ' + cfg.slug + ' ===');
  for (const st of cfg.states) {
    for (const a of st.acts) { if (a.wait) { await sleep(a.wait); continue; } const r = await ev(RUNNER.replace('__A__', JSON.stringify(a))); console.log('   ·', JSON.stringify(a).slice(0, 50), '→', r); await sleep(450); }
    await sleep(600);
    const { w, h } = JSON.parse(await ev(`JSON.stringify({w:Math.max(document.documentElement.scrollWidth,1280),h:document.documentElement.scrollHeight})`));
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
    const fname = `walk-${String(n).padStart(2, '0')}.png`;
    fs.writeFileSync(path.join(outdir, fname), Buffer.from(shot.data, 'base64'));
    manifest.push({ file: fname, label: st.label });
    console.log(`  ✓ ${fname}  [${st.label}]  ${w}x${h}`);
    n++;
  }
  fs.writeFileSync(path.join(outdir, 'walk.json'), JSON.stringify({ slug: cfg.slug, states: manifest }, null, 2));
  await hr('/json/close/' + tab.id);
}
process.exit(0);
