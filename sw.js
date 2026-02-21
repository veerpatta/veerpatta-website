// Service Worker for Veer Patta Public School Website
// PWA-lite implementation with stale-while-revalidate caching strategy

const CACHE_VERSION = 'vpps-v5';

// Compute base path dynamically to work with or without a baseurl
const computeBasePath = () => {
  const scopePath = self.registration?.scope
    ? new URL(self.registration.scope).pathname
    : null;
  const locationPath = new URL(self.location.href).pathname;
  const path = (scopePath || locationPath).replace(/\/?$/, '');
  return path === '' ? '' : path;
};

const BASE_PATH = computeBasePath();
const withBase = (path) => `${BASE_PATH}${path}`;

// Core assets to cache for offline use
const CORE_ASSETS = [
  withBase('/'),
  withBase('/en/'),
  withBase('/hi/'),
  withBase('/en/admissions/'),
  withBase('/hi/admissions/'),
  withBase('/assets/css/style.css'),
  withBase('/assets/css/animations.css'),
  withBase('/assets/css/modern-components.css'),
  withBase('/assets/css/mobile-deep-optimize.css'),
  withBase('/assets/js/main.js'),
  withBase('/assets/js/marketing-enhancements.js'),
  withBase('/assets/js/admission-wizard.js'),
  withBase('/assets/js/fee-calculator.js'),
  withBase('/assets/js/testimonial-carousel.js'),
  withBase('/assets/js/analytics-tracker.js'),
  withBase('/assets/js/media-loader.js'),
  withBase('/assets/js/home-media-loader.js'),
  withBase('/assets/js/gallery-loader.js'),
  withBase('/assets/js/gallery-items.js'),
  withBase('/assets/images/VPPS LOGO ONNLY.jpg')
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
