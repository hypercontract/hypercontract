import { asyncHandler } from '@hypercontract/express';
import { Router } from 'express';
import { sendResponse } from '../formats/handler';
import { MediaType } from '../formats/media-type';
import { getProductPath, getProductsRootPath } from '../routing/product.uris';
import { ProductService } from './product.service';
import { renderProduct, renderSearchResults } from './products.html';
import { toJsonProduct, toJsonSearchResults } from './products.json';
import { toJsonHalProduct, toJsonHalSearchResults } from './products.json-hal';
import { toJsonLdProduct, toJsonLdSearchResults } from './products.json-ld';

export function createProductsRouter(productService: ProductService): Router {
    const router = Router();

    router.get(getProductsRootPath(), asyncHandler(async (request, response) => {
        const queryString = request.query.queryString as string;

        const searchResults = await productService.searchCatalog(queryString);

        return sendResponse(response, {
            json: toJsonSearchResults(searchResults),
            html: renderSearchResults(searchResults, queryString),
            [MediaType.JsonHal]: toJsonHalSearchResults(searchResults, queryString),
            [MediaType.JsonLd]: toJsonLdSearchResults(searchResults, queryString)
        });
    }));

    router.get(getProductPath(), asyncHandler(async (request, response) => {
        const productId = request.params.productId;

        const product = await productService.getProduct(productId);

        return sendResponse(response, {
            json: toJsonProduct(product),
            html: renderProduct(product),
            [MediaType.JsonHal]: toJsonHalProduct(product),
            [MediaType.JsonLd]: toJsonLdProduct(product)
        });
    }));

    return router;
}
