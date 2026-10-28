// Service worker do Firebase Cloud Messaging — precisa ficar com esse nome
// exato (firebase-messaging-sw.js) na raiz da pasta do app pra funcionar.
// É ele que recebe a notificação quando o app NÃO está aberto na tela.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDCATnPPe20FfVhD2lMEjyOR22kKCFtcvM",
  authDomain: "torre-de-controle-mir.firebaseapp.com",
  projectId: "torre-de-controle-mir",
  storageBucket: "torre-de-controle-mir.firebasestorage.app",
  messagingSenderId: "808973653003",
  appId: "1:808973653003:web:473147e51992b055c5630e",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const titulo = (payload.notification && payload.notification.title) || "Torre de Controle";
  const corpo = (payload.notification && payload.notification.body) || "";
  self.registration.showNotification(titulo, {
    body: corpo,
    icon: "icon-192.png",
    badge: "icon-192.png",
    data: payload.data || {},
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((wins) => {
      for (const w of wins) {
        if ("focus" in w) return w.focus();
      }
      if (clients.openWindow) return clients.openWindow("./");
    })
  );
});
