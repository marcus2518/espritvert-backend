import { Request, Response } from "express";
import { getUserById, createUser } from "../services/userService";
import { UserDTO } from "../dto/user";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.userId);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(error.code ?? 500).send({ message: error.message });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const user: UserDTO = req.body;
    const result = await createUser(user);
    res.status(201).send(result);
  } catch (error: any) {
    res.status(error.code ?? 500).send({ message: error.message });
  }
};
