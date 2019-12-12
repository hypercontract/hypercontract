import { isNull, isUndefined } from 'lodash';
import { URL } from 'url';
import { EntityId } from '../store';
import { getBaseUri } from './base.uri';

export function getProductsBasePath() {
    return '/products';
}

export function getProductsBaseUri() {
    return getBaseUri() + getProductsBasePath();
}

export function getProductsRootPath() {
    return '/';
}

export function getProductsRootUri() {
    return getProductsBaseUri() + getProductsRootPath();
}

export function getCatalogSearchUri(query?: string) {
    const url = new URL(getProductsRootUri());

    if (!isUndefined(query)) {
        url.searchParams.append('query', query);
    }

    return url.toString();
}

export function getCatalogSearchUriTemplate() {
    return getProductsRootUri() + '{?query}';
}

export function getProductPath(id: EntityId | null = null) {
    const pathTemplate = getProductsRootPath() + ':productId/';

    if (!isNull(id)) {
        return pathTemplate.replace(':productId', id);
    }

    return pathTemplate;
}

export function getProductUri(id: EntityId) {
    return getProductsBaseUri() + getProductPath(id);
}
