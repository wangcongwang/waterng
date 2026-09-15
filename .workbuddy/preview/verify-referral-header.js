const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer-core');
const ROOT=process.cwd(),OUT=path.join(ROOT,'.workbuddy/preview'),PORT=8177;
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
console.log('ORDER',JSON.stringify(await p.evaluate(()=>{
  const h=document.querySelector('.dash-head');
  const v=document.querySelector('.dash-view[data-view="overview"]');
  return {header:[...h.children].map(c=>c.className||c.tagName),
          overview:[...v.children].map(c=>c.className||c.tagName)};
})));
console.log('SPOT',JSON.stringify(await p.evaluate(()=>{
  const el=document.querySelector('.dash-referral');
  const link=document.getElementById('referralLink');
  const share=document.getElementById('referralShare');
  const copy=document.getElementById('referralCopy');
  const r=el.getBoundingClientRect(); const rs=share.getBoundingClientRect();
  const cs=getComputedStyle(el);
  return {
    exists:!!el, top:Math.round(r.top), width:Math.round(r.width), height:Math.round(r.height),
    linkValue:link?link.value:null, linkReadOnly:link?link.readOnly:null,
    shareLabel:share?share.textContent.trim():null, copyLabel:copy?copy.textContent.trim():null,
    shareSize:[Math.round(rs.width),Math.round(rs.height)],
    shareBg:getComputedStyle(share).backgroundColor, shareInk:getComputedStyle(share).color,
    panelBg:cs.backgroundColor, flexDir:cs.flexDirection,
    // is the old small card gone from the left column?
    oldCardInColumn:!!document.querySelector('.overview-grid .order-link-row'),
    inHeader:el.parentElement.classList.contains('dash-head'),
    headerHasIdentity:!!el.parentElement.querySelector('#dashAvatar'),
    afterBasicInfo:(el.previousElementSibling||{}).id==='profileBasicInfoBar',
    onlyOneInstance:document.querySelectorAll('.dash-referral').length,
  };
})));
// share button: three paths — resolves / aborts / fails
console.log('SHARE CLICK',JSON.stringify(await p.evaluate(async ()=>{
  const share=document.getElementById('referralShare');
  const seen=[]; const origToast=window.toast;
  let written=null; const origWrite=navigator.clipboard&&navigator.clipboard.writeText;
  const stubClip=()=>{ if(navigator.clipboard) navigator.clipboard.writeText=t=>{written=t;return Promise.resolve();}; };
  const restore=()=>{ window.toast=origToast; if(origWrite) navigator.clipboard.writeText=origWrite; };
  const out={};
  // 1) share resolves
  let resolved=null;
  Object.defineProperty(navigator,'share',{value:o=>{resolved=o;return Promise.resolve();},configurable:true});
  window.toast=m=>seen.push(m); stubClip();
  share.click(); await new Promise(r=>setTimeout(r,120));
  out.ok={title:resolved&&resolved.title, text:resolved&&String(resolved.text).slice(0,45), toasts:[...seen], written};
  // 2) user dismisses (AbortError) -> stay quiet
  seen.length=0; written=null;
  Object.defineProperty(navigator,'share',{value:()=>Promise.reject(Object.assign(new Error('x'),{name:'AbortError'})),configurable:true});
  share.click(); await new Promise(r=>setTimeout(r,150));
  out.abort={toasts:[...seen], written};
  // 3) share blocked / unsupported -> clipboard fallback
  seen.length=0; written=null;
  Object.defineProperty(navigator,'share',{value:()=>Promise.reject(new Error('NotAllowedError')),configurable:true});
  share.click(); await new Promise(r=>setTimeout(r,150));
  out.failed={toasts:[...seen], written:written?written.slice(0,45):null};
  restore();
  return out;
})));
// copy button
console.log('COPY CLICK',JSON.stringify(await p.evaluate(async ()=>{
  const seen=[]; const orig=window.toast; window.toast=(m)=>{seen.push(m);};
  let written=null; const origWrite=navigator.clipboard&&navigator.clipboard.writeText;
  if(navigator.clipboard) navigator.clipboard.writeText=t=>{written=t;return Promise.resolve();};
  document.getElementById('referralCopy').click(); await new Promise(r=>setTimeout(r,150));
  window.toast=orig; if(origWrite) navigator.clipboard.writeText=origWrite;
  return {written:written?written.slice(0,60):null, toasts:seen};
})));
// overflow check
console.log('OVERFLOW',JSON.stringify(await p.evaluate(()=>({
  docScrollW:document.documentElement.scrollWidth, innerW:window.innerWidth,
  overflows:[...document.querySelectorAll('.dash-head, .dash-referral, .dash-referral *')]
    .filter(e=>e.getBoundingClientRect().right>window.innerWidth+1)
    .map(e=>e.className||e.tagName)
}))));
const el=await p.$('.dash-head'); if(el) await el.screenshot({path:path.join(OUT,'referral-header-d.png')}).catch(()=>{});
const ov=await p.$('.dash-view[data-view="overview"]'); if(ov) await ov.screenshot({path:path.join(OUT,'referral-header-page-d.png'),fullPage:false}).catch(()=>{});
// tab switch then back, to be sure the spotlight is not duplicated / lost
await p.evaluate(()=>{document.querySelector('#dashTabs a[data-tab="orders"]').click();});
await new Promise(r=>setTimeout(r,400));
await p.evaluate(()=>{document.querySelector('#dashTabs a[data-tab="overview"]').click();});
await new Promise(r=>setTimeout(r,400));
console.log('AFTER TAB',JSON.stringify(await p.evaluate(()=>({
  count:document.querySelectorAll('.dash-referral').length,
  linkValue:document.getElementById('referralLink').value,
  shareHandlersOK:(()=>{const s=document.getElementById('referralShare');return !!s;})()
}))));
await p.setViewport({width:390,height:900});
await new Promise(r=>setTimeout(r,400));
const el2=await p.$('.dash-head'); if(el2) await el2.screenshot({path:path.join(OUT,'referral-header-m.png')}).catch(()=>{});
console.log('MOBILE',JSON.stringify(await p.evaluate(()=>{
  const el=document.querySelector('.dash-referral'); const r=el.getBoundingClientRect();
  const s=document.getElementById('referralShare').getBoundingClientRect();
  return {width:Math.round(r.width), height:Math.round(r.height), shareW:Math.round(s.width),
          docScrollW:document.documentElement.scrollWidth, innerW:window.innerWidth};
})));
console.log('errors:', errs.length?errs.join(' | '):'none');
await b.close();s.close();})();
