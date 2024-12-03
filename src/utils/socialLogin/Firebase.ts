import { getApps, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getMessaging, getToken, isSupported } from 'firebase/messaging'; // Add isSupported for checking messaging support
import { getDatabase } from 'firebase/database';
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '../constants';

// const firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: FIREBASE_AUTH_DOMAIN,
//   projectId: FIREBASE_PROJECT_ID,
//   storageBucket: FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
//   appId: FIREBASE_APP_ID,
//   measurementId: FIREBASE_MEASUREMENT_ID,
// };
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAv4cWdDJS241httoVdmq0owEE8hPovgjc',
  authDomain: 'toraveka-fcb14.firebaseapp.com',
  databaseURL: 'https://toraveka-fcb14-default-rtdb.firebaseio.com',
  projectId: 'toraveka-fcb14',
  storageBucket: 'toraveka-fcb14.firebasestorage.app',
  messagingSenderId: '277968356430',
  appId: '1:277968356430:web:3ff1eb2293612536842f1f',
  measurementId: 'G-F11SY36S5H',
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const database = getDatabase(app);

// let messaging: any = null;
// if (typeof window !== 'undefined') {
//   isSupported()
//     .then((supported) => {
//       if (supported) {
//         messaging = getMessaging(app);
//       }
//     })
//     .catch((error) => {
//       console.error(
//         'Firebase messaging is not supported in this browser',
//         error
//       );
//     });
// }
export {
  //  messaging,
  getToken,
};
