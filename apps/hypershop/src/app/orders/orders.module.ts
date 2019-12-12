import { Module } from '@nestjs/common';
import orders from '../../assets/orders.mock.json';
import { ShoppingCartModule } from '../shopping-cart';
import { createMockStore } from '../store';
import { UserProfileModule } from '../user-profile';
import { OrderService, ORDER_STORE } from './order.service';

@Module({
    imports: [
        ShoppingCartModule,
        UserProfileModule
    ],
    providers: [
        OrderService,
        {
            provide: ORDER_STORE,
            useValue: createMockStore(orders)
        }
    ]
})
export class OrdersModule {}
