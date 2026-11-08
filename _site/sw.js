/* Network-first pages: fresh information, with a small offline fallback. */
const CACHE='vpps-v13-parent-first';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['/en/','/hi/','/404.html'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('vpps-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin||req.headers.has('range')||/\.(mp4|webm)$/i.test(url.pathname))return;
 if(req.mode==='navigate')event.respondWith(fetch(req).then(res=>{
  if(res.ok){
   // Clone while the body is fresh, before it can be consumed by the page.
   const copy=res.clone();
   event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{}));
  }
  return res;
 }).catch(()=>caches.match(req).then(hit=>hit||caches.match('/404.html'))));
});
