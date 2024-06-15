import admin from "firebase-admin";
import * as serviceAccount from "../keys/serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://espritvert-14157-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();

export { admin, db };
