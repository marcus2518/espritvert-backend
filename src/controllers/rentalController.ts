// src/controllers/rentalController.ts

import { Response } from 'express';
import { createRental } from '../services/rentalService';
import { IGetAuthTokenRequest } from '../middleware/authMiddleware';

export const rentItem = async (req: IGetAuthTokenRequest, res: Response) => {
    try {
        if (!req.authId) {
            res.status(404).send({ message: 'User not found' });
        } else {
            const { postingId } = req.params;
            if (req.authId) {
                const result = await createRental(postingId, req.authId);
                res.status(201).send(result);
            } else {
                res.status(401).send("Unauthorized");
            }

        }
    } catch (error: any) {
        res.status(error.code ?? 500).send({ message: error.message });
    }
};
