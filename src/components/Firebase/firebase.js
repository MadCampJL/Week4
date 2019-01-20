import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

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
    this.db = app.firestore();
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

  // User API
  user = uid => this.db.collection('users').doc(uid);
  users = () => this.db.collection('users');

  doRecordUser = (authUser, email, password)=> 
  this.user(authUser.user.uid)
      .set({
        email,
        password,
      })
      .then(()=>{
        console.log('New user added to database!');
      })
      .catch((error)=>{
        console.log(error);
      });
}

export default Firebase;
