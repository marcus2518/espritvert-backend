import { db_getUserById, db_createUser } from "../data/users";
import { UserDTO } from "../dto/user";

export const getUserById = async (id: string): Promise<UserDTO> => {
  try {
    const user = await db_getUserById(id);
    return user;
  } catch (error: any) {
    throw new Error(`Unable to get user by ID: ${error.message}`);
  }
};

export const createUser = async (user: UserDTO): Promise<{ message: string; userId: string }> => {
  try {
    const result = await db_createUser(user);
    return result;
  } catch (error: any) {
    throw new Error(`Unable to create user: ${error.message}`);
  }
};
