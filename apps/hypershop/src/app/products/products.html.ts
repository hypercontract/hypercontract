import { globals } from '../layout/globals';
import { getProductUri, getShoppingCartItemsUri } from '../routing';
import { Product } from './product.model';

const activeNavItem = 'products';

export function fromProducts(products: Product[]) {
    return [
        'products/templates/products',
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

export function fromProduct(product: Product) {
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
