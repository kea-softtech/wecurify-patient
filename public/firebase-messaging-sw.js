// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyD-oJLUSgaHv1b7Sz4is71DYsEjfxzUCJA",
  authDomain: "fly4smiles-412a2.firebaseapp.com",
  projectId: "fly4smiles-412a2",
  storageBucket: "fly4smiles-412a2.firebasestorage.app",
  messagingSenderId: "314133128034",
  appId: "1:314133128034:web:c5ea7865f1bf345ddd023b",
  measurementId: "G-9ELEGBM876"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});