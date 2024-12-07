import { Tag } from "./tags";

export interface Company {
    id: string;
    name: string;
    description: string;
    website: string;
    averageRating: number;
    tags: Tag[];
    posts: string[];
    logoUrl: string;
}