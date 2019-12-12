import { Module } from '@nestjs/common';
import { productMocks } from '../../test/products.mock';
// import products from '../../assets/products.mock.json';
import { createMockStore } from '../store';
import { Product } from './product.model';
import { PRODUCTS, ProductService, PRODUCT_STORE } from './product.service';
import { ProductsController } from './products.controller';

@Module({
    controllers: [
        ProductsController
    ],
    providers: [
        ProductService,
        {
            provide: PRODUCTS,
            useValue: productMocks
        },
        {
            provide: PRODUCT_STORE,
            useFactory: (products: Product[]) => createMockStore(products),
            inject: [PRODUCTS]
        }
    ],
    exports: [
        ProductService
    ]
})
export class ProductsModule {}
