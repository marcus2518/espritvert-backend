import { Request, Response } from "express";
import { register, signIn, getUserById } from "../services/authService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    await register(req.body.user, req.body.password);
    res.status(201).send("User registered successfully");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    await signIn(req.body.user, req.body.password);
    res.status(201).send("User signed in successfully");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  console.log(req.params);
  try {
    const user = await getUserById(req.params.userId);
    res.status(201).send(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
