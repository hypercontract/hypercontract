import * as homepageUris from '../homepage/homepage.uris';
import * as orderUris from '../orders/order.uris';
import * as productUris from '../products/product.uris';
import * as shoppingCartUris from '../shopping-cart/shopping-cart.uris';
import * as userProfileUris from '../user-profile/user-profile.uris';

export const globals = {
    navigation: {
        homepage: homepageUris.getRootUri(),
        catalog: productUris.getRootUri(),
        shoppingCart: shoppingCartUris.getRootUri(),
        orderHistory: orderUris.getRootUri(),
        userProfile: userProfileUris.getRootUri()
    }
};
