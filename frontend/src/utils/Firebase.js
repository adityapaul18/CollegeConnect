
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCD5ntr7q2XlYUdpKD20JJ4G0-99kRrM64",
    authDomain: "chirps-8f6be.firebaseapp.com",
    projectId: "chirps-8f6be",
    storageBucket: "chirps-8f6be.appspot.com",
    messagingSenderId: "367917184425",
    appId: "1:367917184425:web:ff40e1a2248fbba7d9c0b8",
    measurementId: "G-3V9DHV0Y1F"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider =  new  firebase.auth.GoogleAuthProvider();

export { db , auth , provider } ;