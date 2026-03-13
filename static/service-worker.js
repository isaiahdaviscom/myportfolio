/*
  SERVICE WORKER - PRODUCTION ONLY
  ================================
  Only activated in production environment to avoid development caching issues.
  For development, live reload and immediate updates are prioritized.
*/

// Only register and run in production environment
if (self.location.hostname !== 'localhost' && self.location.hostname !== '127.0.0.1') {
  // Update this version string on every production deploy to bust stale caches.
  // Format: portfolio-cache-vYYYYMMDD — bump the date or an incrementing suffix.
  const CACHE_NAME = 'portfolio-cache-v20260312';
  const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.min.css', // Production uses minified CSS
    '/js/main.js',
    '/manifest.webmanifest',
    '/favicon.ico',
    '/images/profile-branded.png'
  ];

  // Install service worker and cache assets
  self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
  });

  // Network-first strategy for better development-like behavior
  self.addEventListener('fetch', event => {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If network request succeeds, update cache and return response
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => {
          // If network fails, fall back to cache
          return caches.match(event.request);
        })
    );
  });

  // Clean up old caches
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
} else {
  // Development environment - disable service worker
  console.log('Service Worker disabled for development environment');
}
