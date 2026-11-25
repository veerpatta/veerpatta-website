/* Navigations use the network first, so online parents see the current release. */
const CACHE = 'vpps-v17-amet-students';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(['/en/', '/hi/'])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith('vpps-') && key !== CACHE).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.mode !== 'navigate' || req.method !== 'GET' || new URL(req.url).origin !== self.location.origin || req.headers.has('range')) return;
  event.respondWith(fetch(req).then(response => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {}));
    }
    return response;
  }).catch(async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    return new Response('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Veer Patta · Offline</title><main><h1>Veer Patta</h1><p>Connect to the internet to open this page.</p><p lang="hi">यह पृष्ठ देखने के लिए इंटरनेट से जुड़ें।</p><a href="/en/">English homepage</a> · <a href="/hi/" lang="hi">हिंदी मुखपृष्ठ</a></main></html>', {
      status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }));
});
