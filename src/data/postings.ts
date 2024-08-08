import { db } from '../config/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { PostingDTO, PostingWithId } from '../dto/posting';
import { v4 as uuidv4 } from 'uuid';

const getPostingsCollection = () => {
    return db.collection('postings');
};

const getUsersCollection = () => {
    return db.collection('users');
};

export const db_addPosting = async (posting: PostingDTO): Promise<string> => {
    const postingsCollection = getPostingsCollection();
    const newDoc = postingsCollection.doc(uuidv4());
    await newDoc.set(posting);

    // Update user's document to include reference to the new posting
    const userDoc = getUsersCollection().doc(posting.userId);
    await userDoc.update({
        postings: FieldValue.arrayUnion(newDoc.id)
    });

    return newDoc.id;
};

export const db_getPosting = async (postingId: string): Promise<PostingDTO | undefined> => {
    const doc = await getPostingsCollection().doc(postingId).get();
    if (!doc.exists) {
        return undefined;
    }
    return doc.data() as PostingDTO;
};

export const db_getPostings = async (userId: string): Promise<PostingWithId[]> => {
    const userDoc = await getUsersCollection().doc(userId).get();
    if (!userDoc.exists) {
        return [];
    }
    const userPostings = userDoc.data()?.postings || [];
    const postings = await Promise.all(userPostings.map(async (postingId: string) => {
        const doc = await getPostingsCollection().doc(postingId).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data() as PostingDTO
            } as PostingWithId;
        }
        return null;
    }));
    return postings.filter(posting => posting !== null) as PostingWithId[];
};

export const db_updatePosting = async (postingId: string, posting: PostingDTO): Promise<void> => {
    await getPostingsCollection().doc(postingId).update({ ...posting });
};

export const db_deletePosting = async (postingId: string, userId: string): Promise<void> => {
    await getPostingsCollection().doc(postingId).delete();

    // Update user's document to remove reference to the deleted posting
    const userDoc = getUsersCollection().doc(userId);
    await userDoc.update({
        postings: FieldValue.arrayRemove(postingId)
    });
};

export const db_getAllPostingsWithPagination = async (pageSize: number, page: number, category?: string): Promise<PostingWithId[]> => {
    let query = getPostingsCollection().orderBy('startDate', 'desc');

    if (category) {
        query = query.where('category', '==', category);
    }

    const snapshot = await query.limit(pageSize).offset((page - 1) * pageSize).get();

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as PostingDTO
    }));
};
