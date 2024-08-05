// src/routes/postingRoutes.ts

import express from "express";
import { createPosting, getSinglePosting, getAllPostings, updatePostingById, deletePostingById } from "../controllers/postingController";
import { checkIfAuthenticated } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Postings
 *   description: Rental postings management
 */

/**
 * @swagger
 * /api/postings:
 *   post:
 *     summary: Create a new posting
 *     tags: [Postings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *             example:
 *               description: "Tool rental"
 *               price: "100"
 *               location: "New York"
 *               startDate: "2024-01-01T00:00:00.000Z"
 *               endDate: "2024-01-10T00:00:00.000Z"
 *               image: "http://example.com/image.jpg"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Posting created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", checkIfAuthenticated, createPosting);

/**
 * @swagger
 * /api/postings/{postingId}:
 *   get:
 *     summary: Get a posting by ID
 *     tags: [Postings]
 *     parameters:
 *       - in: path
 *         name: postingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Posting ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Posting not found
 *       500:
 *         description: Internal server error
 */
router.get("/:postingId", checkIfAuthenticated, getSinglePosting);

/**
 * @swagger
 * /api/postings:
 *   get:
 *     summary: Get all postings for the authenticated user
 *     tags: [Postings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get("/", checkIfAuthenticated, getAllPostings);

/**
 * @swagger
 * /api/postings/{postingId}:
 *   put:
 *     summary: Update a posting by ID
 *     tags: [Postings]
 *     parameters:
 *       - in: path
 *         name: postingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Posting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *             example:
 *               description: "Updated tool rental"
 *               price: "120"
 *               location: "Los Angeles"
 *               startDate: "2024-02-01T00:00:00.000Z"
 *               endDate: "2024-02-10T00:00:00.000Z"
 *               image: "http://example.com/updated-image.jpg"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Posting updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put("/:postingId", checkIfAuthenticated, updatePostingById);

/**
 * @swagger
 * /api/postings/{postingId}:
 *   delete:
 *     summary: Delete a posting by ID
 *     tags: [Postings]
 *     parameters:
 *       - in: path
 *         name: postingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Posting ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Posting deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.delete("/:postingId", checkIfAuthenticated, deletePostingById);

export default router;
