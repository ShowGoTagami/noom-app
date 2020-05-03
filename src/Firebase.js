
import * as firebase from 'firebase/app';

import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBnUG8cMztogDqcZN4juJYnSFymqNH8oUM",
  authDomain: "noom-app.firebaseapp.com",
  databaseURL: "https://noom-app.firebaseio.com",
  projectId: "noom-app",
  storageBucket: "noom-app.appspot.com",
  messagingSenderId: "68338624587",
  appId: "1:68338624587:web:c4adc6f8cd2deb4c7605ce",
  measurementId: "G-LQ71J37G3Y"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
