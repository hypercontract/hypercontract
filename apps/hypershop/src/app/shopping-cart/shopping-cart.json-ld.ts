import { map, omit } from 'lodash';
import { shop, shopify } from '../profile/namespaces';
import { getOrdersRootUri, getProductUri, getShoppingCartItemUri, getShoppingCartRootUri } from '../routing';
import { ShoppingCart, ShoppingCartItem } from './shopping-cart.model';

export function toJsonLdShoppingCart(shoppingCart: ShoppingCart) {
    const resource: any = {
        '@context': {
            items: {
                '@id': shop('items'),
                '@container': '@set'
            }
        },
        '@id': getShoppingCartRootUri(),
        '@type': shop('ShoppingCart'),
        ...shopify(omit(shoppingCart, ['items'])),
        [shop('items')]: map(shoppingCart.items, toJsonLdShoppingCartItem)
    };

    if (shoppingCart.items.length > 0) {
        resource[shop('placeOrder')] = getOrdersRootUri();
    }

    return resource;
}

export function toJsonLdShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
    return {
        '@id': getShoppingCartItemUri(shoppingCartItem._id!),
        '@type': shop('LineItem'),
        ...shopify(omit(shoppingCartItem, ['_id'])),
        [shop('product')]: getProductUri(shoppingCartItem.product),
        [shop('updateQuantity')]: getShoppingCartItemUri(shoppingCartItem._id!),
        [shop('remove')]: getShoppingCartItemUri(shoppingCartItem._id!)
    };
}


