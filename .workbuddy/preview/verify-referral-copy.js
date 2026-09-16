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
  // install a recording stub for execCommand
  window.__execLog=[];
  const orig=document.execCommand.bind(document);
  document.execCommand=function(c){ if(c==='copy') window.__execLog.push('copy'); return true; };
  // force the failing clipboard API
  Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('blocked'))}});
  const value=document.getElementById('referralLink').value;
  document.getElementById('referralCopy').click();
  return {value};
});
await new Promise(r=>setTimeout(r,400)); // let promise reject + fallback run
const s1after=await p.evaluate(()=>({
  execLog:window.__execLog,
  toast:[...document.querySelectorAll('.toast, [data-toast], .ek-toast')].map(t=>t.textContent.trim()).slice(-1)[0]||'',
}));
console.log('SCENARIO1 value=',s1.value);
console.log('SCENARIO1 execLog=',JSON.stringify(s1after.execLog),' toast=',JSON.stringify(s1after.toast));

// --- Scenario 2: clipboard succeeds (secure context / localhost) -> toast must show, no execCommand needed ---
const s2=await p.evaluate(()=>{
  window.__execLog=[];
  let wrote=null;
  Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:(t)=>{wrote=t;return Promise.resolve();}}});
  document.getElementById('referralCopy').click();
  return {wrote};
});
await new Promise(r=>setTimeout(r,300));
const s2after=await p.evaluate(()=>({
  execLog:window.__execLog,
  toast:[...document.querySelectorAll('.toast, [data-toast], .ek-toast')].map(t=>t.textContent.trim()).slice(-1)[0]||'',
}));
console.log('SCENARIO2 wrote=',s2.wrote,' toast=',JSON.stringify(s2after.toast),' execLog(should be empty)=',JSON.stringify(s2after.execLog));

console.log('errors:', errs.length?errs.join(' | '):'none');
await b.close();s.close();})();
