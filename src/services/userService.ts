import { db_getUserById } from "../data/users";

export const getUserById = (id: string) => {
  return db_getUserById(id).then((user) => user);
};
