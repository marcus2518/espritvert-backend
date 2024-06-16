import { Request, Response, NextFunction } from "express";
import { register, signIn } from "../services/authService";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await register(req.body.user, req.body.password);
    res.status(201).send("User registered successfully");
  } catch (error) {
    next(error);
  }
};

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await signIn(req.body.user, req.body.password);
    res.status(201).send("User signed in successfully");
  } catch (error) {
    next(error);
  }
};
