import firebase from 'firebase/app'
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyAU3y0tVB3LMCiw4yfj-wmphxXifWHNaWo",
    authDomain: "movies-26af1.firebaseapp.com",
    projectId: "movies-26af1",
    storageBucket: "movies-26af1.appspot.com",
    messagingSenderId: "176003564893",
    appId: "1:176003564893:web:b442f389656eded2d154b4",
    measurementId: "G-Z72KFDSKMD"
};


export const app = firebase.initializeApp(firebaseConfig);