import { db_addPosting, db_getPosting, db_getPostings, db_updatePosting, db_deletePosting } from '../data/postings';
import { PostingDTO } from '../dto/posting';

export const addPosting = async (userId: string, posting: PostingDTO): Promise<{ message: string; postingId: string }> => {
    try {
        const postingId = await db_addPosting(userId, posting);
        return { message: 'Posting created successfully', postingId };
    } catch (error: any) {
        throw new Error(`Unable to create posting: ${error.message}`);
    }
};

export const getPosting = async (userId: string, postingId: string): Promise<PostingDTO> => {
    try {
        const posting = await db_getPosting(userId, postingId);
        if (!posting) {
            throw new Error('Posting not found');
        }
        return posting;
    } catch (error: any) {
        throw new Error(`Unable to get posting: ${error.message}`);
    }
};

export const getPostings = async (userId: string): Promise<PostingDTO[]> => {
    try {
        const postings = await db_getPostings(userId);
        return postings;
    } catch (error: any) {
        throw new Error(`Unable to get postings: ${error.message}`);
    }
};

export const updatePosting = async (userId: string, postingId: string, posting: PostingDTO): Promise<{ message: string }> => {
    try {
        await db_updatePosting(userId, postingId, posting);
        return { message: 'Posting updated successfully' };
    } catch (error: any) {
        throw new Error(`Unable to update posting: ${error.message}`);
    }
};

export const deletePosting = async (userId: string, postingId: string): Promise<{ message: string }> => {
    try {
        await db_deletePosting(userId, postingId);
        return { message: 'Posting deleted successfully' };
    } catch (error: any) {
        throw new Error(`Unable to delete posting: ${error.message}`);
    }
};
