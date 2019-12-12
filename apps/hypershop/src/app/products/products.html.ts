import { globals } from '../layout/globals';
import { getProductUri, getShoppingCartItemsUri } from '../routing';
import { Product, SearchResults } from './product.model';

const activeNavItem = 'products';

export function renderSearchResults(searchResults: SearchResults) {
    return [
        'products/templates/search-results',
        {
            activeNavItem,
            searchResults,
            links: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                product: searchResults.products.map(product => getProductUri(product._id!)),
                addToShoppingCart: searchResults.products.map(() => getShoppingCartItemsUri())
            },
            ...globals
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
                addToShoppingCart: getShoppingCartItemsUri()
            },
            ...globals
        }
    ];
}
