// Register the Service Worker after loading the first page
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
	navigator.serviceWorker.register('/table.js').then(function (registration) {
	    // Registration was successful
	    console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function (err) {
			// registration failed
			console.log('ServiceWorker registration failed: ', err);
		})
	})
}
// Install Service Worker
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open('myCache')
      .then(function(cache) {
        console.log('Caching ...', urlsToCache);
        return cache.addAll(urlsToCache);
      })
  )
})
