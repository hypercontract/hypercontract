import { Module } from '@nestjs/common';
import { HomepageModule } from './homepage/homepage.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ProfileModule } from './profile';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { USerProfileModule } from './user-profile/user-profile.module';

@Module({
    imports: [
        HomepageModule,
        OrdersModule,
        ProductsModule,
        ProfileModule,
        ShoppingCartModule,
        USerProfileModule
    ]
})
export class AppModule {}
