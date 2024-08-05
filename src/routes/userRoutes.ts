import express from "express";
import { getUser, addUser } from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:userId", getUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: string
 *               location:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               image:
 *                 type: string
 *                 nullable: true
 *               category:
 *                 type: integer
 *             example:
 *               id: "123"
 *               name: "John Doe"
 *               email: "john.doe@example.com"
 *               description: "A short bio"
 *               price: "100"
 *               location: "New York"
 *               startDate: "2024-08-05T00:00:00.000Z"
 *               endDate: "2024-08-06T00:00:00.000Z"
 *               image: null
 *               category: 1
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", addUser);

export default router;
