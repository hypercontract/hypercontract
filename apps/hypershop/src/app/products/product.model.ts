import { Entity } from '../store/entity.model';

export interface Product extends Entity {
    name: string;
    description: string;
    price: number;
    image: string;
}
