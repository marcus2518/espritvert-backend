// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as serviceAccount from "../keys/serviceAccountKey.json";
import * as firebaseConfigJSON from "../keys/firebaseConfig.json";

const firebaseConfig = {
  apiKey: firebaseConfigJSON.apiKey,
  authDomain: firebaseConfigJSON.authDomain,
  projectId: firebaseConfigJSON.projectId,
  storageBucket: firebaseConfigJSON.storageBucket,
  messagingSenderId: firebaseConfigJSON.messagingSenderId,
  appId: firebaseConfigJSON.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
