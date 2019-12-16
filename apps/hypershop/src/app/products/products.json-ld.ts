import { map, omit } from 'lodash';
import { shop, shopify } from '../profile/namespaces';
import { getCatalogSearchUri, getProductUri, getShoppingCartItemsUri } from '../routing';
import { Product, SearchResults } from './product.model';

export function toJsonLdSearchResults(searchResults: SearchResults, queryString?: string) {
    return {
        '@id': getCatalogSearchUri(queryString),
        '@type': shop('SearchResults'),
        ...shopify(searchResults),
        [shop('products')]: map(searchResults.products, toJsonLdProduct)
    };
}

export function toJsonLdProduct(product: Product) {
    return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        '@id': getProductUri(product._id!),
        '@type': shop('Product'),
        ...shopify(omit(product, ['_id', 'image'])),
        [shop('image')]: { '@id': product.image },
        [shop('addToShoppingCart')]: { '@id': getShoppingCartItemsUri() }
    };
}
