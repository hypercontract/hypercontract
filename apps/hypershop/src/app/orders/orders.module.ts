import { Module } from '@nestjs/common';
import { orderMocks } from '../../test';
import { ShoppingCartModule } from '../shopping-cart';
import { createMockStore } from '../store';
import { UserProfileModule } from '../user-profile';
import { OrderService, ORDER_STORE } from './order.service';
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
            provide: ORDER_STORE,
            useValue: createMockStore(orderMocks)
        }
    ]
})
export class OrdersModule {}
