import { Controller, Get, Res } from '@nestjs/common';
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
    getAll(@Res() response: Response) {
        this.productService.findProducts('')
            .then(products => sendResponse(response, {
                html: fromProducts(products)
            }));
    }

    @Get(getProductPath())
    get(@Res() response: Response) {
        sendResponse(response, {
            html: fromProduct({
                _id: '',
                description: '',
                image: '',
                name: '',
                price: 0
            })
        });
    }

}
