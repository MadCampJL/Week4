import * as firebase from "firebase";

let database;

// Initialize Firebase
let config = {
  apiKey: "AIzaSyBu6shvyujL6MApuB2DWu-_q2QW__c13sw",
  authDomain: "madcampjl.firebaseapp.com",
  databaseURL: "https://madcampjl.firebaseio.com",
  projectId: "madcampjl",
  storageBucket: "madcampjl.appspot.com",
  messagingSenderId: "14346225545"
};
firebase.initializeApp(config);

export const fire = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  database = firebase.database();
};
