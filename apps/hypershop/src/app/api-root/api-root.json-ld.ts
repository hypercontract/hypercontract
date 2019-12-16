import { shop } from '../profile/namespaces';
import { getApiRootUri, getCatalogSearchUri, getOrdersRootUri, getShoppingCartRootUri, getUserProfileRootUri } from '../routing';

export function toJsonLdApiRoot() {
    return {
        '@id': getApiRootUri(),
        '@type': shop('ApiRoot'),
        [shop('searchCatalog')]: { '@id':getCatalogSearchUri() },
        [shop('shoppingCart')]: { '@id':getShoppingCartRootUri() },
        [shop('orderHistory')]: { '@id':getOrdersRootUri() },
        [shop('userProfile')]: { '@id':getUserProfileRootUri() }
    };
}
