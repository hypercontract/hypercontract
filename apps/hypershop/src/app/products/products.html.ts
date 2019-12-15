import { shop } from '../profile/namespaces';
import { getCatalogSearchUri, getProductUri, getShoppingCartItemsUri } from '../routing';
import { Product, SearchResults } from './product.model';

const activeNavItem = 'products';

export function renderSearchResults(searchResults: SearchResults, queryString: string) {
    return [
        'products/templates/search-results',
        {
            activeNavItem,
            searchResults,
            links: {
                self: getCatalogSearchUri(queryString),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                product: searchResults.products.map(product => getProductUri(product._id!)),
                addToShoppingCart: searchResults.products.map(() => getShoppingCartItemsUri())
            },
            shop
        }
    ];
}

export function renderProduct(product: Product) {
    return [
        'products/templates/product',
        {
            activeNavItem,
            product,
            links: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                self: getProductUri(product._id!),
                addToShoppingCart: getShoppingCartItemsUri()
            },
            shop
        }
    ];
}
