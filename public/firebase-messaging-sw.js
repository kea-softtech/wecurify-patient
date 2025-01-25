importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCS2lBCypJWuztMyaDqn7npCIZZxI8a6JI",
    authDomain: "keacure-316111.firebaseapp.com",
    projectId: "keacure-316111",
    storageBucket: "keacure-316111.appspot.com",
    messagingSenderId: "976025917950",
    appId: "1:976025917950:web:314a49c3e00c69472f48af",
    measurementId: "G-12D5QXWFGF"
};

firebase.initializeApp(firebaseConfig)
const messaging = firebaseConfig.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body:  payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });