// src/dto/userDTO.ts

export interface UserDTO {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    prenom: string;
    nom: string;
    dateOfBirth: Date | undefined;
    email: string;
    postings: string[];
    rentals: string[];
}
