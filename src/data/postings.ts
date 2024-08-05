// src/data/postings.ts

import { db } from '../config/firebaseAdmin';
import { PostingDTO } from '../dto/posting';
import { v4 as uuidv4 } from 'uuid';

const getPostingsCollection = (userId: string) => {
    return db.collection('users').doc(userId).collection('postings');
};

export interface PostingWithId extends PostingDTO {
    id: string;
}

export const db_addPosting = async (userId: string, posting: PostingDTO): Promise<string> => {
    const postingsCollection = getPostingsCollection(userId);
    const newDoc = postingsCollection.doc(uuidv4());
    await newDoc.set(posting);
    return newDoc.id;
};

export const db_getPosting = async (userId: string, postingId: string): Promise<PostingDTO | null> => {
    const doc = await getPostingsCollection(userId).doc(postingId).get();
    if (!doc.exists) {
        return null;
    }
    return doc.data() as PostingDTO;
};

export const db_getPostings = async (userId: string): Promise<PostingWithId[]> => {
    const snapshot = await getPostingsCollection(userId).get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as PostingDTO
    }));
};

export const db_updatePosting = async (userId: string, postingId: string, posting: PostingDTO): Promise<void> => {
    await getPostingsCollection(userId).doc(postingId).update({ posting });
};

export const db_deletePosting = async (userId: string, postingId: string): Promise<void> => {
    await getPostingsCollection(userId).doc(postingId).delete();
};
