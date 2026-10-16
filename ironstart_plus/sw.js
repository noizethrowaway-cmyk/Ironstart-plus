/* IronStart offline shell: cache first for fast loads, revalidate while online. */
const CACHE_NAME = 'ironstart-shell-v3';
const APP_FILES = [
  './', './index.html', './styles.css', './app.js', './manifest.webmanifest',
  './exercise-library.json', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('ironstart-shell-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    const refresh = fetch(request).then(response => {
      if (response && response.ok && response.type === 'basic') cache.put(request, response.clone());
      return response;
    }).catch(() => null);
    // Revalidate the app files in the background so GitHub Pages updates flow through on a later load.
    if (cached) {
      event.waitUntil(refresh);
      return cached;
    }
    const network = await refresh;
    if (network) return network;
    if (request.mode === 'navigate') return (await cache.match('./index.html')) || (await cache.match('./'));
    return new Response('Offline and this resource is not cached.', {status: 503, headers: {'Content-Type':'text/plain; charset=utf-8'}});
  })());
});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
