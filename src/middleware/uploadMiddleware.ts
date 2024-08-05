// src/middleware/uploadMiddleware.ts

import multer from 'multer';
import { bucket } from '../config/gcsClient';
import { v4 as uuidv4 } from 'uuid';

// Multer storage configuration for memory storage
const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadToGCS = async (file: Express.Multer.File) => {
    const blob = bucket.file(`${uuidv4()}-${file.originalname}`);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    return new Promise((resolve, reject) => {
        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.on('error', (err) => {
            reject(err);
        });

        blobStream.end(file.buffer);
    });
};

export { upload, uploadToGCS };
