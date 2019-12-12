import { isNull } from 'lodash';
import * as homepageUris from '../homepage/homepage.uris';
import { EntityId } from '../store/entity.model';

export function getBasePath() {
    return '/shoppingCart';
}

export function getBaseUri() {
    return homepageUris.getBaseUri() + getBasePath();
}

export function getRootPath() {
    return '/';
}

export function getRootUri() {
    return getBaseUri() + getRootPath();
}

export function getShoppingCartItemsPath() {
    return getRootPath() + 'items/';
}

export function getShoppingCartItemsUri() {
    return getBaseUri() + getShoppingCartItemsPath();
}

export function getShoppingCartItemPath(id: EntityId | null = null) {
    const pathTemplate = getShoppingCartItemsPath() + ':shoppingCartItemId/';

    if (!isNull(id)) {
        return pathTemplate.replace(':shoppingCartItemId', id);
    }

    return pathTemplate;
}

export function getShoppingCartItemUri(id: EntityId) {
    return getBaseUri() + getShoppingCartItemPath(id);
}
