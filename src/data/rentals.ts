import { db } from '../config/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { RentalDTO } from '../dto/rental';
import { v4 as uuidv4 } from 'uuid';

const getRentalsCollection = () => {
    return db.collection('rentals');
};

const getUsersCollection = () => {
    return db.collection('users');
};

export const db_addRental = async (rental: RentalDTO): Promise<string> => {
    const rentalsCollection = getRentalsCollection();
    const newRentalDoc = rentalsCollection.doc(uuidv4());
    await newRentalDoc.set(rental);

    // Update rentee's document to include reference to the new rental
    const renteeDoc = getUsersCollection().doc(rental.renteeId);
    await renteeDoc.update({
        rentals: FieldValue.arrayUnion(newRentalDoc.id)
    });

    // Update renter's document to include reference to the new rental
    const renterDoc = getUsersCollection().doc(rental.renterId);
    await renterDoc.update({
        rentals: FieldValue.arrayUnion(newRentalDoc.id)
    });

    return newRentalDoc.id;
};

export const db_getRentals = async (userId: string): Promise<RentalDTO[]> => {
    const userDoc = await getUsersCollection().doc(userId).get();
    if (!userDoc.exists) {
        return [];
    }
    const userRentals = userDoc.data()?.rentals || [];
    const rentals = await Promise.all(userRentals.map(async (rentalId: string) => {
        const doc = await getRentalsCollection().doc(rentalId).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data() as RentalDTO
            } as RentalDTO;
        }
        return null;
    }));
    return rentals.filter(rental => rental !== null) as RentalDTO[];
};
