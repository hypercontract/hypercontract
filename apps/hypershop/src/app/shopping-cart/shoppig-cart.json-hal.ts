import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { shop } from '../profile/namespaces';
import { getOrdersRootUri, getProductUri, getShoppingCartItemUri, getShoppingCartRootUri } from '../routing';
import { ShoppingCart, ShoppingCartItem } from './shopping-cart.model';

export function toJsonHalShoppingCart(shoppingCart: ShoppingCart) {
    const resource = Resource(
        omit(shoppingCart, ['items']),
        getShoppingCartRootUri()
    )
        .embed(
            shop('items'),
            map(shoppingCart.items, toJsonHalShoppingCartItem)
        );

    if (shoppingCart.items.length > 0) {
        resource.link(shop('placeOrder'), getOrdersRootUri());
    }

    return resource;
}

export function toJsonHalShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
    return Resource(
        omit(shoppingCartItem, ['_id', 'product']),
        getShoppingCartItemUri(shoppingCartItem._id!)
    )
        .link(shop('product'), getProductUri(shoppingCartItem.product))
        .link(shop('changeQuantity'), getShoppingCartItemUri(shoppingCartItem._id!))
        .link(shop('remove'), getShoppingCartItemUri(shoppingCartItem._id!));
}
