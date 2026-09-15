/* Single-process harness: static server + puppeteer-core + local Chrome.
   Verifies the reworked payment layer on all 5 order pages, plus the
   cart BV row and the account header Basic Information bar. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const ROOT = process.env.ROOT || process.cwd();
const OUT = process.env.OUT || path.join(ROOT, '.workbuddy/preview');
const PORT = 8137;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(ROOT, url === '/' ? '/index.html' : url);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404).end('not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(buf);
  });
});

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const problems = [];
  const page = await browser.newPage();
  page.on('pageerror', e => problems.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') problems.push('console: ' + m.text()); });
  await page.setViewport({ width: 1280, height: 900 });

  // Log in as the demo member before any page script runs.
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('al.auth', JSON.stringify({
      user: { memberId: 'NG09246375', name: 'Adaeze Okoro', email: 'a@example.com' },
    }));
    localStorage.setItem('al.memberData', JSON.stringify({
      memberId: 'NG09246375', memberName: 'Adaeze Okoro', country: 'Nigeria',
      bankName: 'Access Bank Nigeria Plc', bankAccount: '36545355225',
    }));
    localStorage.setItem('al.cart', JSON.stringify([
      { id: 'hw2', name: 'Calmag', qty: 1, price: 38000, img: 'calmag.webp', category: 'health-wellness' },
    ]));
  });

  const pages = [
    ['checkout.html?cart=1', 'co'],
    ['signup.html', 'su'],
    ['member-welcome.html', 'mw'],
    ['member-repurchase.html', 'mrp'],
    ['member-auto-maintenance.html', 'mam'],
  ];

  for (const [url, tag] of pages) {
    await page.goto(`http://localhost:${PORT}/${url}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 600));
    const info = await page.evaluate(() => {
      const grid = document.querySelector('.pay-method-grid');
      const radios = grid ? [...grid.querySelectorAll('input[type=radio]')] : [];
      const visiblePanels = [...document.querySelectorAll('[data-pm-panel]')]
        .filter(el => el.offsetParent !== null).map(el => el.getAttribute('data-pm-panel'));
      return {
        hasPayMethods: !!window.PayMethods,
        values: radios.map(r => r.value),
        checked: (radios.find(r => r.checked) || {}).value || null,
        visiblePanels,
        panelCount: document.querySelectorAll('[data-pm-panel]').length,
      };
    });
    console.log(`[${tag}] ${url} ->`, JSON.stringify(info));
    if (!info.hasPayMethods) problems.push(`${tag}: window.PayMethods missing`);
    if (info.values.join(',') !== 'card,ussd,bank,paybank,visaqr' && !info.values.includes('balance')) {
      problems.push(`${tag}: unexpected method list ${info.values.join(',')}`);
    }

    // walk every channel and screenshot the selected panel
    for (const v of info.values) {
      await page.evaluate(val => {
        const r = document.querySelector(`.pay-method-grid input[value="${val}"]`);
        if (r) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); }
      }, v);
      await new Promise(r => setTimeout(r, 250));
      await page.screenshot({ path: `${OUT}/pay2-${tag}-${v}.png` });
    }
  }

  // cart BV row
  await page.goto(`http://localhost:${PORT}/cart.html`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));
  const cartTxt = await page.evaluate(() => (document.getElementById('cartView') || {}).innerText || '');
  console.log('[cart] BV row present:', /BV rewards/.test(cartTxt));
  if (!/BV rewards/.test(cartTxt)) problems.push('cart: BV rewards row missing');
  await page.screenshot({ path: `${OUT}/pay2-cart.png` });

  // account header Basic Information bar (overview tab = first paint)
  await page.goto(`http://localhost:${PORT}/account.html`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 900));
  const acct = await page.evaluate(() => {
    const head = document.querySelector('.dash-head');
    const bar = head ? head.querySelector('#profileBasicInfoBar') : null;
    return {
      inHeader: !!bar,
      items: bar ? bar.children.length : 0,
      visibleInOverview: bar ? bar.offsetParent !== null : false,
    };
  });
  console.log('[account]', JSON.stringify(acct));
  if (!acct.inHeader || acct.items !== 5 || !acct.visibleInOverview) problems.push('account: basic info bar wrong ' + JSON.stringify(acct));
  await page.screenshot({ path: `${OUT}/pay2-account.png` });

  await browser.close();
  server.close();
  console.log('\n=== problems ===');
  console.log(problems.length ? problems.slice(0, 30).join('\n') : 'none');
  process.exit(problems.length ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
