import {initializeApp} from "firebase/app";
import {collection, getFirestore, getDocs} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB52cGuqbyteiScvu68NS14tZjGCx0HRE0",
    authDomain: "hit200-b9f6d.firebaseapp.com",
    projectId: "hit200-b9f6d",
    storageBucket: "hit200-b9f6d.appspot.com",
    messagingSenderId: "690228219153",
    appId: "1:690228219153:web:ac0de613d1175f44d510b0"
}


initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const usersRef = collection(db,'users')
const clubsRef = collection(db,'clubs')

console.log(auth.currentUser);
export {db,auth, usersRef, clubsRef}; 