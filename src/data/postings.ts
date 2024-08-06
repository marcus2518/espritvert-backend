// src/data/postings.ts

import { db } from '../config/firebaseAdmin';
import { PostingDTO, PostingWithId } from '../dto/posting';
import { v4 as uuidv4 } from 'uuid';

const getPostingsCollection = (userId: string) => {
    return db.collection('users').doc(userId).collection('postings');
};

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

const getUsersCollection = () => {
    return db.collection('users');
};

export const db_getAllPostingsWithPagination = async (pageSize: number, page: number, category?: string): Promise<(PostingWithId & { ownerId: string })[]> => {
    const usersSnapshot = await getUsersCollection().get();
    let totalPostings: (PostingWithId & { ownerId: string })[] = [];

    for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const postingsCollection = getUsersCollection().doc(userId).collection('postings');
        const postingsSnapshot = await postingsCollection.get();

        postingsSnapshot.forEach(postingDoc => {
            const postingData = postingDoc.data() as PostingDTO;
            if (!category || (category && postingData.category === category)) {
                const postingWithId: PostingWithId & { ownerId: string } = {
                    ...postingData,
                    id: postingDoc.id,
                    ownerId: userId,
                };
                totalPostings.push(postingWithId);
            }
        });
    }

    totalPostings = totalPostings.sort((a, b) => {
        const dateA = new Date(a.startDate as Date);
        const dateB = new Date(b.startDate as Date);
        return dateB.getTime() - dateA.getTime();
    });

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedPostings = totalPostings.slice(startIndex, endIndex);

    return paginatedPostings;
};
