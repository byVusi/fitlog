const CACHE_NAME = "fitlog-cache-v1";
const urlsToCache = [
	"/",
	"/index.html",
	"/assets/media/images/profile-pic.jpg",
	"/assets/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
	"/assets/fonts/Open_Sans-VariableFont_wdth,wght.ttf",
	"assets/css/layout.css",
	"assets/css/typography.css",
	"assets/css/colors.css",
	"assets/css/typography.css",
	"assets/css/main.css",
	"assets/js/main.js",
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
