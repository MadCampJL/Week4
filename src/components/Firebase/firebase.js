import app from "firebase/app";
import "firebase/auth";

let config = {
  apiKey: "AIzaSyBu6shvyujL6MApuB2DWu-_q2QW__c13sw",
  authDomain: "madcampjl.firebaseapp.com",
  databaseURL: "https://madcampjl.firebaseio.com",
  projectId: "madcampjl",
  storageBucket: "madcampjl.appspot.com",
  messagingSenderId: "14346225545"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  // Auth API

  doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

}

export default Firebase;
