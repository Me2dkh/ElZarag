self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/', 
        '/index.html', 
        '/style.css', 
        '/script.js', 
        '/uthmanic_warsh_v21.ttf', 
        '/images/bankily_logo.png',
        '/images/sadad_logo.png',
        '/images/bankily_qrcode.png',
        '/images/sadad_qrcode.png',
        '/images/elkarnah_banner.png',
        '/json/aldoali.json', 
        '/json/angko.json',
        '/lamat.json',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css'
      ])
    })
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // إذا نجح الجلب من الشبكة، اعرض الملف المحدث
        return response;
      })
      .catch(() => {
        // إذا فشل (أنت أوفلاين)، اعرض النسخة المخزنة في الكاش
        return caches.match(e.request);
      })
  );
});

self.addEventListener('push', event => {
    let data = { title: 'إشعار من الزرگ', body: 'لديك رسالة جديدة!' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: data.icon || '/logo.png',
        badge: '/logo.png',
        vibrate: [100, 50, 100],
        dir: 'rtl',
        data: {
            url: data.url || '/' // الرابط الذي سيفتح عند الضغط على الإشعار
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// 2. التعامل مع الضغط على الإشعار من قبل الطالب
self.addEventListener('notificationclick', event => {
    event.notification.close(); // إغلاق الإشعار

    // فتح التطبيق أو التركيز عليه إذا كان مفتوحاً بالفعل
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                // إذا وجد نافذة مفتوحة للتطبيق، يركز عليها
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus();
                }
            }
            // إذا لم تكن هناك نافذة مفتوحة، يفتح نافذة جديدة
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});
