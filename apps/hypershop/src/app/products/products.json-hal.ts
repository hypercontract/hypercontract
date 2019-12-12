import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { shop } from '../profile/namespaces';
import { getCatalogSearchUri, getProductUri, getShoppingCartItemsUri } from '../routing';
import { Product, SearchResults } from './product.model';

export function toJsonHalSearchResults(searchResults: SearchResults, queryString: string) {
    return Resource(
        {
            totalResults: searchResults.totalResults
        },
        getCatalogSearchUri(queryString)
    )
        .embed(
            shop('products'),
            map(searchResults.products, toJsonHalProduct)
        );
}

export function toJsonHalProduct(product: Product) {
    return Resource(
        omit(product, ['_id', 'image']),
        getProductUri(product._id!)
    )
        .link(shop('addToShoppingCart'), getShoppingCartItemsUri())
        .link(shop('image'), product.image);
}
