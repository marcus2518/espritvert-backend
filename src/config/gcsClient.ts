import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config();

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    credentials: {
        private_key: process.env.GCLOUD_PRIVATE_KEY,
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
    },
});

const bucket = storage.bucket("posting_images");

export { storage, bucket };
