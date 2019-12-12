import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { shop } from '../profile/namespaces';
import { getOrdersRootUri, getOrderUri } from '../routing';
import { Order, OrderHistory, OrderStatus } from './order.model';

export function toJsonHalOrders({ orders }: OrderHistory) {
    return Resource(
        {},
        getOrdersRootUri()
    )
        .embed(
            shop('orders'),
            map(orders, toJsonHalOrder)
        );
}

export function toJsonHalOrder(order: Order) {
    const resource = Resource(
        omit(order, ['_id']),
        getOrderUri(order._id!)
    );

    if ([OrderStatus.Processing].includes(order.orderStatus)) {
        resource.link(shop('cancel'), getOrderUri(order._id!));
    }

    return resource;
}
