import { getProductUri, getShoppingCartItemUri } from '../routing';
import { ShoppingCart, ShoppingCartItem } from './shopping-cart.model';

export function toJsonShoppingCart(shoppingCart: ShoppingCart) {
    return {
        ...shoppingCart,
        items: shoppingCart.items.map(toJsonShoppingCartItem)
    };
}

export function toJsonShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
    return {
        ...shoppingCartItem,
        _id: getShoppingCartItemUri(shoppingCartItem._id!),
        product: getProductUri(shoppingCartItem.product)
    };
}


