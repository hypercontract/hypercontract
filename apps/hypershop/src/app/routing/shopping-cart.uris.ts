import { isNull, trimEnd } from 'lodash';
import { EntityId } from '../store';
import { getBaseUri } from './base.uri';

export function getShoppingCartBasePath() {
    return '/shoppingCart';
}

export function getShoppingCartBaseUri() {
    return getBaseUri() + getShoppingCartBasePath();
}

export function getShoppingCartRootPath() {
    return '/';
}

export function getShoppingCartRootUri() {
    return getShoppingCartBaseUri() + trimEnd(getShoppingCartRootPath(), '/');
}

export function getShoppingCartItemsPath() {
    return getShoppingCartRootPath() + 'items';
}

export function getShoppingCartItemsUri() {
    return getShoppingCartBaseUri() + getShoppingCartItemsPath();
}

export function getShoppingCartItemPath(id: EntityId | null = null) {
    const pathTemplate = getShoppingCartItemsPath() + '/:shoppingCartItemId';

    if (!isNull(id)) {
        return pathTemplate.replace(':shoppingCartItemId', id);
    }

    return pathTemplate;
}

export function getShoppingCartItemUri(id: EntityId) {
    return getShoppingCartBaseUri() + getShoppingCartItemPath(id);
}
