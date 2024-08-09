import express from 'express';
import { rentItem, getRentals } from '../controllers/rentalController';
import { checkIfAuthenticated } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Rental management
 */

/**
 * @swagger
 * /api/rentals/{postingId}/rent:
 *   post:
 *     summary: Rent an item
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: postingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the posting to rent
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Rental created successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User or posting not found
 *       500:
 *         description: Internal server error
 */
router.post('/:postingId/rent', checkIfAuthenticated, rentItem);

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     summary: Get all rentals for the authenticated user
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of rentals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RentalDTO'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', checkIfAuthenticated, getRentals);

export default router;
