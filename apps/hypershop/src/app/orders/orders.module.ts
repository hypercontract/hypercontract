import { Module } from '@nestjs/common';
import { orderMocks } from '../../test/orders.mock';
import { ShoppingCartModule } from '../shopping-cart';
import { createMockStore } from '../store';
import { UserProfileModule } from '../user-profile';
import { Order } from './order.model';
import { ORDERS, OrderService, ORDER_STORE } from './order.service';
import { OrdersController } from './orders.controller';

@Module({
    imports: [
        ShoppingCartModule,
        UserProfileModule
    ],
    controllers: [
        OrdersController
    ],
    providers: [
        OrderService,
        {
            provide: ORDERS,
            useValue: orderMocks
        },
        {
            provide: ORDER_STORE,
            useFactory: (orders: Order[]) => createMockStore(orders),
            inject: [ORDERS]
        }
    ]
})
export class OrdersModule {}
