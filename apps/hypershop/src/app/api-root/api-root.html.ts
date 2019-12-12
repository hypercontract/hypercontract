import { getOrdersRootUri, getProductsRootUri, getShoppingCartRootUri, getUserProfileRootUri } from '../routing';

const activeNavItem = 'root';

export function renderHomepage() {
    return [
        'api-root/templates/homepage',
        {
            activeNavItem,
            links: {
                searchCatalog: getProductsRootUri(),
                shoppingCart: getShoppingCartRootUri(),
                orders: getOrdersRootUri(),
                userProfile: getUserProfileRootUri()
            }
        }
    ];
}
