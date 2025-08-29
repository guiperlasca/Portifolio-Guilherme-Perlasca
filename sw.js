// Service Worker para cache offline - MATRIX REVOLUTION 2025
const CACHE_NAME = 'matrix-portfolio-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/sw.js',
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@100;300;400;700;900&family=Share+Tech+Mono:wght@400&family=Rajdhani:wght@200;300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
];

self.addEventListener('install', event => {
    console.log('🔧 MATRIX REVOLUTION 2025 - Service Worker Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ Cache opened');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('🚀 All resources cached successfully');
            })
            .catch(error => {
                console.error('❌ Cache failed:', error);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('🌐 MATRIX REVOLUTION 2025 - Service Worker Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    console.log('📦 Serving from cache:', event.request.url);
                    return response;
                }
                
                console.log('🌐 Fetching from network:', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                                console.log('💾 Cached new resource:', event.request.url);
                            });
                        
                        return response;
                    })
                    .catch(error => {
                        console.error('❌ Fetch failed:', error);
                        
                        // Return offline fallback for HTML requests
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('🔄 Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Perform background sync operations
    console.log('🔄 Performing background sync...');
    return Promise.resolve();
}

// Push notification handling
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body || 'MATRIX REVOLUTION 2025 - New Update Available',
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Explore',
                    icon: '/favicon.ico'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/favicon.ico'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification('MATRIX REVOLUTION 2025', options)
        );
    }
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

console.log('🚀 MATRIX REVOLUTION 2025 - Service Worker Loaded');
console.log('🌐 Next Generation Portfolio Matrix - Offline Ready');
console.log('💻 Developed by Guilherme Perlasca - 2025');
