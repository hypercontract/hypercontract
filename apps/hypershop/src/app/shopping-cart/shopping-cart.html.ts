import { shop } from '../profile/namespaces';
import { getAddressUri, getOrdersRootUri, getPaymentOptionUri, getProductUri, getShoppingCartItemUri, getShoppingCartRootUri } from '../routing';
import { UserProfile } from '../user-profile';
import { ShoppingCart } from './shopping-cart.model';

const activeNavItem = 'shoppingCart';

export function renderShoppingCart(shoppingCart: ShoppingCart, userProfile: UserProfile) {
    const links: { [key: string]: string | string[] } = {
        self: getShoppingCartRootUri(),
        product: shoppingCart.items.map(
            shoppingCartItem => getProductUri(shoppingCartItem.product)
        ),
        shoppingCartItem: shoppingCart.items.map(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            shoppingCartItem => getShoppingCartItemUri(shoppingCartItem._id!)
        ),
        remove: shoppingCart.items.map(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            shoppingCartItem => getShoppingCartItemUri(shoppingCartItem._id!)
        ),
        changeQuantity: shoppingCart.items.map(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            shoppingCartItem => getShoppingCartItemUri(shoppingCartItem._id!)
        ),
        addresses: userProfile.addresses.map(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            address => getAddressUri(address._id!)
        ),
        paymentOptions: userProfile.paymentOptions.map(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            paymentOption => getPaymentOptionUri(paymentOption._id!)
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
            shop
        }
    ];
}
