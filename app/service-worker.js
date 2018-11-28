const filesToCache = [
    '/',
    'index.html',
    'css/styles.css',
    'js/main.js',
    'js/snow.js',
    'assets/images/snow-village.png'




  ];

  const staticCacheName = 'offline-content';

  self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(cache => {
        console.log('success')
        console.log(cache)
        return cache.addAll(filesToCache);

      })
    );
  });
  self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)


      }).catch(error => {

       return false;

      })
    );
  });
