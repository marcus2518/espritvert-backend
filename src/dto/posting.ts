// src/dto/posting.ts

export interface PostingDTO {
    title: string;
    description: string;
    price: string;
    location: string;
    startDate: Date | null;
    endDate: Date | null;
    image: string | null;
    category: string;
}

export interface PostingWithId extends PostingDTO {
    id: string;
}
