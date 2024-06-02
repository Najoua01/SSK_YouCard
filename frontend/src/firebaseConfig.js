import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBC7vkrQoqHsyR43ju6GmoXgBm3svez8Pk",
    authDomain: "youcardbackend-9e4c3.firebaseapp.com",
    projectId: "youcardbackend-9e4c3",
    storageBucket: "youcardbackend-9e4c3.appspot.com",
    messagingSenderId: "787785143788",
    appId: "1:787785143788:web:be261e41633df434a65cc9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };