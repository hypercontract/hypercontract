import { globals } from '../layout/globals';
import { getOrdersRootUri, getProductUri, getShoppingCartItemUri } from '../routing';
import { UserProfile } from '../user-profile';
import { ShoppingCart } from './shopping-cart.model';

const activeNavItem = 'shoppingCart';

export function fromShoppingCart(shoppingCart: ShoppingCart, userProfile: UserProfile) {
    const links: { [key: string]: string | string[] } = {
        product: shoppingCart.items.map(
            shoppingCartItem => getProductUri(shoppingCartItem.product)
        ),
        remove: shoppingCart.items.map(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            shoppingCartItem => getShoppingCartItemUri(shoppingCartItem._id!)
            ),
            updateQuantity: shoppingCart.items.map(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            shoppingCartItem => getShoppingCartItemUri(shoppingCartItem._id!)
        )
    };

    if (shoppingCart.items.length > 0) {
        links.placeOrder = getOrdersRootUri();
    }

    return [
        'shopping-cart/templates/shopping-cart',
        {
            activeNavItem,
            shoppingCart,
            userProfile,
            links,
            ...globals
        }
    ];
}