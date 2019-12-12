import { Entity } from '../store';

export interface Product extends Entity {
    productName: string;
    productDescription: string;
    price: number;
    image: string;
}

export interface SearchResults {
    products: Product[];
    totalResults: number;
}
