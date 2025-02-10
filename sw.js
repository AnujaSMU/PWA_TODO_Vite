// Service Worker Lifecycle: Install Event
// This event is the first step in the service worker lifecycle. It's used to set up the local environment for the service worker, like caching the necessary assets.
self.addEventListener("install", function (event) {
  const cacheName = "cache-indexeddb-app";

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // Delete any caches that don't match the current version
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            console.log(`Deleting outdated cache: ${name}`);
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      return caches.open(cacheName).then(function (cache) {
        return cache.addAll([
          "/",
          "/index.html",
          "/src/db.js",
          "/src/App.jsx",
          "/manifest.json",
          "/favicon.ico",
          "/src/App.css",
          "/src/main.jsx",
          "/smu-icon-96x96.png",
          "/smu-icon-192x192.png",
        ]);
      });
    })
  );
});

// Service Worker Lifecycle: Activate Event
// This event is generally used to clean up old caches and do other setup after a new service worker takes over.
self.addEventListener("activate", function (event) {
  // Log to console when the service worker is activated.
  console.log("Service worker activated", event);
});

// Fetch Event
// This event is triggered every time a network request is made. It's used to intercept these requests and respond with cached assets if available.
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (res) {
      // If the resource is in the cache, return it, otherwise fetch it from the network.
      return res || fetch(event.request).catch(() => {
        return caches.match("/index.html");
      });
    })
  );
});
