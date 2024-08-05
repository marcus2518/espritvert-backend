import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config();

const storage = new Storage();

const bucket = storage.bucket("posting_images");

export { storage, bucket };
