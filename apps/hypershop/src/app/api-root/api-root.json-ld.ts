import { shop } from '../profile/namespaces';
import { getApiRootUri, getCatalogSearchUri, getOrdersRootUri, getShoppingCartRootUri, getUserProfileRootUri } from '../routing';

export function toJsonLdApiRoot() {
    return {
        '@id': getApiRootUri(),
        '@type': shop('ApiRoot'),
        [shop('searchCatalog')]: getCatalogSearchUri(),
        [shop('shoppingCart')]: getShoppingCartRootUri(),
        [shop('orderHistory')]: getOrdersRootUri(),
        [shop('userProfile')]: getUserProfileRootUri()
    };
}
