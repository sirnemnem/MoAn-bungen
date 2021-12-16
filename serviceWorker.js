const staticDevCoffee = "v2.15"
const assets = [
  "/",
  "/index.html",
  "/auvi.html",
  "/geo.html",
  "/natbe.html",
  "/opsys.html",
  "/table.html",
  "/css/style.css",
  "/css/style2.css",
  "/js/app.js",
  "/js/auvi.js",
  "/js/geo.js",
  "/js/natbe.js",
  "/js/opsys.js"
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(staticDevCoffee)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(assets);
      })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});


self.addEventListener('activate', function(event) {

  var cacheAllowlist = ['v2.15'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
