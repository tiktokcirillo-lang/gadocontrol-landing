// ═══════════════════════════════════════════
//  GadoControl — Service Worker v3
//  Estratégia: Network-First para o HTML
//  (sempre busca versão nova se online),
//  Cache-First para assets estáticos.
// ═══════════════════════════════════════════

const CACHE = 'gadocontrol-v4.2';

const STATIC_FILES = [
  './manifest.json',
  './icon.svg',
];

// ── Instala e pré-cacheia assets estáticos ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting())
  );
});

// ── Ativa e limpa caches antigos ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Intercept de requisições ──
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // HTML principal: Network-First (sempre tenta buscar versão nova)
  // Se offline, serve do cache
  const isHTML = url.pathname === '/' ||
                 url.pathname.endsWith('.html') ||
                 url.pathname === '';

  if (url.origin === self.location.origin && isHTML) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE).then(c => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request)
          .then(cached => cached || new Response(
            '<h2>Sem conexão</h2><p>Reabra quando tiver internet para carregar a versão mais recente.</p>',
            { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          ))
        )
    );
    return;
  }

  // Assets estáticos (ícone, manifest, fontes): Cache-First
  if (url.origin === self.location.origin ||
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE).then(c => c.put(event.request, clone));
          }
          return response;
        }).catch(() => new Response('', { status: 200 }));
      })
    );
  }
});
