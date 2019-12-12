import { Entity, EntityId } from '../store';
import { Address, PaymentOption } from '../user-profile';

export interface Order extends Entity {
    orderStatus: OrderStatus;
    orderItems: EntityId[] | OrderItem[];
    billingAddress: EntityId | Address;
    shippingAddress: EntityId | Address;
    payment: EntityId | PaymentOption;
    orderDate: string;
    cancellationReason?: string;
}

export interface OrderHistory {
    orders: Order[];
}

export interface NewOrder {
    shoppingCartItems: EntityId[];
    billingAddress: EntityId;
    shippingAddress: EntityId;
    payment: EntityId;
}

export interface OrderItem {
    productName: string;
    productDescription: string;
    price: number;
    quantity: number;
}

export enum OrderStatus {
    Cancelled = 'Cancelled',
    Delivered = 'Delivered',
    Processing = 'Processing',
}
