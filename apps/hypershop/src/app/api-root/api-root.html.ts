import { shop } from '../profile/namespaces';
import { getApiRootUri, getOrdersRootUri, getProductsRootUri, getShoppingCartRootUri, getUserProfileRootUri } from '../routing';

const activeNavItem = 'root';

export function renderHomepage() {
    return [
        'api-root/templates/homepage',
        {
            activeNavItem,
            links: {
                self: getApiRootUri(),
                searchCatalog: getProductsRootUri(),
                shoppingCart: getShoppingCartRootUri(),
                orders: getOrdersRootUri(),
                userProfile: getUserProfileRootUri()
            },
            shop
        }
    ];
}
