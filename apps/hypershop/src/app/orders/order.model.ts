import { ShoppingCartItem } from '../shopping-cart';
import { Entity, EntityId } from '../store';
import { Address, PaymentOption } from '../user-profile';

export interface Order extends Entity {
    status: OrderStatus;
    items: EntityId[] | OrderItem[];
    billingAddress: EntityId | Address;
    shippingAddress: EntityId | Address;
    payment: EntityId | PaymentOption;
    date: string;
    cancellationReason?: string;
}

export interface NewOrder {
    items: EntityId[];
    billingAddress: EntityId;
    shippingAddress: EntityId;
    payment: EntityId;
}

export interface OrderItem extends ShoppingCartItem {}

export enum OrderStatus {
    Cancelled = 'Cancelled',
    Delivered = 'Delivered',
    Processing = 'Processing',
}
