import firebase from 'firebase/compat/app';

import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyB0no6H12m6RE51ePQx-2OzZtEkFDdxc6c",
  authDomain: "chatappcountinue.firebaseapp.com",
  projectId: "chatappcountinue",
  storageBucket: "chatappcountinue.appspot.com",
  messagingSenderId: "639104519450",
  appId: "1:639104519450:web:32da6aaf71a515092bb0a3",
  measurementId: "G-9S34XL6PSX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
  // auth.useEmulator('http://localhost:9099');
  // db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;
