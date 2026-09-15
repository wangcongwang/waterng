/* Element-level visual + content check for the reworked payment layer. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const ROOT = process.cwd();
const OUT = path.join(ROOT, '.workbuddy/preview');
const PORT = 8139;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.json': 'application/json', '.woff2': 'font/woff2' };

const server = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]);
  const f = path.join(ROOT, u === '/' ? '/index.html' : u);
  fs.readFile(f, (e, b) => {
    if (e) { r.writeHead(404).end('x'); return; }
    r.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    r.end(b);
  });
});

const PAGES = [
  ['checkout.html?cart=1', 'co', '.pay-method-grid', '#payPanels'],
  ['signup.html', 'su', '.pay-method-grid', '#signupPayPanels'],
  ['member-welcome.html', 'mw', '.pay-method-grid', '#signupPayPanels'],
  ['member-repurchase.html', 'mrp', '.pay-method-grid', '#mrpPayPanels'],
  ['member-auto-maintenance.html', 'mam', '.pay-method-grid', '#mrpPayPanels'],
];

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('al.auth', JSON.stringify({ user: { memberId: 'NG09246375', name: 'Adaeze Okoro' } }));
    localStorage.setItem('al.memberData', JSON.stringify({ memberId: 'NG09246375', memberName: 'Adaeze Okoro', country: 'Nigeria', bankName: 'Access Bank Nigeria Plc', bankAccount: '36545355225' }));
    localStorage.setItem('al.cart', JSON.stringify([{ id: 'hw2', name: 'Calmag', qty: 2, price: 38000, img: 'calmag.webp', category: 'health-wellness' }]));
  });

  const report = [];
  for (const [url, tag, gridSel, panelSel] of PAGES) {
    await page.goto(`http://localhost:${PORT}/${url}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 700));

    const values = await page.$$eval(`${gridSel} input[type=radio]`, rs => rs.map(r => r.value));
    const texts = {};
    for (const v of values) {
      await page.evaluate((sel, val) => {
        const r = document.querySelector(`${sel} input[value="${val}"]`);
        if (r) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); }
      }, gridSel, v);
      await new Promise(r => setTimeout(r, 450));

      const t = await page.evaluate(sel => {
        const el = [...document.querySelectorAll('[data-pm-panel]')].find(e => e.offsetParent !== null);
        return el ? el.innerText.replace(/\s+/g, ' ').trim().slice(0, 120) : '(no panel)';
      }, panelSel);
      texts[v] = t;

      const panel = await page.$(`${panelSel} [data-pm-panel]:not([style*="display: none"])`);
      if (panel) await panel.screenshot({ path: `${OUT}/pv-${tag}-${v}.png` }).catch(() => {});
    }
    const distinct = new Set(Object.values(texts)).size;
    report.push({ tag, url, values: values.join('|'), channels: values.length, distinctPanels: distinct, texts });
    console.log(`\n[${tag}] channels=${values.length} distinctPanelTexts=${distinct}`);
    for (const [k, v] of Object.entries(texts)) console.log(`   ${k.padEnd(8)} -> ${v}`);

    // grid screenshot for the chooser itself
    const grid = await page.$(gridSel);
    if (grid) await grid.screenshot({ path: `${OUT}/pv-${tag}-grid.png` }).catch(() => {});
  }

  // cart + account
  await page.goto(`http://localhost:${PORT}/cart.html`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));
  await page.$eval('.cart-summary', el => el.scrollIntoView({ block: 'center' }));
  await new Promise(r => setTimeout(r, 300));
  const side = await page.$('.cart-side');
  if (side) await side.screenshot({ path: `${OUT}/pv-cart-summary.png` });

  await page.goto(`http://localhost:${PORT}/account.html`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 900));
  const head = await page.$('.dash-head');
  if (head) await head.screenshot({ path: `${OUT}/pv-account-head.png` });

  await browser.close();
  server.close();
  const bad = report.filter(r => r.distinctPanels < Math.min(3, r.channels));
  console.log('\n=== pages whose panels are not distinct ===');
  console.log(bad.length ? bad.map(b => b.tag).join(', ') : 'none');
})().catch(e => { console.error('FATAL', e); process.exit(2); });
