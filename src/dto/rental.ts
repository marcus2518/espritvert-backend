export interface RentalDTO {
    renterId: string; // The user who owns the item
    renteeId: string; // The user who is renting the item
    title: string;
    description: string;
    price: string;
    rentalDate: Date;
    image: string;
}
