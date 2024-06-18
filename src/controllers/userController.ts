import { Request, Response } from "express";
import { getUserById } from "../services/userService";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.userId);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(error.code ?? 500).send(error.message);
  }
};
