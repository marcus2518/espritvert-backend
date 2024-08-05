import express from "express";
import userRouter from "./userRoutes";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

router.use("/users", userRouter);

export default router;
