import { Comment } from './comment';

export interface Book {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}

export interface BookWithComments extends Book {
    comments: Comment[];
}
