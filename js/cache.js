const CACHE_NAME = 'calculadora-cache-v2'; // Cambia el nombre si haces actualizaciones
const urlsToCache = [
  '/',                // Página principal
  '/index.html',      // Archivo HTML
  '/css/styles.css',   // Archivo CSS
  '/js/calculator.js'     // Archivo JS
];

// Almacenar recursos en caché cuando cargue la página
async function cacheResources() {
  const cache = await caches.open(CACHE_NAME);
  console.log('Cache abierta:', CACHE_NAME);
  await cache.addAll(urlsToCache);
}

// Leer recursos desde la caché
async function fetchResource(event) {
    try {
      // Intenta obtener el recurso desde la red
      const networkResponse = await fetch(event.request);
      
      // Opcional: Guardar en caché la respuesta obtenida (si es exitoso)
      const cache = await caches.open(CACHE_NAME);
      cache.put(event.request, networkResponse.clone());
  
      return networkResponse;
    } catch (error) {
      // Si falla la red, intenta obtener el recurso desde la caché
      console.log('Fallo la red, buscando en la caché:', event.request.url);
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }
  
      // Si no está en la caché, puedes servir una página de fallback
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
  
      // Si no hay nada, lanza un error
      return new Response('Recurso no disponible y no hay conexión.', {
        status: 503,
        statusText: 'Servicio no disponible'
      });
    }
  }
  

// Event Listeners
window.addEventListener('load', () => {
  cacheResources(); // Almacenar en caché
});

window.addEventListener('fetch', (event) => {
  event.respondWith(fetchResource(event)); // Leer desde la caché o descargar
});
