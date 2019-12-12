import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../content-negotiation';
import { getBasePath, getProductPath, getRootPath } from './product.uris';
import { fromProduct, fromProducts } from './products.html';

@Controller(getBasePath())
export class ProductsController {

    @Get(getRootPath())
    getAll(@Res() response: Response) {
        sendResponse(response, {
            html: fromProducts([])
        });
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
