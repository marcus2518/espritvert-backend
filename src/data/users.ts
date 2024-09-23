// src/data/users.ts

import { db } from "../config/firebaseAdmin";
import { UserDTO } from "../dto/user";
import HttpError from "../utils/httpError";

const collectionName = "users";

export const db_getUserById = async (id: string): Promise<UserDTO> => {
  const userDoc = await db.collection(collectionName).doc(id).get();
  const foundUser = userDoc.data() as UserDTO | undefined;

  if (!foundUser) {
    throw new HttpError(
      `[DATA] Unable to find user with id ${id} in database`,
      404
    );
  }
  //allo
  return foundUser;
};

export const db_createUser = async (userId: string, user: UserDTO): Promise<{ message: string; userId: string }> => {
  try {
    const userRef = db.collection(collectionName).doc(userId);
    await userRef.set({ ...user, postings: [] }); // Initialize postings array
    return { message: "User created successfully", userId: userRef.id };
  } catch (error: any) {
    throw new HttpError(`[DATA] Error creating user: ${error.message}`, 500);
  }
};
