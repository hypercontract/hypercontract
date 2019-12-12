import { globals } from '../layout/globals';
import { getOrdersRootUri, getProductsRootUri, getShoppingCartRootUri, getUserProfileRootUri } from '../routing';

const activeNavItem = 'root';

export function renderHomepage() {
    return [
        'homepage/templates/homepage',
        {
            activeNavItem,
            links: {
                searchCatalog: getProductsRootUri(),
                shoppingCart: getShoppingCartRootUri(),
                orders: getOrdersRootUri(),
                userProfile: getUserProfileRootUri()
            },
            ...globals
        }
    ];
}
