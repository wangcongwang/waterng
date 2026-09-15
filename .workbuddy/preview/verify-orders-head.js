const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer-core');
const ROOT=process.cwd(),OUT=path.join(ROOT,'.workbuddy/preview'),PORT=8193;
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2'};
const s=http.createServer((q,r)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(ROOT,u==='/'?'/index.html':u);
fs.readFile(f,(e,b)=>{if(e){r.writeHead(404).end('x');return;}r.writeHead(200,{'Content-Type':MIME[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});r.end(b);});});

const mk=(id,n)=>({id,memberId:'NG09246375',memberName:'Adaeze Okonkwo',operatorId:'NG09246375',
  status:n?'paid':'pending',payStatus:n?'Paid':'Unpaid',payment:'card',paymentLabel:'Debit Card',
  paymentReference:'PSK-778812',currency:'NGN',country:'Nigeria',
  date:Date.parse('2026-09-12T10:24:00'),paidAt:n?Date.parse('2026-09-12T10:26:00'):null,
  taxRate:0.075,bv:2999,delivery:{method:'delivery'},
  customer:{name:'Adaeze Okonkwo',phone:'234 8031234567',email:'adaeze@example.com',
    address:'14 Admiralty Way',city:'Lekki',state:'Lagos',country:'Nigeria'},
  items:[{id:'genqi-hydrogen-inhaler',code:'genqi-hydrogen-inhaler',name:'GenQi Hydrogen Inhaler',price:2999000,qty:1,bv:2999}]});

async function open(b,orders){
  const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  p.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errs.push('console: '+m.text());});
  await p.setViewport({width:1280,height:1200});
  await p.evaluateOnNewDocument(o=>{
    Object.keys(localStorage).forEach(k=>localStorage.removeItem(k));
    localStorage.setItem('al.auth.user',JSON.stringify({memberId:'NG09246375',name:'Adaeze Okonkwo',email:'adaeze@example.com'}));
    localStorage.setItem('al.orders',JSON.stringify(o));
    localStorage.setItem('al.cookies',JSON.stringify({essential:true,analytics:true,marketing:true,ts:Date.now()}));
  },orders);
  await p.goto('http://localhost:'+PORT+'/account.html',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,1000));
  await p.evaluate(()=>{document.querySelector('#dashTabs a[data-tab="orders"]').click();});
  await new Promise(r=>setTimeout(r,600));
  return {p,errs};
}

(async()=>{await new Promise(r=>s.listen(PORT,r));
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--no-sandbox']});

/* 1 order -> singular */
{
  const {p,errs}=await open(b,[mk('AQ-KJ964N',true)]);
  console.log('ONE   ',JSON.stringify(await p.evaluate(()=>{
    const head=document.querySelector('.orders-head');
    return {subtitle:document.getElementById('ordersSubtitle').textContent,
      rawTemplate:/\{[a-z]+\}/i.test(document.getElementById('ordersSubtitle').textContent),
      headChildren:[...head.children].map(c=>c.tagName.toLowerCase()+'.'+(c.className||'')),
      headLinks:[...head.querySelectorAll('a')].map(a=>a.textContent.trim()),
      browseInHead:!!head.querySelector('a[href="products.html"]'),
      segments:document.querySelector('.orders-segments')?true:false,
      orderCards:document.querySelectorAll('.orders-cards .ocard').length};
  })));
  const el=await p.$('.dash-view[data-view="orders"]'); if(el) await el.screenshot({path:path.join(OUT,'orders-head-d.png')});
  console.log('ONE   errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

/* 3 orders -> plural */
{
  const {p,errs}=await open(b,[mk('AQ-A',true),mk('AQ-B',true),mk('AQ-C',false)]);
  console.log('THREE ',JSON.stringify(await p.evaluate(()=>({
    subtitle:document.getElementById('ordersSubtitle').textContent,
    selfCount:document.getElementById('ordersSegmentSelfCount').textContent,
    browseInHead:!!document.querySelector('.orders-head a[href="products.html"]')
  }))));
  console.log('THREE errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

/* no stored orders -> renderOrders() seeds demo data, so assert the chip spacing
   of the rendered cards and that the header CTA stays gone */
{
  const {p,errs}=await open(b,[]);
  console.log('SEEDED',JSON.stringify(await p.evaluate(()=>{
    const chips=[...document.querySelectorAll('.ocard__meta > span')].slice(0,4).map(s=>{
      const b=s.querySelector('b'), v=s.querySelector('b + span');
      const cs=getComputedStyle(s);
      return {label:b?b.textContent:null, value:v?v.textContent:null,
        display:cs.display, gap:cs.gap,
        gapPx: Math.round((v?v.getBoundingClientRect().left:0)-(b?b.getBoundingClientRect().right:0))};
    });
    return {subtitle:document.getElementById('ordersSubtitle').textContent,
      seededCards:document.querySelectorAll('.orders-cards .ocard').length,
      browseInHead:!!document.querySelector('.orders-head a[href="products.html"]'),
      chips};
  })));
  console.log('SEEDED errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

await b.close();s.close();})();
