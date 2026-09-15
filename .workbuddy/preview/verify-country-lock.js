const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer-core');
const ROOT=process.cwd(),OUT=path.join(ROOT,'.workbuddy/preview'),PORT=8166;
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2'};
const s=http.createServer((q,r)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(ROOT,u==='/'?'/index.html':u);
fs.readFile(f,(e,b)=>{if(e){r.writeHead(404).end('x');return;}r.writeHead(200,{'Content-Type':MIME[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});r.end(b);});});
const probe=()=>{
  const c=document.getElementById('pfCountry');
  const hint=document.querySelector('.country-locked-hint');
  const g=id=>document.getElementById(id);
  return {
    mode:g('profileForm').dataset.mode,
    country:{disabled:c.disabled, classes:c.className, value:c.value, options:c.options.length,
             grayed:getComputedStyle(c).backgroundColor, cursor:getComputedStyle(c).cursor},
    countryHint:{hidden:hint.hidden, text:hint.textContent.trim()},
    memberIdDisabled:g('pfMemberId').disabled,
    memberNameDisabled:g('pfMemberName').disabled,
    emailDisabled:g('pfEmail').disabled,
    hintTexts:[...document.querySelectorAll('#profileForm .hint')].map(h=>h.textContent.trim()),
    // locked select must not be focusable/hover-handled; row heights must stay equal
    fieldHeights:[...document.querySelectorAll('#profileForm > .row .field')].slice(0,4).map(f=>Math.round(f.getBoundingClientRect().height)),
  };
};
(async()=>{await new Promise(r=>s.listen(PORT,r));
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--no-sandbox']});
const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errs.push('console: '+m.text());});
await p.setViewport({width:1280,height:1100});
await p.evaluateOnNewDocument(()=>{
  localStorage.setItem('al.auth.user',JSON.stringify({memberId:'NG09246375',name:'Adaeze Okoro',email:'a@b.com',phone:'8031234567'}));
  localStorage.setItem('al.cookies',JSON.stringify({essential:true,analytics:true,marketing:true,ts:Date.now()}));
});
await p.goto('http://localhost:'+PORT+'/account.html',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,900));
await p.evaluate(()=>{const a=document.querySelector('#dashTabs a[data-tab="profile"]'); if(a) a.click();});
await new Promise(r=>setTimeout(r,600));
const card='.dash-view[data-view="profile"] .profile-card-wide';
console.log('VIEW',JSON.stringify(await p.evaluate(probe)));
let el=await p.$(card); if(el) await el.screenshot({path:path.join(OUT,'country-view.png')}).catch(()=>{});
await p.evaluate(()=>document.getElementById('profileEditBtn').click());
await new Promise(r=>setTimeout(r,400));
console.log('EDIT',JSON.stringify(await p.evaluate(probe)));
el=await p.$(card); if(el) await el.screenshot({path:path.join(OUT,'country-edit.png')}).catch(()=>{});
// plain save first (also normalizes a legacy country *name* in storage into its code)
console.log('SAVE',JSON.stringify(await p.evaluate(()=>{
  const f=document.getElementById('profileForm');
  const out={valid:f.checkValidity()};
  document.getElementById('profileSaveBtn').click();
  out.mode=f.dataset.mode;
  out.stored=JSON.parse(localStorage.getItem('al.memberData')||'{}').country;
  out.selectValue=document.getElementById('pfCountry').value;
  return out;
})));
// Save must keep the locked country, even if a stale page left the select editable
// (NOTE: the profile form requires a valid phone — an empty required tel input makes
//  Chrome silently refuse the submit, which is why the fixture always has a phone).
console.log('TAMPER+SAVE',JSON.stringify(await p.evaluate(()=>{
  document.getElementById('profileEditBtn').click();
  const c=document.getElementById('pfCountry');
  c.disabled=false; c.value='US'; c.dispatchEvent(new Event('change',{bubbles:true}));  // stale-page simulation
  const out={storedBefore:JSON.parse(localStorage.getItem('al.memberData')||'{}').country};
  document.getElementById('profileSaveBtn').click();
  out.modeAfter=document.getElementById('profileForm').dataset.mode;
  out.storedAfter=JSON.parse(localStorage.getItem('al.memberData')||'{}').country;
  return out;
})));
await p.setViewport({width:390,height:900});
await new Promise(r=>setTimeout(r,300));
await p.evaluate(()=>document.getElementById('profileEditBtn').click()).catch(()=>{});
await new Promise(r=>setTimeout(r,300));
el=await p.$(card); if(el) await el.screenshot({path:path.join(OUT,'country-edit-mobile.png')}).catch(()=>{});
console.log('errors:', errs.length?errs.join(' | '):'none');
await b.close();s.close();})();
