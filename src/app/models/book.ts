export class Book {
    id: number;
    title: string;
    authorList: string;
    description: string;
    rating: number;
    ratings: Map<number, number>;
    comments: Array<string>;
}
