const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer-core');
const ROOT=process.cwd(),OUT=path.join(ROOT,'.workbuddy/preview'),PORT=8177;
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2'};
const s=http.createServer((q,r)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(ROOT,u==='/'?'/index.html':u);
fs.readFile(f,(e,b)=>{if(e){r.writeHead(404).end('x');return;}r.writeHead(200,{'Content-Type':MIME[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});r.end(b);});});
// Scenario 1: navigator.clipboard.writeText REJECTS (the real bug scenario — file:// or unfocused).
// We make writeText reject so the code must fall through to the execCommand fallback.
const forceRejectClipboard=()=>{
  try{ Object.defineProperty(navigator,'clipboard',{configurable:true,value:{
    writeText:()=>Promise.reject(new Error('NotAllowedError: secure context / not focused'))
  }}); }catch(e){}
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

// --- Scenario 1: clipboard rejects -> fallback must fire + toast must show ---
const s1=await p.evaluate(()=>{
  window.__execLog=[];
  document.execCommand=function(c){ if(c==='copy') window.__execLog.push('copy'); return true; };
  Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('blocked'))}});
  const value=document.getElementById('referralLink').value;
  document.getElementById('referralCopy').click();
  const btn=document.getElementById('referralCopy');
  return {value, btnText:btn.textContent.trim(), btnCopied:btn.classList.contains('is-copied')};
});
await new Promise(r=>setTimeout(r,400)); // let promise reject + fallback run
const s1after=await p.evaluate(()=>{
  const toastEl=[...document.querySelectorAll('.toast')].slice(-1)[0]||null;
  return {
    execLog:window.__execLog,
    toastText:toastEl?toastEl.textContent.trim():'',
    toastVisible: toastEl ? (getComputedStyle(toastEl).position!=='static') : false,
    btnText:document.getElementById('referralCopy').textContent.trim(),
    btnCopied:document.getElementById('referralCopy').classList.contains('is-copied'),
  };
});
console.log('SCENARIO1 value=',s1.value,' immediateBtn=',JSON.stringify({t:s1.btnText,c:s1.btnCopied}));
console.log('SCENARIO1 execLog=',JSON.stringify(s1after.execLog),' toast=',JSON.stringify(s1after.toastText),' toastVisible=',s1after.toastVisible,' btn=',JSON.stringify({t:s1after.btnText,c:s1after.btnCopied}));

// --- Scenario 2: clipboard succeeds (secure context / localhost) -> toast + button flash, no execCommand ---
const s2=await p.evaluate(()=>{
  window.__execLog=[];
  let wrote=null;
  Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:(t)=>{wrote=t;return Promise.resolve();}}});
  const btn=document.getElementById('referralCopy');
  document.getElementById('referralCopy').click();
  return {wrote, btnText:btn.textContent.trim(), btnCopied:btn.classList.contains('is-copied')};
});
await new Promise(r=>setTimeout(r,300));
const s2after=await p.evaluate(()=>{
  const toastEl=[...document.querySelectorAll('.toast')].slice(-1)[0]||null;
  return {
    execLog:window.__execLog,
    toastText:toastEl?toastEl.textContent.trim():'',
    btnText:document.getElementById('referralCopy').textContent.trim(),
    btnCopied:document.getElementById('referralCopy').classList.contains('is-copied'),
  };
});
console.log('SCENARIO2 wrote=',s2.wrote,' immediateBtn=',JSON.stringify({t:s2.btnText,c:s2.btnCopied}),' toast=',JSON.stringify(s2after.toastText),' execLog(empty expected)=',JSON.stringify(s2after.execLog),' btn=',JSON.stringify({t:s2after.btnText,c:s2after.btnCopied}));

console.log('errors:', errs.length?errs.join(' | '):'none');
await b.close();s.close();})();
