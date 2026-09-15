const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer-core');
const ROOT=process.cwd(),OUT=path.join(ROOT,'.workbuddy/preview'),PORT=8160;
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2'};
const s=http.createServer((q,r)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(ROOT,u==='/'?'/index.html':u);
fs.readFile(f,(e,b)=>{if(e){r.writeHead(404).end('x');return;}r.writeHead(200,{'Content-Type':MIME[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});r.end(b);});});
(async()=>{await new Promise(r=>s.listen(PORT,r));
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--no-sandbox']});
const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errs.push('console: '+m.text());});
await p.setViewport({width:1280,height:1000});
await p.evaluateOnNewDocument(()=>{
  localStorage.setItem('al.auth.user',JSON.stringify({memberId:'NG09246375',name:'Adaeze Okoro',email:'a@b.com'}));
  localStorage.setItem('al.cookies',JSON.stringify({essential:true,analytics:true,marketing:true,ts:Date.now()}));
});
await p.goto('http://localhost:'+PORT+'/account.html',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,900));
// switch to the Profile tab
await p.evaluate(()=>{const a=document.querySelector('#dashTabs a[data-tab="profile"]'); if(a) a.click();});
await new Promise(r=>setTimeout(r,600));
const info=await p.evaluate(()=>({
  prefsForm: !!document.getElementById('prefsForm'),
  prefsSaveBtn: !!document.getElementById('prefsSaveBtn'),
  prefsCardCount: document.querySelectorAll('.prefs-form, .pref-toggle-card').length,
  profileCards: [...document.querySelectorAll('.dash-view[data-view="profile"] .profile-card h2, .dash-view[data-view="profile"] .profile-card-head h2')].map(e=>e.textContent.trim()),
  hasAddressList: !!document.getElementById('addressList'),
  hasProfileForm: !!document.getElementById('profileForm'),
  hasBasicInfo: (document.querySelector('.dash-head .basic-info-bar')||{}).children?.length||0,
  accountPageTitle: (document.getElementById('dashName')||{}).textContent,
}));
console.log(JSON.stringify(info,null,1));
const el=await p.$('.dash-view[data-view="profile"]');
if(el) await el.screenshot({path:path.join(OUT,'account-profile-after.png')}).catch(()=>{});
console.log('errors:', errs.length?errs.join(' | '):'none');
await b.close();s.close();})();
