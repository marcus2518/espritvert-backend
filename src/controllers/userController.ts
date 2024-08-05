// src/controllers/userController.ts

import { Response } from "express";
import { getUserById, createUser } from "../services/userService";
import { UserDTO } from "../dto/user";
import { IGetAuthTokenRequest } from "../middleware/authMiddleware";

export const getUser = async (req: IGetAuthTokenRequest, res: Response) => {
  try {
    if (!req.authId) {
      res.status(404).send({ message: "User not found" });
    } else {
      const user = await getUserById(req.authId);
      res.status(200).send(user);
    }
  } catch (error: any) {
    res.status(error.code ?? 500).send({ message: error.message });
  }
};

export const addUser = async (req: IGetAuthTokenRequest, res: Response) => {
  try {
    if (!req.authId) {
      res.status(404).send({ message: "User not found" });
    } else {
      const user: UserDTO = { ...req.body, email: req.email };
      const result = await createUser(req.authId, user);
      res.status(201).send(result);
    }
  } catch (error: any) {
    res.status(error.code ?? 500).send({ message: error.message });
  }
};
