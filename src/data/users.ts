import { db } from "../config/firebaseAdmin";
import HttpError from "../utils/httpError";

const collectionName = "users";

export const db_getUserById = async (id: string) => {
  const foundUser = (await db.collection(collectionName).doc(id).get()).data();
  if (!foundUser)
    throw new HttpError(
      `[DATA] Unable to find user with id ${id} in database`,
      404
    );
  return foundUser;
};
