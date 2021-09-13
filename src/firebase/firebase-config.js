import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsQ63h6LoPjXyHaZXyf9_eUO1-mTO-N1c",
    authDomain: "react-app-curso-e57ba.firebaseapp.com",
    projectId: "react-app-curso-e57ba",
    storageBucket: "react-app-curso-e57ba.appspot.com",
    messagingSenderId: "1079796378774",
    appId: "1:1079796378774:web:cfee9942c8dd0ddde0e6b7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Crear referencia a la base de datos
const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}
