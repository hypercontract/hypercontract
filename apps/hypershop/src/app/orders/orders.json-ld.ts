import { map, omit } from 'lodash';
import { shop, shopify } from '../profile/namespaces';
import { getOrdersRootUri, getOrderUri } from '../routing/order.uris';
import { Order, OrderHistory, OrderStatus } from './order.model';

export function toJsonLdOrderHistory({ orders }: OrderHistory) {
    return {
        '@id': getOrdersRootUri(),
        '@type': shop('Orders'),
        [shop('orders')]: map(orders, toJsonLdOrder)
    };
}

export function toJsonLdOrder(order: Order) {
    const resource: any = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        '@id': getOrderUri(order._id!),
        '@type': shop('Order'),
        ...shopify(omit(order, ['_id']))
    };

    if ([OrderStatus.Processing].includes(order.orderStatus)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        resource[shop('cancel')] = { '@id': getOrderUri(order._id!) };
    }

    return resource;
}
