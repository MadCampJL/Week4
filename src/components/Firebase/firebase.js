import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

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
    this.storage = app.storage();
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

  doRecordUser = (authUser, email, password) => 
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

  getUserInfo = (authUser) => new Promise((resolve, reject) => {
    this.user(authUser.uid)
      .get()
      .then((doc) => {
        console.log(doc);
        if (doc.exists) {
          resolve(doc.data())
        } else {
            // doc.data() will be undefined in this case
          console.log("No such document!");
          reject();
        }
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
    

}

export default Firebase;
