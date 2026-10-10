const CACHE_NAME = 'ict-sem3-v1';
const urlsToCache = [
  '/ICT-3RD-SEMESTER/',
  '/ICT-3RD-SEMESTER/index.html',
  '/ICT-3RD-SEMESTER/manifest.json',
  '/ICT-3RD-SEMESTER/icons/icon-192.png',
  '/ICT-3RD-SEMESTER/icons/icon-512.png'
];

// Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
