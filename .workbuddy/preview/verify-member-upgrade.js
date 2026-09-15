const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer-core');
const ROOT=process.cwd(),OUT=path.join(ROOT,'.workbuddy/preview'),PORT=8176;
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
  localStorage.setItem('al.cookieConsent',JSON.stringify({essential:true,ts:Date.now()}));
});
await p.goto('http://localhost:'+PORT+'/member-upgrade.html',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,800));
console.log('INIT',JSON.stringify(await p.evaluate(()=>({options:[...document.getElementById('memberLevel').options].map(o=>o.value+(o.dataset.transient?' [transient]':'')), disabled:document.getElementById('memberLevel').disabled}))));

const search=async id=>{
  await p.evaluate(v=>{const i=document.getElementById('memberIdInput');i.value=v;i.dispatchEvent(new Event('input',{bubbles:true}));
    document.getElementById('memberSearchBtn').click();},id);
  await new Promise(r=>setTimeout(r,300));
  return p.evaluate(()=>({
    options:[...document.getElementById('memberLevel').options].map(o=>o.value+(o.dataset.transient?' [transient]':'')),
    value:document.getElementById('memberLevel').value,
    valueLabel:document.getElementById('memberLevel').selectedOptions[0]?.textContent||null,
    name:document.getElementById('memberNameDisplay').value,
    disabled:document.getElementById('memberLevel').disabled,
    saveDisabled:document.getElementById('saveBtn').disabled,
    status:document.getElementById('mugStatus').textContent.trim(),
  }));
};
console.log('Silver  NG09246375',JSON.stringify(await search('NG09246375')));
// pick Gold -> Save
console.log('PICK GOLD',JSON.stringify(await p.evaluate(()=>{
  const s=document.getElementById('memberLevel'); s.value='Gold'; s.dispatchEvent(new Event('change',{bubbles:true}));
  const out={saveDisabled:document.getElementById('saveBtn').disabled};
  document.getElementById('saveBtn').click();
  out.status=document.getElementById('mugStatus').textContent.trim();
  out.stored=JSON.parse(localStorage.getItem('al.memberLevels')||'{}');
  out.options=[...document.getElementById('memberLevel').options].map(o=>o.value+(o.dataset.transient?' [transient]':''));
  return out;
})));
console.log('Platinum NG27187710',JSON.stringify(await search('NG27187710')));
const card=await p.$('.mug-card'); if(card) await card.screenshot({path:path.join(OUT,'member-upgrade-level.png')}).catch(()=>{});
console.log('back to Silver  ',JSON.stringify(await search('NG09246375')));
console.log('Diamond NG66051653',JSON.stringify(await search('NG66051653')));
console.log('bogus id        ',JSON.stringify(await search('NG123')));
// deep link
await p.goto('http://localhost:'+PORT+'/member-upgrade.html?id=NG23374876',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,800));
console.log('DEEPLINK ?id    ',JSON.stringify(await p.evaluate(()=>({options:[...document.getElementById('memberLevel').options].map(o=>o.value+(o.dataset.transient?' [transient]':'')),value:document.getElementById('memberLevel').value,name:document.getElementById('memberNameDisplay').value}))));
console.log('errors:', errs.length?errs.join(' | '):'none');
const card2=await p.$('.mug-card'); if(card2) await card2.screenshot({path:path.join(OUT,'member-upgrade-level-gold.png')}).catch(()=>{});
await b.close();s.close();})();
