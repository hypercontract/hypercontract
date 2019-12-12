import { Entity, EntityId } from '../store';

export interface ShoppingCart {
    items: ShoppingCartItem[];
    totalPrice: number;
}

export interface ShoppingCartItem extends Entity {
    productName: string;
    productDescription: string;
    price: number;
    quantity: number;
    product: EntityId;
}
