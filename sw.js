/* © 2026 Ramon Betschart – Offline-Speicher nur für die App-Dateien (keine Eingaben der Schüler/innen) */
const CACHE='coaching-vorbereitung-v1';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png',
 'fonts/atkinson-hyperlegible-latin-400-normal.woff2','fonts/atkinson-hyperlegible-latin-700-normal.woff2','fonts/bricolage-grotesque-latin-600-normal.woff2','fonts/bricolage-grotesque-latin-700-normal.woff2'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
/* Zuerst online (immer neueste Version), offline aus dem Speicher */
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).then(r=>{ if(r.ok&&new URL(e.request.url).origin===location.origin){ const c=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,c)); } return r; })
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html')))); });
