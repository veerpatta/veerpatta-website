// Service Worker for Veer Patta Public School PWA
// Caches critical pages and assets for offline access

const CACHE_NAME = 'vpps-cache-v1';
const BASE_PATH = '/veerpatta-website';

// Files to cache - critical pages and assets
const FILES_TO_CACHE = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/en/`,
  `${BASE_PATH}/hi/`,
  `${BASE_PATH}/en/admissions/`,
  `${BASE_PATH}/hi/admissions/`,
  `${BASE_PATH}/assets/css/style.css`,
  `${BASE_PATH}/assets/js/main.js`,
  `${BASE_PATH}/assets/js/marketing-enhancements.js`,
  `${BASE_PATH}/assets/images/VPPS LOGO ONNLY.jpg`
];

// Install event - cache files
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching files');
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        console.log('[ServiceWorker] Installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[ServiceWorker] Install failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[ServiceWorker] Activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip POST requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if available
        if (cachedResponse) {
          // Fetch fresh copy in background
          fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, response.clone());
                });
              }
            })
            .catch(() => {
              // Network fetch failed, cached version will be used
            });

          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not successful
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clone response as it can only be used once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.error('[ServiceWorker] Fetch failed:', error);

            // Return offline page if available (optional)
            // Could create a custom offline.html page
            throw error;
          });
      })
  );
});
