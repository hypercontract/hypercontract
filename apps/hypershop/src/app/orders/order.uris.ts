import { isNull } from 'lodash';
import * as homepageUris from '../homepage/homepage.uris';
import { EntityId } from '../store/entity.model';

export function getBasePath() {
    return '/orders';
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

export function getOrderPath(id: EntityId | null = null) {
    const pathTemplate = getRootPath() + ':orderId/';

    if (!isNull(id)) {
        return pathTemplate.replace(':orderId', id!);
    }

    return pathTemplate;
}

export function getOrderUri(id: EntityId) {
    return getBaseUri() + getOrderPath(id);
}
