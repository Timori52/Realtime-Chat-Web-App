/* eslint-disable no-undef */

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBt5Qc6zhJ88YwrcMjJKrsXwnFgWOsg-Ro",
  authDomain: "my-chat-app-505c8.firebaseapp.com",
  projectId: "my-chat-app-505c8",
  storageBucket: "my-chat-app-505c8.firebasestorage.app",
  messagingSenderId: "122386391494",
  appId: "1:122386391494:web:1c0e4f38e3310943db12c7",
  measurementId: "G-H32YE4L83P",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
);
const notificationTitle = payload.notification.title;
const notificationOptions = {
  body: payload.notification.body,
  icon: payload.notification.icon,
};


  self.registration.showNotification(notificationTitle, notificationOptions);
});
