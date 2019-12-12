import { Module } from '@nestjs/common';
import { productMocks } from '../../test';
import { createMockStore } from '../store';
import { ProductService, PRODUCT_STORE } from './product.service';
import { ProductsController } from './products.controller';

@Module({
    controllers: [
        ProductsController
    ],
    providers: [
        ProductService,
        {
            provide: PRODUCT_STORE,
            useValue: createMockStore(productMocks)
        }
    ],
    exports: [
        ProductService
    ]
})
export class ProductsModule {}
