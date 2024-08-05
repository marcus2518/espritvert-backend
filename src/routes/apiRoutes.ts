import express from "express";
import userRouter from "./userRoutes";
import postingRouter from "./postingRoutes";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

router.use("/users", userRouter);
router.use("/postings", postingRouter)

export default router;
