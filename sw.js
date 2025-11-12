// Service Worker for Veer Patta Public School Website
// PWA-lite implementation with stale-while-revalidate caching strategy

const CACHE_VERSION = 'vpps-v1';
const BASE_URL = '/veerpatta-website';

// Core assets to cache for offline use
const CORE_ASSETS = [
  `${BASE_URL}/`,
  `${BASE_URL}/en/`,
  `${BASE_URL}/hi/`,
  `${BASE_URL}/en/admissions/`,
  `${BASE_URL}/hi/admissions/`,
  `${BASE_URL}/assets/css/style.css`,
  `${BASE_URL}/assets/css/animations.css`,
  `${BASE_URL}/assets/js/main.js`,
  `${BASE_URL}/assets/images/VPPS LOGO ONNLY.jpg`
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => {
        return cache.addAll(CORE_ASSETS).catch((error) => {
          console.warn('Failed to cache some assets during install:', error);
          // Continue even if some assets fail to cache
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_VERSION)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_VERSION)
      .then((cache) => {
        return cache.match(event.request)
          .then((cachedResponse) => {
            // Fetch from network regardless of cache hit
            const fetchPromise = fetch(event.request)
              .then((networkResponse) => {
                // Update cache with fresh response
                if (networkResponse && networkResponse.status === 200) {
                  cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
              })
              .catch(() => {
                // Network failed, use cache if available
                return cachedResponse;
              });

            // Return cached response immediately (if available), 
            // or wait for network
            return cachedResponse || fetchPromise;
          });
      })
      .catch(() => {
        // Cache open failed, try network only
        return fetch(event.request);
      })
  );
});

// Handle errors gracefully
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});
