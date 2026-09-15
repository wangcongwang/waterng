const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer-core');
const ROOT=process.cwd(),OUT=path.join(ROOT,'.workbuddy/preview'),PORT=8181;
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2'};
const s=http.createServer((q,r)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(ROOT,u==='/'?'/index.html':u);
fs.readFile(f,(e,b)=>{if(e){r.writeHead(404).end('x');return;}r.writeHead(200,{'Content-Type':MIME[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});r.end(b);});});

const MEMBER_ORDER={
  id:'AQ-TEST01', memberId:'NG09246375', memberName:'Adaeze Okoro', operatorId:'NG09246375',
  status:'paid', payStatus:'Paid', payment:'card', paymentLabel:'Debit Card',
  paymentReference:'PSK-778812', currency:'NGN', country:'Nigeria',
  date:Date.parse('2026-09-12T10:24:00'), paidAt:Date.parse('2026-09-12T10:26:00'),
  taxRate:0.075, bv:90,
  delivery:{method:'delivery'},
  customer:{name:'Adaeze Okoro',phone:'8031234567',email:'adaeze@example.com',
    address:'14 Admiralty Way',city:'Lekki',state:'Lagos',country:'Nigeria'},
  items:[{id:'EHNH5',code:'EHNH5',name:'HYDROMI EASYPAY',price:45000,qty:2,bv:45}]
};
const GUEST_ORDER={
  id:'AQ-GUEST1', memberId:null, operatorId:null, referrerId:'NG27187710',
  status:'pending', payStatus:'Unpaid', payment:'bank', paymentLabel:'Bank Transfer',
  currency:'NGN', country:'Nigeria',
  date:Date.parse('2026-09-13T15:02:00'),
  taxRate:0.075, bv:120,
  delivery:{method:'pickup',pickupLoc:'abuja'},
  customer:{name:'Chidi Nwosu',phone:'8059876543',email:'chidi@example.com'},
  items:[{id:'EH071',code:'EH071',name:'ELKEN WATER FILTER',price:120000,qty:1,bv:120}]
};

const AUTHORIZED=new Set(['/order.html','/shipping.html','/account.html']);
const isAuth=u=>AUTHORIZED.has(u.split('?')[0]);

async function newPage(b,{order,auth}){
  const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  p.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errs.push('console: '+m.text());});
  await p.setViewport({width:1280,height:1400});
  await p.evaluateOnNewDocument(o=>{
    // pages share one browser profile, so wipe the previous case's storage first
    Object.keys(localStorage).forEach(k=>localStorage.removeItem(k));
    if(o.auth) localStorage.setItem('al.auth.user',JSON.stringify(o.auth));
    if(o.orders) localStorage.setItem('al.orders',JSON.stringify(o.orders));
    localStorage.setItem('al.cookies',JSON.stringify({essential:true,analytics:true,marketing:true,ts:Date.now()}));
  },{auth:auth||null,orders:order?[order]:[]});
  // install download capture
  await p.evaluateOnNewDocument(()=>{
    window.__dl={name:null,html:null,count:0};
    const origCreate=URL.createObjectURL.bind(URL);
    URL.createObjectURL=b=>{ window.__capBlob=b; return origCreate(b); };
    const origClick=HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click=function(){
      if(this.download){ window.__dl.count++; window.__dl.name=this.download;
        if(window.__capBlob&&window.__capBlob.text){ return window.__capBlob.text().then(t=>{window.__dl.html=t;}); } }
      return origClick.apply(this,arguments);
    };
  });
  errs.__page=p;
  return {p,errs};
}
const has=(t,...needles)=>{const miss=needles.filter(n=>!t.includes(n));return miss.length?('MISSING '+miss.join(' | ')):'ok';};

