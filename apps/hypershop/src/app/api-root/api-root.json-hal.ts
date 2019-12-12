import { Resource } from 'hal';
import { shop } from '../profile/namespaces';
import { getApiRootUri, getCatalogSearchUriTemplate, getOrdersRootUri, getShoppingCartRootUri, getUserProfileRootUri } from '../routing';

export function toJsonHalApiRoot() {
    return Resource({}, getApiRootUri())
        .link(shop('searchCatalog'), {
            href: getCatalogSearchUriTemplate(),
            templated: true
        })
        .link(shop('shoppingCart'), getShoppingCartRootUri())
        .link(shop('orderHistory'), getOrdersRootUri())
        .link(shop('userProfile'), getUserProfileRootUri());
}
