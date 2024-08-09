import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../config/firebaseAdmin';
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

    // Create the rental document
    await newRentalDoc.set({
        renteeId: rental.renteeId,
        renterId: rental.renterId,
        title: rental.title,
        description: rental.description,
        price: rental.price,
        rentalDate: rental.rentalDate,
    });

    const rentalId = newRentalDoc.id;

    // Add the rental ID to the rentee's rentals[] array
    const renteeUserDoc = getUsersCollection().doc(rental.renteeId);
    await renteeUserDoc.update({
        rentals: FieldValue.arrayUnion(rentalId)
    });

    // Add the rental ID to the renter's rentals[] array
    const renterUserDoc = getUsersCollection().doc(rental.renterId);
    await renterUserDoc.update({
        rentals: FieldValue.arrayUnion(rentalId)
    });

    return rentalId;
};
