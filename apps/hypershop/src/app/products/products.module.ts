import { Module } from '@nestjs/common';
import products from '../../assets/products.mock.json';
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
            useValue: createMockStore(products)
        }
    ],
    exports: [
        ProductService
    ]
})
export class ProductsModule {}
