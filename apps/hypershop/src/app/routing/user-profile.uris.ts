import { isNull } from 'lodash';
import { EntityId } from '../store';
import { getBaseUri } from './base.uri';

export function getUserProfileBasePath() {
    return '/userProfile';
}

export function getUserProfileBaseUri() {
    return getBaseUri() + getUserProfileBasePath();
}

export function getUserProfileRootPath() {
    return '/';
}

export function getUserProfileRootUri() {
    return getUserProfileBaseUri() + getUserProfileRootPath();
}

export function getAddressPath(id: EntityId | null = null) {
    const pathTemplate = getUserProfileRootPath() + 'addresses/:addressId/';

    if (!isNull(id)) {
        return pathTemplate.replace(':addressId', id);
    }

    return pathTemplate;
}

export function getAddressUri(id: EntityId) {
    return getUserProfileBaseUri() + getAddressPath(id);
}

export function getPaymentOptionPath(id: EntityId | null) {
    const pathTemplate = getUserProfileRootPath() + 'paymentOptions/:paymentOptionId';

    if (!isNull(id)) {
        return pathTemplate.replace(':paymentOptionId', id);
    }

    return pathTemplate;
}

export function getPaymentOptionUri(id: EntityId | null) {
    return getUserProfileBaseUri() + getPaymentOptionPath(id);
}
