import { globals } from '../layout/globals';
import * as shoppingCartUris from '../shopping-cart/shopping-cart.uris';
import { Product } from './product.model';
import { getProductUri } from './product.uris';

const activeNavItem = 'products';

export function fromProducts(products: Product[]) {
    return [
        'products/templates/products',
        {
            activeNavItem,
            products,
            links: {
                product: products.map(product => getProductUri(product._id!)),
                addToShoppingCart: products.map(() => shoppingCartUris.getShoppingCartItemsUri())
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
                addToShoppingCart: shoppingCartUris.getShoppingCartItemsUri()
            },
            ...globals
        }
    ];
}
