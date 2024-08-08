// src/dto/posting.ts

export interface PostingDTO {
    title: string;
    description: string;
    price: string;
    location: string;
    startDate: Date
    endDate: Date
    image: string
    category: string;
    userId: string
}

export interface PostingWithId extends PostingDTO {
    id: string;
}
