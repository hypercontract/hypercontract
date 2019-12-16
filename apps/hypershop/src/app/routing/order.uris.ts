import { isNull, trimEnd } from 'lodash';
import { EntityId } from '../store';
import { getBaseUri } from './base.uri';

export function getOrdersBasePath() {
    return '/orders';
}

export function getOrdersBaseUri() {
    return getBaseUri() + getOrdersBasePath();
}

export function getOrdersRootPath() {
    return '/';
}

export function getOrdersRootUri() {
    return getOrdersBaseUri() + trimEnd(getOrdersRootPath(), '/');
}

export function getOrderPath(id: EntityId | null = null) {
    const pathTemplate = getOrdersRootPath() + ':orderId';

    if (!isNull(id)) {
        return pathTemplate.replace(':orderId', id!);
    }

    return pathTemplate;
}

export function getOrderUri(id: EntityId) {
    return getOrdersBaseUri() + getOrderPath(id);
}
