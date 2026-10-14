const CACHE_NAME = 'ict-sem3-v2'; // Version ni v1 nunchi v2 ki marchamu[cite: 2]
const urlsToCache = [
  '/ICT-3RD-SEMESTER/',
  '/ICT-3RD-SEMESTER/index.html',
  '/ICT-3RD-SEMESTER/manifest.json',
  '/ICT-3RD-SEMESTER/icons/icon-192.png',
  '/ICT-3RD-SEMESTER/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Paatha cache delete chesthunnam:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network First strategy - Mundhu internet nunchi latest techukuntundi, lekapothe cache vaduthundi
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
