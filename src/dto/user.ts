export interface UserDTO {
    id: string;
    name: string;
    email: string;
    description: string;
    price: string;
    location: string;
    startDate: Date | null;
    endDate: Date | null;
    image: string | null;
    category: number;
}