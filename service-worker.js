const CACHE_NAME = "fitlog-cache-v1";
const urlsToCache = [
	"/",
	"/index.html",
	"/assets/css/layoout.css",
	"/assets/css/typography.css",
	"/assets/css/colors.css",
	"/assets/css/components.css",
	"/assets/css/main.css",
	"/assets/media/images/profile-pic.jpg",
	"/assets/media/icons/icon-192x192.png",
	"/assets/media/icons/icon-512x512.png",
];

// Install event
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
	);
});

// Fetch event
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});

// Activate event
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== CACHE_NAME) {
						return caches.delete(cache);
					}
				})
			);
		})
	);
});
