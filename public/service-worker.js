// public/service-worker.js
self.addEventListener("push", function (event) {
  const data = event.data
    ? event.data.json()
    : { title: "New Job", body: "Check it out!" };
  const options = {
    body: data.body,
    icon: "icon.png", // Path to your notification icon
    badge: "badge.png", // Path to your badge icon
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://jobnirvana.netlify.app/") // URL to open when notification is clicked
  );
});
