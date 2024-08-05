import express from "express";
import { getUser, addUser } from "../controllers/userController";
import { checkIfAuthenticated } from '../middleware/authMiddleware';

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
 *     security:
 *       - bearerAuth: []
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
router.get("/:userId", checkIfAuthenticated, getUser);

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
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               province:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               prenom:
 *                 type: string
 *               nom:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date-time
 *             example:
 *               id: "12345"
 *               address: "123 Main St"
 *               city: "New York"
 *               province: "NY"
 *               postalCode: "10001"
 *               prenom: "John"
 *               nom: "Doe"
 *               dateOfBirth: "1990-01-01T00:00:00.000Z"
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
