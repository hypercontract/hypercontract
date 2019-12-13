import { Module } from '@nestjs/common';
import { ApiRootModule } from './api-root';
import { OrdersModule } from './orders';
import { ProductsModule } from './products';
import { ShoppingCartModule } from './shopping-cart';
import { UserProfileModule } from './user-profile';

@Module({
    imports: [
        ApiRootModule,
        OrdersModule,
        ProductsModule,
        ShoppingCartModule,
        UserProfileModule
    ]
})
export class AppModule {}
