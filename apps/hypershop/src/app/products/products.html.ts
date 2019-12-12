import { globals } from '../layout/globals';
import { getProductUri, getShoppingCartItemsUri } from '../routing';
import { Product } from './product.model';

const activeNavItem = 'products';

export function renderSearchResults(products: Product[]) {
    return [
        'products/templates/search-results',
        {
            activeNavItem,
            products,
            links: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                product: products.map(product => getProductUri(product._id!)),
                addToShoppingCart: products.map(() => getShoppingCartItemsUri())
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
