import { Module } from '@nestjs/common';
import { ProductsModule } from '../products';
import { createStore } from '../store';
import { ShoppingCartService, SHOPPING_CART_ITEM_STORE } from './shopping-cart.service';

@Module({
    imports: [
        ProductsModule
    ],
    providers: [
        ShoppingCartService,
        {
            provide: SHOPPING_CART_ITEM_STORE,
            useValue: createStore()
        }
    ],
    exports: [
        ShoppingCartService
    ]
})
export class ShoppingCartModule {}
