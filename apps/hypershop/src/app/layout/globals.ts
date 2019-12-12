import { getApiRootUri, getOrdersRootUri, getProductsRootUri, getShoppingCartRootUri, getUserProfileRootUri } from '../routing';

export const globals = {
    navigation: {
        homepage: getApiRootUri(),
        catalog: getProductsRootUri(),
        shoppingCart: getShoppingCartRootUri(),
        orderHistory: getOrdersRootUri(),
        userProfile: getUserProfileRootUri()
    }
};
