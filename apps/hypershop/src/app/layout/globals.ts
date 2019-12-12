import { getHomepageRootUri, getOrdersRootUri, getProductsRootUri, getShoppingCartRootUri, getUserProfileRootUri } from '../routing';

export const globals = {
    navigation: {
        homepage: getHomepageRootUri(),
        catalog: getProductsRootUri(),
        shoppingCart: getShoppingCartRootUri(),
        orderHistory: getOrdersRootUri(),
        userProfile: getUserProfileRootUri()
    }
};
