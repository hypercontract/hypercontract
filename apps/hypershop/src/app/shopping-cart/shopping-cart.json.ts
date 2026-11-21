import { getProductUri, getShoppingCartItemUri } from '../routing';
import { ShoppingCart, ShoppingCartItem } from './shopping-cart.model';
import { requireEntityId } from '../store/entity.model';

export function toJsonShoppingCart(shoppingCart: ShoppingCart) {
    return {
        ...shoppingCart,
        items: shoppingCart.items.map(toJsonShoppingCartItem)
    };
}

export function toJsonShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
    return {
        ...shoppingCartItem,
        _id: getShoppingCartItemUri(requireEntityId(shoppingCartItem)),
        product: getProductUri(shoppingCartItem.product)
    };
}


