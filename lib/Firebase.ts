
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCmdXYoG_f1lx5Y2Hx8TVpYEX2use-F0x8",
    authDomain: "dexons-cb27f.firebaseapp.com",
    projectId: "dexons-cb27f",
    storageBucket: "dexons-cb27f.appspot.com",
    messagingSenderId: "1090175755814",
    appId: "1:1090175755814:web:f070eefff87daef87968e7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app };