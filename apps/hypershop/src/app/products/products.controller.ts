import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../content-negotiation';
import { getProductPath, getProductsBasePath, getProductsRootPath } from '../routing/product.uris';
import { ProductService } from './product.service';
import { fromProduct, fromProducts } from './products.html';

@Controller(getProductsBasePath())
export class ProductsController {

    constructor(
        private productService: ProductService
    ) {}

    @Get(getProductsRootPath())
    async getAll(
        @Res() response: Response,
        @Query('query') query: string
    ) {
        const products = await this.productService.findProducts(query);

        return sendResponse(response, {
            json: products,
            html: fromProducts(products),
            // [jsonHalWithProfile]: hal.fromProducts(products, query),
            // [jsonLdWithProfile]: ld.fromProducts(products, query)
        });
    }

    @Get(getProductPath())
    async get(
        @Res() response: Response,
        @Param('productId') productId: string
    ) {
        const product = await this.productService.getProduct(productId);

        return sendResponse(response, {
            json: product,
            html: fromProduct(product),
            // [jsonHalWithProfile]: hal.fromProduct(product),
            // [jsonLdWithProfile]: ld.fromProduct(product)
        });
    }

}
