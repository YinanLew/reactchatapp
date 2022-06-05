// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCfFTO8t-DC5gVm0igy_x4EGBUtvtAnHWo",
    authDomain: "wassup-bd681.firebaseapp.com",
    projectId: "wassup-bd681",
    storageBucket: "wassup-bd681.appspot.com",
    messagingSenderId: "271685313716",
    appId: "1:271685313716:web:94f19187f859d04718e3e1",
    measurementId: "G-JB7PMWRENL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;


