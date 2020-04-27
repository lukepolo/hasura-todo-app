import dotenv from "dotenv";
import firebase from "firebase";
import firebaseAdmin from "firebase-admin";

const env = dotenv.config().parsed;

const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  databaseURL: env.databaseURL,
  projectId: env.projectKey,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  credential: firebaseAdmin.credential.cert(
    require("./../serviceAccountKey.json")
  ),
};

firebase.initializeApp(firebaseConfig);
firebaseAdmin.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export { firebase, firebaseAdmin };
