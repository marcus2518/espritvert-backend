// src/controllers/postingController.ts

import { Response, Request } from 'express';
import { addPosting, getPosting, getPostings, updatePosting, deletePosting, getAllPostingsWithPagination } from '../services/postingService';
import { PostingDTO } from '../dto/posting';
import { IGetAuthTokenRequest } from '../middleware/authMiddleware';
import { uploadToGCS } from "../middleware/uploadMiddleware";

export const createPosting = async (req: IGetAuthTokenRequest, res: Response) => {
    try {
        if (!req.authId) {
            res.status(404).send({ message: "User not found" });
        } else {
            const { title, description, price, location, startDate, endDate, category } = req.body;
            let image: string | null = null;
            if (req.file) {
                image = await uploadToGCS(req.file) as string;
            }
            const posting: PostingDTO = { title, description, price, location, startDate, endDate, image, category };
            const result = await addPosting(req.authId, posting);
            res.status(201).send(result);
        }
    } catch (error: any) {
        res.status(error.code ?? 500).send({ message: error.message });
    }
};

export const getSinglePosting = async (req: IGetAuthTokenRequest, res: Response) => {
    try {
        if (!req.authId) {
            res.status(404).send({ message: "User not found" });
        } else {
            const postingId = req.params.postingId;
            const posting = await getPosting(req.authId, postingId);
            res.status(200).send(posting);
        }
    } catch (error: any) {
        res.status(error.code ?? 500).send({ message: error.message });
    }
};

export const getAllPostings = async (req: IGetAuthTokenRequest, res: Response) => {
    try {
        if (!req.authId) {
            res.status(404).send({ message: "User not found" });
        } else {
            const postings = await getPostings(req.authId);
            res.status(200).send(postings);
        }
    } catch (error: any) {
        res.status(error.code ?? 500).send({ message: error.message });
    }
};

export const updatePostingById = async (req: IGetAuthTokenRequest, res: Response) => {
    try {
        if (!req.authId) {
            res.status(404).send({ message: "User not found" });
        } else {
            const postingId = req.params.postingId;
            const { title, description, price, location, startDate, endDate, category } = req.body;
            let image: string | null = null;
            if (req.file) {
                image = await uploadToGCS(req.file) as string;
            }
            const posting: PostingDTO = { title, description, price, location, startDate, endDate, image, category };
            const result = await updatePosting(req.authId, postingId, posting);
            res.status(200).send(result);
        }
    } catch (error: any) {
        res.status(error.code ?? 500).send({ message: error.message });
    }
};

export const deletePostingById = async (req: IGetAuthTokenRequest, res: Response) => {
    try {
        if (!req.authId) {
            res.status(404).send({ message: "User not found" });
        } else {
            const postingId = req.params.postingId;
            const result = await deletePosting(req.authId, postingId);
            res.status(200).send(result);
        }
    } catch (error: any) {
        res.status(error.code ?? 500).send({ message: error.message });
    }
};

export const getAllPostingsFromAll = async (req: Request, res: Response) => {
    try {
        const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
        const page = parseInt(req.query.page as string, 10) || 1;
        const category = req.query.category as string | undefined;

        const postings = await getAllPostingsWithPagination(pageSize, page, category);
        res.status(200).send(postings);
    } catch (error: any) {
        res.status(error.code ?? 500).send({ message: error.message });
    }
};
