import { Module } from '@nestjs/common';
import { HomepageModule } from './homepage';
import { OrdersModule } from './orders';
import { ProductsModule } from './products';
import { ProfileModule } from './profile';
import { ShoppingCartModule } from './shopping-cart';
import { UserProfileModule } from './user-profile';

@Module({
    imports: [
        HomepageModule,
        OrdersModule,
        ProductsModule,
        ProfileModule,
        ShoppingCartModule,
        UserProfileModule
    ]
})
export class AppModule {}
