import { format } from 'date-fns';
import { globals } from '../layout/globals';
import { getOrderUri } from '../routing';
import { Order, OrderHistory } from './order.model';

const activeNavItem = 'orderHistory';

export function renderOrderHistory({ orders }: OrderHistory) {
    return [
        'orders/templates/order-history',
        {
            activeNavItem,
            orders,
            links: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                order: orders.map(order => getOrderUri(order._id!))
            },
            formatDate,
            ...globals
        }
    ];
}

export function renderOrder(order: Order) {
    const links: { [key: string]: string } = {
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
            ...globals
        }
    ];
}

function formatDate(date: string) {
    return format(new Date(date), 'dd.MM.yyyy HH:mm:ss');
}