(async()=>{await new Promise(r=>s.listen(PORT,r));
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--no-sandbox']});
const base='http://localhost:'+PORT;

/* ---------- A) order.html — signed-in member order ---------- */
{
  const {p,errs}=await newPage(b,{order:MEMBER_ORDER,auth:{memberId:'NG09246375',name:'Adaeze Okoro',email:'adaeze@example.com'}});
  await p.goto(base+'/order.html?order=AQ-TEST01',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,900));
  console.log('A card  ',JSON.stringify(await p.evaluate(()=>{
    const c=document.getElementById('downloadReceipt');
    const r=c?c.getBoundingClientRect():null;
    return {exists:!!c,label:c?c.textContent.trim():null,size:r?[Math.round(r.width),Math.round(r.height)]:null,
      bvRow:document.body.innerText.includes('BV earned')};
  })));
  await p.click('#downloadReceipt');
  await new Promise(r=>setTimeout(r,700));
  console.log('A dl    ',JSON.stringify(await p.evaluate(()=>{
    const h=window.__dl.html||''; const has=t=>h.includes(t);
    return {count:window.__dl.count,name:window.__dl.name,len:h.length,
      head:has('ORDER RECEIPT'),brand:has('ELKEN'),
      orderId:has('AQ-TEST01'),member:has('NG09246375'),name:has('Adaeze Okoro'),
      item:has('HYDROMI EASYPAY'),code:has('EHNH5'),
      unit:has('45,000.00'),total:has('96,750.00'),tax:has('7.5%'),
      bv:has('BV earned'),pay:has('Debit Card'),ref:has('PSK-778812'),
      deliver:has('DELIVER TO'),guest:has('Not registered')};
  })));
  console.log('A errors', errs.length?errs.join(' | '):'none');
  console.log('A shot  ', await (async()=>{const el=await p.$('.odet-hero');const el2=await p.$('.odet-side');return (el?'hero ':'')+(el2?'side':'');})());
  const side=await p.$('.odet-side'); if(side) await side.screenshot({path:path.join(OUT,'receipt-side-d.png')}).catch(e=>console.log('shot',e.message));
  await p.close();
}

/* ---------- B) order.html — guest order, not signed in ---------- */
{
  const {p,errs}=await newPage(b,{order:GUEST_ORDER});
  await p.goto(base+'/order.html?order=AQ-GUEST1',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,900));
  console.log('B state ',JSON.stringify(await p.evaluate(()=>({
    signedIn:!!(window.Auth&&window.Auth.isLoggedIn&&window.Auth.isLoggedIn()),
    memberLine:(document.querySelector('.odet-row dd')||{}).textContent,
    bvRow:document.body.innerText.includes('BV earned'),
    btn:!!document.getElementById('downloadReceipt')
  }))));
  await p.click('#downloadReceipt');
  await new Promise(r=>setTimeout(r,700));
  console.log('B dl    ',JSON.stringify(await p.evaluate(()=>{
    const h=window.__dl.html||''; const has=t=>h.includes(t);
    return {count:window.__dl.count,name:window.__dl.name,
      orderId:has('AQ-GUEST1'),guestMember:has('Not registered (guest order)'),
      noBV:!has('BV earned'),refBV:has('BV credited to'),refId:has('NG27187710'),
      recipient:has('Chidi Nwosu'),item:has('ELKEN WATER FILTER'),
      total:has('129,000.00'),pickup:has('Self pick-up'),abuja:has('Wuse Zone 5'),deliver:has('COLLECTED BY')};
  })));
  console.log('B errors', errs.length?errs.join(' | '):'none');
  const side=await p.$('.odet-side'); if(side) await side.screenshot({path:path.join(OUT,'receipt-side-guest-d.png')}).catch(e=>console.log('shot',e.message));
  await p.close();
}

/* ---------- C) order.html — not found ---------- */
{
  const {p,errs}=await newPage(b,{order:MEMBER_ORDER});
  await p.goto(base+'/order.html?order=AQ-NOPE99',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,800));
  console.log('C notfound',JSON.stringify(await p.evaluate(()=>({
    text:document.getElementById('orderHost').innerText.split('\n')[0],
    btn:!!document.getElementById('downloadReceipt')
  }))));
  console.log('C errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

/* ---------- D) shipping.html — guest + member ---------- */
for(const [tag,order,auth] of [['guest',GUEST_ORDER,null],['member',MEMBER_ORDER,{memberId:'NG09246375',name:'Adaeze Okoro'}]]){
  const {p,errs}=await newPage(b,{order,auth});
  await p.goto(base+'/shipping.html?order='+order.id,{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,900));
  console.log('D['+tag+'] btn ',JSON.stringify(await p.evaluate(()=>{
    const c=document.getElementById('downloadReceipt');
    const txt=document.getElementById('orderMeta').textContent;
    return {exists:!!c,hidden:c?c.hidden:null,
      signedIn:!!(window.Auth&&window.Auth.isLoggedIn&&window.Auth.isLoggedIn()),
      orderBv:(window.ProductCatalog.getOrderById(new URLSearchParams(location.search).get('order'))||{}).bv,
      bvRow:txt.includes('BV earned'),referrerRow:txt.includes('NG27187710')};
  })));
  await p.click('#downloadReceipt');
  await new Promise(r=>setTimeout(r,700));
  console.log('D['+tag+'] dl  ',JSON.stringify(await p.evaluate(()=>{
    const h=window.__dl.html||''; const has=t=>h.includes(t);
    return {count:window.__dl.count,name:window.__dl.name,orderId:has(h.includes('AQ-GUEST1')?'AQ-GUEST1':'AQ-TEST01'),receipt:has('ORDER RECEIPT')};
  })));
  console.log('D['+tag+'] errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

/* ---------- E) account.html — Orders list download ---------- */
{
  const {p,errs}=await newPage(b,{order:MEMBER_ORDER,auth:{memberId:'NG09246375',name:'Adaeze Okoro',email:'adaeze@example.com'}});
  await p.goto(base+'/account.html',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,1000));
  await p.evaluate(()=>{document.querySelector('#dashTabs a[data-tab="orders"]').click();});
  await new Promise(r=>setTimeout(r,700));
  console.log('E list  ',JSON.stringify(await p.evaluate(()=>{
    const b=document.querySelector('[data-order-download]');
    return {btn:!!b, label:b?b.textContent.trim():null};
  })));
  await p.evaluate(()=>{const b=document.querySelector('[data-order-download]'); if(b) b.click();});
  await new Promise(r=>setTimeout(r,700));
  console.log('E dl    ',JSON.stringify(await p.evaluate(()=>{
    const h=window.__dl.html||''; const has=t=>h.includes(t);
    return {count:window.__dl.count,name:window.__dl.name,len:h.length,
      receipt:has('ORDER RECEIPT'),orderId:has('AQ-TEST01'),member:has('NG09246375'),
      item:has('HYDROMI EASYPAY'),bv:has('BV earned')};
  })));
  console.log('E errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

await b.close();s.close();})();
