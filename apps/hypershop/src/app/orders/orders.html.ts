import { format } from 'date-fns';
import { shop } from '../profile/namespaces';
import { getOrdersRootUri, getOrderUri } from '../routing';
import { Order, OrderHistory } from './order.model';

const activeNavItem = 'orderHistory';

export function renderOrderHistory({ orders }: OrderHistory) {
    return [
        'orders/templates/order-history',
        {
            activeNavItem,
            orders,
            links: {
                self: getOrdersRootUri(),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                order: orders.map(order => getOrderUri(order._id!))
            },
            formatDate,
            shop
        }
    ];
}

export function renderOrder(order: Order) {
    const links: { [key: string]: string } = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        self: getOrderUri(order._id!),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        addToShoppingCart: getOrderUri(order._id!)
    };

    if (['PaymentDue', 'Processing'].includes(order.orderStatus)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        links.cancel = getOrderUri(order._id!);
    }

    return [
        'orders/templates/order',
        {
            activeNavItem,
            order,
            links,
            formatDate,
            shop
        }
    ];
}

function formatDate(date: string) {
    return format(new Date(date), 'dd.MM.yyyy HH:mm:ss');
}
