import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "../config/firebaseConfig";

const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    handleAuthError(error);
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    handleAuthError(error);
  }
};

const handleAuthError = (error: any) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.error(`Error [${errorCode}]: ${errorMessage}`);

  switch (errorCode) {
    case "auth/email-already-in-use":
      throw new Error(
        "The email address is already in use by another account."
      );
    case "auth/invalid-email":
      throw new Error("The email address is not valid.");
    case "auth/operation-not-allowed":
      throw new Error("Email/password accounts are not enabled.");
    case "auth/weak-password":
      throw new Error("The password is too weak.");
    case "auth/user-disabled":
      throw new Error("The user account has been disabled.");
    case "auth/user-not-found":
      throw new Error(
        "There is no user record corresponding to this identifier."
      );
    case "auth/wrong-password":
      throw new Error(
        "The password is invalid or the user does not have a password."
      );
    default:
      throw new Error("An unknown error occurred.");
  }
};

export { register, signIn };
