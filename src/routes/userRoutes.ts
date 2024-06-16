import express, { Request, Response, NextFunction } from "express";
import { registerUser, signInUser } from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/signin", signInUser);

export default router;
