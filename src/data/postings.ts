import { db } from '../config/firebaseAdmin';
import { Posting } from '../dto/posting';
import { v4 as uuidv4 } from 'uuid';

const getPostingsCollection = (userId: string) => {
    return db.collection('users').doc(userId).collection('postings');
};

export const db_addPosting = async (userId: string, posting: Posting): Promise<string> => {
    const postingsCollection = getPostingsCollection(userId);
    const newDoc = postingsCollection.doc(uuidv4());
    await newDoc.set(posting);
    return newDoc.id;
};

export const db_getPosting = async (userId: string, postingId: string): Promise<Posting | null> => {
    const doc = await getPostingsCollection(userId).doc(postingId).get();
    if (!doc.exists) {
        return null;
    }
    return doc.data() as Posting;
};

export const db_getPostings = async (userId: string): Promise<Posting[]> => {
    const snapshot = await getPostingsCollection(userId).get();
    return snapshot.docs.map(doc => doc.data() as Posting);
};

export const db_updatePosting = async (userId: string, postingId: string, posting: Posting): Promise<void> => {
    await getPostingsCollection(userId).doc(postingId).update({ posting });
};

export const db_deletePosting = async (userId: string, postingId: string): Promise<void> => {
    await getPostingsCollection(userId).doc(postingId).delete();
};
