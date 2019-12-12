import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../formats/handler';
import { MediaType } from '../formats/media-type';
import { getProductPath, getProductsBasePath, getProductsRootPath } from '../routing/product.uris';
import { EntityId } from '../store';
import { ProductService } from './product.service';
import { renderProduct, renderSearchResults } from './products.html';
import { toJsonLdProduct, toJsonLdSearchResults } from './products.json-ld';

@Controller(getProductsBasePath())
export class ProductsController {

    constructor(
        private productService: ProductService
    ) {}

    @Get(getProductsRootPath())
    async getSearchResults(
        @Res() response: Response,
        @Query('queryString') queryString: string
    ) {
        const searchResults = await this.productService.searchCatalog(queryString);

        return sendResponse(response, {
            json: searchResults,
            html: renderSearchResults(searchResults),
            // [jsonHalWithProfile]: hal.fromProducts(products, query),
            [MediaType.JsonLd]: toJsonLdSearchResults(searchResults, queryString)
        });
    }

    @Get(getProductPath())
    async getProduct(
        @Res() response: Response,
        @Param('productId') productId: EntityId
    ) {
        const product = await this.productService.getProduct(productId);

        return sendResponse(response, {
            json: product,
            html: renderProduct(product),
            // [jsonHalWithProfile]: hal.fromProduct(product),
            [MediaType.JsonLd]: toJsonLdProduct(product)
        });
    }

}
