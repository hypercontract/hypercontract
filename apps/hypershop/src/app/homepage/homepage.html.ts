import { globals } from '../layout/globals';
import * as orderUris from '../orders/order.uris';
import * as productUris from '../products/product.uris';
import * as shoppingCartUris from '../shopping-cart/shopping-cart.uris';
import * as userProfileUris from '../user-profile/user-profile.uris';

const activeNavItem = 'root';

export function homepage() {
    return [
        'homepage/templates/homepage',
        {
            activeNavItem,
            links: {
                searchCatalog: productUris.getRootUri(),
                shoppingCart: shoppingCartUris.getRootUri(),
                orders: orderUris.getRootUri(),
                userProfile: userProfileUris.getRootUri()
            },
            ...globals
        }
    ];
}
