const CACHE_NAME = 'pij-simandou-2040-v1.0.0'
const API_CACHE = 'pij-api-cache-v1'
const STATIC_CACHE = 'pij-static-cache-v1'

// Ressources à mettre en cache
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (![CACHE_NAME, API_CACHE, STATIC_CACHE].includes(cacheName)) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Cache First pour les ressources statiques
  if (request.destination === 'image' || 
      request.destination === 'style' || 
      request.destination === 'script') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request)
            .then((response) => {
              const responseClone = response.clone()
              caches.open(STATIC_CACHE)
                .then((cache) => cache.put(request, responseClone))
              return response
            })
        })
    )
    return
  }

  // Network First pour l'API
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(API_CACHE)
              .then((cache) => cache.put(request, responseClone))
          }
          return response
        })
        .catch(() => {
          return caches.match(request)
            .then((response) => {
              if (response) {
                const newHeaders = new Headers(response.headers)
                newHeaders.set('X-From-Cache', 'true')
                return new Response(response.body, {
                  status: response.status,
                  statusText: response.statusText,
                  headers: newHeaders
                })
              }
              return new Response(JSON.stringify({
                error: 'Pas de connexion internet',
                offline: true
              }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
              })
            })
        })
    )
    return
  }

  // Cache First pour le reste
  event.respondWith(
    caches.match(request)
      .then((response) => response || fetch(request))
  )
})
