import { getOrderUri } from '../routing';
import { Order, OrderHistory } from './order.model';
import { requireEntityId } from '../store/entity.model';

export function toJsonOrderHistory({ orders }: OrderHistory) {
    return {
        orders: orders.map(toJsonOrder)
    };
}

export function toJsonOrder(order: Order) {
    return {
        ...order,
        _id: getOrderUri(requireEntityId(order))
    };
}
