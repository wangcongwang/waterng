const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer-core');
const ROOT=process.cwd(),OUT=path.join(ROOT,'.workbuddy/preview'),PORT=8178;
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2'};
const s=http.createServer((q,r)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(ROOT,u==='/'?'/index.html':u);
fs.readFile(f,(e,b)=>{if(e){r.writeHead(404).end('x');return;}r.writeHead(200,{'Content-Type':MIME[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});r.end(b);});});
(async()=>{await new Promise(r=>s.listen(PORT,r));
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--no-sandbox']});
const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errs.push('console: '+m.text());});
await p.setViewport({width:1280,height:1200});
await p.evaluateOnNewDocument(()=>{
  localStorage.setItem('al.auth.user',JSON.stringify({memberId:'NG09246375',name:'Adaeze Okoro',email:'a@b.com',phone:'8031234567'}));
  localStorage.setItem('al.cookies',JSON.stringify({essential:true,analytics:true,marketing:true,ts:Date.now()}));
});
await p.goto('http://localhost:'+PORT+'/account.html',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,1000));
console.log('CATALOG',JSON.stringify(await p.evaluate(()=>{
  const v=document.querySelector('.dash-view[data-view="overview"]');
  const titles=[...v.querySelectorAll('.panel-title')].map(el=>el.textContent.trim());
  const cards=[...v.querySelectorAll('.panel-title + .ek-card')].map(c=>{
    const a=c.querySelector('a[href="products.html"]'); return {href:a?a.getAttribute('href'):null, text:c.textContent.trim().slice(0,50)};
  });
  return {
    panelTitles:titles,
    hasCatalogTitle:titles.some(t=>/product catalog/i.test(t)),
    hasBrowseAllProducts:!!v.querySelector('a[href="products.html"]'),
    bodyHasPhrase:document.body.innerText.includes('Quality products for your health'),
    cards,
  };
})));
console.log('STRUCT',JSON.stringify(await p.evaluate(()=>{
  const h=document.querySelector('.dash-head');
  const v=document.querySelector('.dash-view[data-view="overview"]');
  return {header:[...h.children].map(c=>c.className||c.tagName),
          overview:[...v.children].map(c=>c.className||c.tagName),
          refSpotlight:document.querySelectorAll('.dash-referral').length,
          refLink:document.getElementById('referralLink').value,
          referralPanelTitle:[...v.querySelectorAll('.panel-title')].map(e=>e.textContent.trim()).filter(t=>/referral/i.test(t)),
          hubCells:v.querySelectorAll('#hubGrid .hub-cell').length};
})));
console.log('OVERFLOW',JSON.stringify(await p.evaluate(()=>({
  docScrollW:document.documentElement.scrollWidth, innerW:window.innerWidth
}))));
const ov=await p.$('.dash-view[data-view="overview"]'); if(ov) await ov.screenshot({path:path.join(OUT,'catalog-removed-overview-d.png')}).catch(e=>console.log('shot err',e.message));
await p.screenshot({path:path.join(OUT,'catalog-removed-page-d.png'),fullPage:true}).catch(e=>console.log('page shot err',e.message));
console.log('errors:', errs.length?errs.join(' | '):'none');
await b.close();s.close();})();
