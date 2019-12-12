import { Inject, Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { ShoppingCartItem, ShoppingCartService } from '../shopping-cart';
import { EntityId, Store } from '../store';
import { Address, PaymentOption, UserProfileService } from '../user-profile';
import { NewOrder, Order, OrderStatus } from './order.model';

export const ORDER_STORE = 'ORDER_STORE';

@Injectable()
export class OrderService {

    constructor(
        @Inject(ORDER_STORE) private store: Store<Order>,
        private shoppingCartService: ShoppingCartService,
        private userProfileService: UserProfileService
    ) {}

    public async createOrder(values: NewOrder) {
        const [lineItems, billingAddress, shippingAddress, payment] = await Promise.all([
            Promise.all(values.items.map(
                (shoppingCartItemId: EntityId) => this.shoppingCartService.getShoppingCartItem(shoppingCartItemId)
            )),
            this.userProfileService.getAddress(values.billingAddress),
            this.userProfileService.getAddress(values.shippingAddress),
            this.userProfileService.getPaymentOption(values.payment)
        ]);

        const orderId = await this.store.insert(
            newOrderFrom(lineItems, billingAddress, shippingAddress, payment)
        );

        await this.shoppingCartService.emptyShoppingCart();

        return orderId;

    }

    public getOrder(id: EntityId) {
        return this.store.findOne(id);
    }

    public async getOrders() {
        const orders = await this.store.find();
        return sortOrdersByDate(orders);
    }

    public updateOrderStatus(id: EntityId, status: OrderStatus) {
        return this.store.update(
            id,
            { status }
        );
    }

}

function newOrderFrom(lineItems: ShoppingCartItem[], billingAddress: Address, shippingAddress: Address, payment: PaymentOption) {
    return {
        date: (new Date()).toISOString(),
        status: OrderStatus.Processing,
        items: lineItems.map(item => omit(item, ['_id'])),
        billingAddress: omit(billingAddress, ['_id']),
        shippingAddress: omit(shippingAddress, ['_id']),
        payment: omit(payment, ['_id'])
    };
}

function sortOrdersByDate(orders: Order[]) {
    return orders
        .concat()
        .sort((order1, order2) => new Date(order2.date).valueOf() - new Date(order1.date).valueOf());
}
