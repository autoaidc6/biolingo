const CACHE_NAME = 'biolingo-v3';
const DATA_CACHE_NAME = 'biolingo-data-v1';

// This list should ideally be populated by a build tool.
// For now, we list the essential files for the app shell.
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx', 
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png'
];

// Install the service worker and cache the app shell.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened core cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CACHE_LESSON_DATA') {
        const lessonData = event.data.payload;
        caches.open(DATA_CACHE_NAME).then(cache => {
            const response = new Response(JSON.stringify(lessonData));
            cache.put('/api/courses', response);
            console.log('Lesson data cached by service worker.');
        });
    }
});


// Serve cached content when offline.
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // For API calls for lesson data, serve from cache.
  if (url.pathname === '/api/courses') {
      event.respondWith(
          caches.match(request).then(response => {
              // This should always find a match once the app has loaded once.
              return response || new Response('[]', { headers: { 'Content-Type': 'application/json' } });
          })
      );
      return;
  }

  // For API calls to complete a lesson, mock a success response.
  if (url.pathname === '/api/complete-lesson' && request.method === 'POST') {
      event.respondWith(
          new Response(JSON.stringify({ success: true }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
          })
      );
      return;
  }
  
  // We only want to cache GET requests for other resources.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - fetch from network, then cache the new resource.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200) {
              return response;
            }
            
            if (response.type !== 'basic' && !event.request.url.startsWith(self.location.origin)) {
                return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Clean up old caches on activation.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, DATA_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});