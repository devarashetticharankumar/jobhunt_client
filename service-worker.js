// const CACHE_NAME = "jobnirvana-cache-v1";
// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/static/js/bundle.js",
//   "/static/js/main.chunk.js",
//   "/static/js/0.chunk.js",
//   "/android-chrome-192x192.png",
//   "/android-chrome-512x512.png",
//   "/manifest.json",
//   // Add other files you want to cache for offline use
// ];

// // Install Service Worker and cache essential files
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Fetch from the cache if available, else fetch from the network
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       // Cache hit - return the response from cache
//       if (response) {
//         return response;
//       }
//       // Clone the request and fetch from the network
//       return fetch(event.request).then((networkResponse) => {
//         if (
//           !networkResponse ||
//           networkResponse.status !== 200 ||
//           networkResponse.type !== "basic"
//         ) {
//           return networkResponse;
//         }

//         // Cache the new response for future use
//         const responseToCache = networkResponse.clone();
//         caches.open(CACHE_NAME).then((cache) => {
//           cache.put(event.request, responseToCache);
//         });

//         return networkResponse;
//       });
//     })
//   );
// });

// // Clean up old caches when activating a new version of the Service Worker
// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// const CACHE_NAME = "jobNirvana-v1";
// const STATIC_ASSETS = [
//   "/",
//   "/index.html",
//   "/static/js/bundle.js",
//   "/static/js/main.chunk.js",
//   "/static/js/0.chunk.js",
//   "/android-chrome-192x192.png",
//   "/android-chrome-512x512.png",
//   "/manifest.json",
//   // Add other static files to cache
// ];

// // API endpoints to cache
// const API_URLS = [
//   "/jobs/all-jobs",
//   "/jobs/job-details",
//   "/companies",
//   // Add more static endpoints if needed
// ];

// // Regular expression to match dynamic job detail URLs with alphanumeric IDs
// const DYNAMIC_JOB_DETAILS_REGEX = /\/jobs\/all-jobs\/[a-zA-Z0-9]+/; // Matches alphanumeric IDs

// // Install event: Cache the static assets
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Caching static assets");
//       return cache.addAll(STATIC_ASSETS);
//     })
//   );
// });

// // Fetch event: Respond with cached data or fetch from the network
// self.addEventListener("fetch", (event) => {
//   const { request } = event;

//   const isApiRequest = API_URLS.some((url) => request.url.includes(url));

//   // Handle API requests and dynamic job detail requests
//   if (isApiRequest || DYNAMIC_JOB_DETAILS_REGEX.test(request.url)) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then((cache) => {
//         return fetch(request)
//           .then((response) => {
//             // Check if we received a valid response
//             if (response && response.status === 200) {
//               // Clone the response and store it in the cache
//               cache.put(request, response.clone());
//             }
//             return response;
//           })
//           .catch(() => {
//             // If the fetch fails (offline), return the cached response if available
//             return cache.match(request);
//           });
//       })
//     );
//   } else {
//     // For other requests, use the cache or fetch from the network
//     event.respondWith(
//       caches.match(request).then((cachedResponse) => {
//         return cachedResponse || fetch(request);
//       })
//     );
//   }
// });

// // Activate event: Clean up old caches
// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

const CACHE_NAME = "jobNirvana-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/manifest.json",
  // Add other static files to cache
];

// API endpoints to cache
const API_URLS = [
  "/jobs/all-jobs",
  "/jobs/job/",
  "/jobs/myJobs/",
  "/jobs/postjob",
  "/jobs/update-job/",
  // Add other static endpoints if needed
];
// Regular expression to match dynamic job detail URLs with alphanumeric IDs
const DYNAMIC_JOB_DETAILS_REGEX = /\/jobs\/all-jobs\/[a-zA-Z0-9]+/; // Matches alphanumeric IDs

// Install event: Cache the static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Fetch event: Respond with cached data or fetch from the network
self.addEventListener("fetch", (event) => {
  const { request } = event;

  const isApiRequest = API_URLS.some((url) => request.url.includes(url));

  // Handle API requests and dynamic job detail requests
  if (isApiRequest || DYNAMIC_JOB_DETAILS_REGEX.test(request.url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Check if we received a valid response
            if (response && response.status === 200) {
              // Clone the response and store it in the cache
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch((error) => {
            console.error(
              "Fetch failed; returning cached response instead.",
              error
            );
            // If the fetch fails (offline), return the cached response if available
            return cache.match(request).then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Optionally return a fallback response if nothing is cached
              return new Response("No cached data available", { status: 404 });
            });
          });
      })
    );
  } else {
    // For other requests, use the cache or fetch from the network
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).catch((error) => {
          console.error(
            "Fetch failed; returning cached response instead.",
            error
          );
          // Handle offline scenario here if needed
          return new Response("Network error, no cached data available", {
            status: 404,
          });
        });
      })
    );
  }
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/default-icon.png", // Use a default icon if none is provided
      data: { url: data.url },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.error("Push event has no data.");
  }
});
