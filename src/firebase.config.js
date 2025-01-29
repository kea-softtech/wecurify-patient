import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// let firebaseApp 

const firebaseConfig = {
    apiKey: "AIzaSyD-oJLUSgaHv1b7Sz4is71DYsEjfxzUCJA",
    authDomain: "fly4smiles-412a2.firebaseapp.com",
    projectId: "fly4smiles-412a2",
    storageBucket: "fly4smiles-412a2.firebasestorage.app",
    messagingSenderId: "314133128034",
    appId: "1:314133128034:web:c5ea7865f1bf345ddd023b",
    measurementId: "G-9ELEGBM876"
}
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}
// export { firebase }

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)

// Request notification permission and get FCM token
export const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        const token = await getToken(messaging, {
            vapidKey: 'BOgFMMcWfayyIQvlr_NfEOv6viRIqN4r-strDuXP2gnGdzf0atkt4VCjH_jNWXMblQGAFDwb6LLgwa5srPWRDSM', // Replace with your VAPID key from Firebase console
        });
        if (token) {
            return token;
          } else {
            console.error("No FCM token received.");
          }
    } else {
        console.error("Permission not granted for notifications.");
    }
};

// Handle foreground messages
export const handleForegroundMessages = () => {
    onMessage(messaging, (payload) => {
        console.log('Message received in foreground:', payload);
        if (Notification.permission === "granted") {
            // Show the notification
            new Notification(payload.notification.title, {
                body: payload.notification.body,
                // Optional: icon: payload.notification.icon
            });
        }
    });
    console.log('Message received in foreground')
};

export default firebaseConfig;

// export const generateToken = async (userType) => {
//     const permission = await Notification.requestPermission();
//     const messaging = getMessaging(app)
//     if (permission === 'granted') {
//         const token = await getToken(messaging, {
//             vapidKey:
//                 "BMDWDXwp1RZdzOcaUXFFQvlHbRjT3KiXqMxbMpcMWQXfX7lnstS9ROKx5_dZSSWtXqu1_JGF88bFUafvcQR0R_s"
//         })
//         return token;
//     }
//     else {
//         console.error("permission not granted.");
//     }
// }
