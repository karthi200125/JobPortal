
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDuEyjlErbGVek_imMyTm7peCFuIRXokQY",
    authDomain: "dealsdray-e2592.firebaseapp.com",
    projectId: "dealsdray-e2592",
    storageBucket: "dealsdray-e2592.appspot.com",
    messagingSenderId: "205238897615",
    appId: "1:205238897615:web:f41c8be6b6b46717e7a0ba"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app };