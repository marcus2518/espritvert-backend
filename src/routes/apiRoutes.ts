import express from "express";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: User authentification
 */

router.use("/auth", authRouter);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

router.use("/users", userRouter);

export default router;
