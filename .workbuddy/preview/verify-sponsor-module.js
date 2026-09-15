const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer-core');
const ROOT=process.cwd(),OUT=path.join(ROOT,'.workbuddy/preview'),PORT=8195;
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2'};
const s=http.createServer((q,r)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(ROOT,u==='/'?'/index.html':u);
fs.readFile(f,(e,b)=>{if(e){r.writeHead(404).end('x');return;}r.writeHead(200,{'Content-Type':MIME[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});r.end(b);});});

async function open(b,{hash='',w=1280,h=1400}={}){
  const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  p.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errs.push('console: '+m.text());});
  await p.setViewport({width:w,height:h});
  await p.evaluateOnNewDocument(()=>{
    Object.keys(localStorage).forEach(k=>localStorage.removeItem(k));
    localStorage.setItem('al.auth.user',JSON.stringify({memberId:'NG09246375',name:'Adaeze Okoro',email:'a@b.com',phone:'8031234567'}));
    localStorage.setItem('al.cookies',JSON.stringify({essential:true,analytics:true,marketing:true,ts:Date.now()}));
  });
  await p.goto('http://localhost:'+PORT+'/account.html'+hash,{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,1100));
  return {p,errs};
}

(async()=>{await new Promise(r=>s.listen(PORT,r));
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--no-sandbox']});

/* ---- 1) tab bar / module presence ---- */
{
  const {p,errs}=await open(b);
  console.log('MODULE ',JSON.stringify(await p.evaluate(()=>{
    const tabs=[...document.querySelectorAll('#dashTabs a[data-tab]')].map(a=>a.dataset.tab);
    const mod=document.querySelector('.sn-module');
    const ov=document.querySelector('.dash-view[data-view="overview"]');
    const r=mod?mod.getBoundingClientRect():null;
    const order=[...ov.children].map(c=>c.className||c.tagName);
    const stats=[...document.querySelectorAll('.sn-stat')].map(s=>({
      k:s.querySelector('.sn-stat-k').textContent, v:s.querySelector('.sn-stat-v').textContent}));
    return {tabs, hasSponsorTab:tabs.includes('sponsor'),
      moduleExists:!!mod, inOverview:!!(mod&&mod.closest('.dash-view[data-view="overview"]')),
      moduleSize:r?[Math.round(r.width),Math.round(r.height)]:null,
      overviewOrder:order, stats,
      nodes:document.querySelectorAll('#sponsorTree .sn-node').length,
      modeBtns:[...document.querySelectorAll('.sn-mode-btn')].map(x=>x.textContent),
      confirmPrimary:getComputedStyle(document.getElementById('snConfirmBtn')).backgroundColor,
      headBg:getComputedStyle(document.querySelector('.sn-module-head')).backgroundColor};
  })));
  const el=await p.$('.sn-module'); if(el) await el.screenshot({path:path.join(OUT,'sn-module-d.png')});
  const ov=await p.$('.dash-view[data-view="overview"]'); if(ov) await ov.screenshot({path:path.join(OUT,'sn-module-overview-d.png')});
  console.log('MODULE errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

/* ---- 2) mode switch recomputes stats + tree ---- */
{
  const {p,errs}=await open(b);
  console.log('EX     ',JSON.stringify(await p.evaluate(()=>{
    const before=[...document.querySelectorAll('.sn-stat')].map(s=>s.querySelector('.sn-stat-v').textContent);
    const nodesBefore=document.querySelectorAll('#sponsorTree .sn-node').length;
    document.querySelector('.sn-mode-btn[data-mode="ex"]').click();
    const after=[...document.querySelectorAll('.sn-stat')].map(s=>s.querySelector('.sn-stat-v').textContent);
    return {before, after, changed:JSON.stringify(before)!==JSON.stringify(after),
      nodesBefore, nodesAfter:document.querySelectorAll('#sponsorTree .sn-node').length,
      activeMode:document.querySelector('.sn-mode-btn.active').textContent};
  })));
  // back to normal
  console.log('BACK   ',JSON.stringify(await p.evaluate(()=>{
    document.querySelector('.sn-mode-btn[data-mode="normal"]').click();
    return {stats:[...document.querySelectorAll('.sn-stat')].map(s=>s.querySelector('.sn-stat-v').textContent)};
  })));
  console.log('EX errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

/* ---- 3) stats unaffected by the search box; tree filters ---- */
{
  const {p,errs}=await open(b);
  console.log('FILTER ',JSON.stringify(await p.evaluate(()=>{
    const stats=()=>[...document.querySelectorAll('.sn-stat')].map(s=>s.querySelector('.sn-stat-v').textContent);
    const before=stats(), nodes0=document.querySelectorAll('#sponsorTree .sn-node').length;
    document.getElementById('snTopMember').value='Amara';
    document.getElementById('snConfirmBtn').click();
    const nodes1=document.querySelectorAll('#sponsorTree .sn-node').length;
    const after=stats();
    // clear again
    document.getElementById('snTopMember').value='';
    document.getElementById('snConfirmBtn').click();
    return {statsStable:JSON.stringify(before)===JSON.stringify(after), before, after,
      nodesAll:nodes0, nodesFiltered:nodes1, nodesRestored:document.querySelectorAll('#sponsorTree .sn-node').length};
  })));
  console.log('FILTER errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

/* ---- 4) stale #sponsor hash falls back to overview ---- */
{
  const {p,errs}=await open(b,{hash:'#sponsor'});
  console.log('HASH   ',JSON.stringify(await p.evaluate(()=>({
    visibleView:[...document.querySelectorAll('.dash-view')].filter(v=>!v.hidden).map(v=>v.dataset.view),
    activeTab:(document.querySelector('#dashTabs a.active')||{}).dataset,
    moduleVisible:!!(document.querySelector('.sn-module')||{}).offsetParent
  }))));
  console.log('HASH errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

/* ---- 5) other tabs still work, no overflow on mobile ---- */
{
  const {p,errs}=await open(b,{w:390,h:900});
  console.log('MOBILE ',JSON.stringify(await p.evaluate(()=>{
    const r=document.querySelector('.sn-module').getBoundingClientRect();
    const cols=getComputedStyle(document.getElementById('snStats')).gridTemplateColumns.split(' ').length;
    return {moduleW:Math.round(r.width), statCols:cols,
      docScrollW:document.documentElement.scrollWidth, innerW:window.innerWidth};
  })));
  const el=await p.$('.sn-module'); if(el) await el.screenshot({path:path.join(OUT,'sn-module-m.png')});
  await p.evaluate(()=>{document.querySelector('#dashTabs a[data-tab="orders"]').click();});
  await new Promise(r=>setTimeout(r,500));
  const ord=await p.evaluate(()=>({view:[...document.querySelectorAll('.dash-view')].filter(v=>!v.hidden).map(v=>v.dataset.view),sub:document.getElementById('ordersSubtitle').textContent}));
  await p.evaluate(()=>{document.querySelector('#dashTabs a[data-tab="profile"]').click();});
  await new Promise(r=>setTimeout(r,500));
  const prof=await p.evaluate(()=>({view:[...document.querySelectorAll('.dash-view')].filter(v=>!v.hidden).map(v=>v.dataset.view)}));
  console.log('TABS   ',JSON.stringify({orders:ord, profile:prof}));
  console.log('MOBILE errors', errs.length?errs.join(' | '):'none');
  await p.close();
}

await b.close();s.close();})();
