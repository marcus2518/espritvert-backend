import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as firebaseConfigJSON from "../../keys/firebaseConfig.json";

const firebaseConfig = {
  apiKey: firebaseConfigJSON.apiKey,
  authDomain: firebaseConfigJSON.authDomain,
  projectId: firebaseConfigJSON.projectId,
  storageBucket: firebaseConfigJSON.storageBucket,
  messagingSenderId: firebaseConfigJSON.messagingSenderId,
  appId: firebaseConfigJSON.appId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
