import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { shop } from '../profile/namespaces';
import { getOrdersRootUri, getOrderUri } from '../routing';
import { Order, OrderHistory, OrderStatus } from './order.model';
import { requireEntityId } from '../store/entity.model';

export function toJsonHalOrderHistory({ orders }: OrderHistory) {
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
        getOrderUri(requireEntityId(order))
    );

    if ([OrderStatus.Processing].includes(order.orderStatus)) {
        resource.link(shop('cancel'), getOrderUri(requireEntityId(order)));
    }

    return resource;
}
