import { map, omit } from 'lodash';
import { shop, shopify } from '../profile/namespaces';
import { getOrdersRootUri, getProductUri, getShoppingCartItemUri, getShoppingCartRootUri } from '../routing';
import { ShoppingCart, ShoppingCartItem } from './shopping-cart.model';
import { requireEntityId } from '../store/entity.model';

export function toJsonLdShoppingCart(shoppingCart: ShoppingCart) {
    const resource: any = {
        '@id': getShoppingCartRootUri(),
        '@type': shop('ShoppingCart'),
        ...shopify(omit(shoppingCart, ['items'])),
        [shop('items')]: map(shoppingCart.items, toJsonLdShoppingCartItem)
    };

    if (shoppingCart.items.length > 0) {
        resource[shop('placeOrder')] = { '@id': getOrdersRootUri() };
    }

    return resource;
}

export function toJsonLdShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
    return {
        '@id': getShoppingCartItemUri(requireEntityId(shoppingCartItem)),
        '@type': shop('ShoppingCartItem'),
        ...shopify(omit(shoppingCartItem, ['_id'])),
        [shop('product')]: { '@id': getProductUri(shoppingCartItem.product) },
        [shop('changeQuantity')]: { '@id': getShoppingCartItemUri(requireEntityId(shoppingCartItem)) },
        [shop('remove')]: { '@id': getShoppingCartItemUri(requireEntityId(shoppingCartItem)) }
    };
}


