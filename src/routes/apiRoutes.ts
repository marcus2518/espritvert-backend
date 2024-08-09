import express from "express";
import userRouter from "./userRoutes";
import postingRouter from "./postingRoutes";
import rentalRouter from "./rentalRoutes";

const router = express.Router();

router.use("/users", userRouter);

router.use("/postings", postingRouter)

router.use('/rentals', rentalRouter);
export default router;
