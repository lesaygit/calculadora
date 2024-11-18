const CACHE_NAME = 'calculadora-cache-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/calculator.js'
];

// Instalar el Service Worker y cachear recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache abierta:', CACHE_NAME);
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar el Service Worker y eliminar cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes y responder desde caché o red
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    // Si es navegación, servir index.html desde la caché
    event.respondWith(
      caches.match('/index.html').then((response) => {
        return response || fetch(event.request);
      })
    );
  } else {
    // Si no, buscar en la caché o ir a la red
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      }).catch(() => {
        // Opcional: Manejar recursos faltantes o páginas de error
        return new Response('Sin conexión y recurso no disponible.');
      })
    );
  }
});
