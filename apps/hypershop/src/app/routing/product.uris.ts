import { isNull, isUndefined, trimEnd } from 'lodash';
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
    return getProductsBaseUri() + trimEnd(getProductsRootPath(), '/');
}

export function getCatalogSearchUri(queryString?: string) {
    const url = new URL(getProductsRootUri());

    if (!isUndefined(queryString)) {
        url.searchParams.append('queryString', queryString);
    }

    return url.toString();
}

export function getCatalogSearchUriTemplate() {
    return getProductsRootUri() + '{?queryString}';
}

export function getProductPath(id: EntityId | null = null) {
    const pathTemplate = getProductsRootPath() + ':productId';

    if (!isNull(id)) {
        return pathTemplate.replace(':productId', id);
    }

    return pathTemplate;
}

export function getProductUri(id: EntityId) {
    return getProductsBaseUri() + getProductPath(id);
}
