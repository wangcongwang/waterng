/* Screenshot helper for order.html (seeds one demo order). */
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const ROOT = process.cwd();
const OUT = path.join(ROOT, '.workbuddy/preview');
const PORT = Number(process.env.PORT || 8150);
const TAG = process.env.TAG || 'order';
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

const ORDER = {
  id: 'AQ-DEMO01',
  date: Date.now() - 2 * 86400000,
  paidAt: null,
  status: 'pending',
  payStatus: 'Unpaid',
  payment: 'bank',
  paymentLabel: 'Bank Transfer',
  paymentReference: 'AQ-DEMO01',
  memberId: 'NG09246375',
  operatorId: 'NG09246375',
  memberName: 'Adaeze Okoro',
  country: 'Nigeria',
  currency: 'NGN',
  bv: 159,
  total: 295250,
  taxRate: 0.075,
  customer: {
    name: 'Adaeze Okoro', phone: '+234 803 123 4567', email: 'adaeze@example.com',
    address: '14 Bourdillon Road, Ikoyi', city: 'Lagos', state: 'Lagos',
    note: 'Please call before delivery.',
  },
  delivery: { method: 'delivery' },
  items: [
    { id: 'hw2', name: 'Calmag', qty: 2, price: 38000, bv: 35, category: 'health-wellness', img: 'calmag.webp' },
    { id: 'bs1', name: 'Advanced Age Recovery', qty: 1, price: 68000, bv: 62, category: 'beauty-skincare', img: 'advanced-age-recovery.webp' },
    { id: 'ha2', name: 'Bio Pure N200', qty: 1, price: 560000, bv: 420, category: 'home-appliances', img: 'bio-pure-n200.webp' },
  ],
};

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const problems = [];
  page.on('pageerror', e => problems.push('pageerror: ' + e.message));
  await page.evaluateOnNewDocument(o => {
    localStorage.setItem('al.auth.user', JSON.stringify({ memberId: 'NG09246375', name: 'Adaeze Okoro', email: 'adaeze@example.com' }));
    localStorage.setItem('al.orders', JSON.stringify([o]));
  }, ORDER);

  for (const [w, h, label] of [[1280, 1000, 'desktop'], [420, 900, 'mobile']]) {
    await page.setViewport({ width: w, height: h });
    await page.goto(`http://localhost:${PORT}/order.html?order=${ORDER.id}`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 700));
    await page.screenshot({ path: `${OUT}/${TAG}-${label}.png`, fullPage: true });
    console.log(`shot ${TAG}-${label}.png`);
  }
  console.log('problems:', problems.length ? problems.join(' | ') : 'none');
  await browser.close();
  server.close();
})().catch(e => { console.error('FATAL', e); process.exit(2); });
