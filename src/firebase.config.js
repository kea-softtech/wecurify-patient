import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// let firebaseApp 

const firebaseConfig = {
    apiKey: "AIzaSyCS2lBCypJWuztMyaDqn7npCIZZxI8a6JI",
    authDomain: "keacure-316111.firebaseapp.com",
    projectId: "keacure-316111",
    storageBucket: "keacure-316111.appspot.com",
    messagingSenderId: "976025917950",
    appId: "1:976025917950:web:314a49c3e00c69472f48af",
    measurementId: "G-12D5QXWFGF"
}
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}
// export { firebase }

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)

export const generateToken = async (userType) => {
    const permission = await Notification.requestPermission();
    const messaging = getMessaging(app)
    if (permission === 'granted') {
        const token = await getToken(messaging, {
            vapidKey:
                "BMDWDXwp1RZdzOcaUXFFQvlHbRjT3KiXqMxbMpcMWQXfX7lnstS9ROKx5_dZSSWtXqu1_JGF88bFUafvcQR0R_s"
        })
        return token;
    }
    else {
        console.error("permission not granted.");
    }
}

export const listenForMessages = (callback) => {
    onMessage(messaging, (payload) => {
        console.log("Message received.------------------- ", payload);
        // callback(payload.notification);
    });
};