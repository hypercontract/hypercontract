import { Entity, EntityId } from '../store';

export interface ShoppingCart {
    items: ShoppingCartItem[];
    totalPrice: number;
}

export interface ShoppingCartItem extends Entity {
    name: string;
    description: string;
    price: number;
    quantity: number;
    product: EntityId;
}
