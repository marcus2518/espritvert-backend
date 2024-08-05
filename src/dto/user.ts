// userDTO.ts

export interface UserDTO {
    id: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    prenom: string;
    nom: string;
    dateOfBirth: Date | null;
}
