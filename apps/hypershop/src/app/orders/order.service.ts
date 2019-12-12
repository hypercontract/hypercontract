import { Inject, Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { ShoppingCartItem, ShoppingCartService } from '../shopping-cart';
import { EntityId, Store } from '../store';
import { Address, PaymentOption, UserProfileService } from '../user-profile';
import { NewOrder, Order, OrderHistory, OrderStatus } from './order.model';

export const ORDER_STORE = 'ORDER_STORE';

@Injectable()
export class OrderService {

    constructor(
        @Inject(ORDER_STORE) private store: Store<Order>,
        private shoppingCartService: ShoppingCartService,
        private userProfileService: UserProfileService
    ) {}

    public async placeOrder(newOrder: NewOrder) {
        const [shoppingCartItems, billingAddress, shippingAddress, payment] = await Promise.all([
            Promise.all(newOrder.shoppingCartItems.map(
                (shoppingCartItemId: EntityId) => this.shoppingCartService.getShoppingCartItem(shoppingCartItemId)
            )),
            this.userProfileService.getAddress(newOrder.billingAddress),
            this.userProfileService.getAddress(newOrder.shippingAddress),
            this.userProfileService.getPaymentOption(newOrder.payment)
        ]);

        const orderId = await this.store.insert(
            newOrderFrom(shoppingCartItems, billingAddress, shippingAddress, payment)
        );

        await this.shoppingCartService.emptyShoppingCart();

        return orderId;

    }

    public getOrder(id: EntityId) {
        return this.store.getOne(id);
    }

    public async getOrderHistory(): Promise<OrderHistory> {
        const orders = await this.store.find();
        return {
            orders: sortOrdersByDate(orders)
        };
    }

    public cancelOrder(id: EntityId, cancellationReason?: string) {
        return this.store.update(
            id,
            {
                orderStatus: OrderStatus.Cancelled,
                cancellationReason
            }
        );
    }

}

function newOrderFrom(shoppingCartItems: ShoppingCartItem[], billingAddress: Address, shippingAddress: Address, payment: PaymentOption): Order {
    return {
        orderDate: (new Date()).toISOString(),
        orderStatus: OrderStatus.Processing,
        orderItems: shoppingCartItems.map(item => omit(item, ['_id', 'product'])),
        billingAddress: omit(billingAddress, ['_id']),
        shippingAddress: omit(shippingAddress, ['_id']),
        payment: omit(payment, ['_id'])
    };
}

function sortOrdersByDate(orders: Order[]) {
    return orders
        .concat()
        .sort((order1, order2) => new Date(order2.orderDate).valueOf() - new Date(order1.orderDate).valueOf());
}
