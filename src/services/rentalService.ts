// src/services/rentalService.ts

import { db_addRental, db_getRentals } from '../data/rentals';
import { db_deletePosting, db_getPosting } from '../data/postings';
import { RentalDTO } from '../dto/rental';
import { PostingDTO } from '../dto/posting';

export const createRental = async (postingId: string, renteeId: string): Promise<{ message: string; rentalId?: string }> => {
    try {
        if (postingId === renteeId) {
            return { message: 'Cannot rent items to yourself' };
        }
        const posting: PostingDTO | undefined = await db_getPosting(postingId);
        if (posting) {
            await db_deletePosting(postingId, posting?.userId);
            const rental: RentalDTO = {
                renterId: posting.userId,
                renteeId,
                title: posting.title,
                description: posting.description,
                price: posting.price,
                rentalDate: new Date(Date.now()),
                image: posting.image,
            }
            const rentalId = await db_addRental(rental);
            return { message: 'Rental created successfully', rentalId };
        }
        return { message: 'Rental not found' };
    } catch (error: any) {
        throw new Error(`Unable to create rental: ${error.message}`);
    }
};

export const getUserRentals = async (userId: string): Promise<RentalDTO[]> => {
    try {
        const rentals = await db_getRentals(userId);
        return rentals;
    } catch (error: any) {
        throw new Error(`Unable to get rentals: ${error.message}`);
    }
};
