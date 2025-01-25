// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCS2lBCypJWuztMyaDqn7npCIZZxI8a6JI",
    authDomain: "keacure-316111.firebaseapp.com",
    projectId: "keacure-316111",
    storageBucket: "keacure-316111.appspot.com",
    messagingSenderId: "976025917950",
    appId: "1:976025917950:web:314a49c3e00c69472f48af",
    measurementId: "G-12D5QXWFGF"
};

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
firebase.initializeApp(firebaseConfig)
const messaging = firebaseConfig.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body:  payload.notification.body,
    //   icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });