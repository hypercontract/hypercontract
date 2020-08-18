import { isNull, trimEnd } from 'lodash';
import { EntityId } from '../store';
import { getBaseUri } from './base.uri';

export function getUserProfileBasePath() {
    return '/userProfile';
}

function getUserProfileBaseUri() {
    return getBaseUri() + getUserProfileBasePath();
}

export function getUserProfileRootPath() {
    return '/';
}

export function getUserProfileRootUri() {
    return getUserProfileBaseUri() + trimEnd(getUserProfileRootPath(), '/');
}

export function getAddressBasePath() {
    return getUserProfileBasePath() + '/addresses';
}

function getAddressBaseUri() {
    return getBaseUri() + getAddressBasePath();
}

export function getAddressRootPath() {
    return '/';
}

export function getAddressRootUri() {
    return getAddressBaseUri() + trimEnd(getAddressRootPath(), '/');
}

export function getAddressPath(id: EntityId | null = null) {
    const pathTemplate = getAddressRootPath() + ':addressId';

    if (!isNull(id)) {
        return pathTemplate.replace(':addressId', id);
    }

    return pathTemplate;
}

export function getAddressUri(id: EntityId) {
    return getAddressBaseUri() + getAddressPath(id);
}

export function getPaymentOptionBasePath() {
    return getUserProfileBasePath() + '/paymentOptions';
}

function getPaymentOptionBaseUri() {
    return getBaseUri() + getPaymentOptionBasePath();
}

export function getPaymentOptionRootPath() {
    return '/';
}

export function getPaymentOptionRootUri() {
    return getPaymentOptionBaseUri() + trimEnd(getPaymentOptionRootPath(), '/');
}

export function getPaymentOptionPath(id: EntityId | null = null) {
    const pathTemplate = getPaymentOptionRootPath() + ':paymentOptionId';

    if (!isNull(id)) {
        return pathTemplate.replace(':paymentOptionId', id);
    }

    return pathTemplate;
}

export function getPaymentOptionUri(id: EntityId | null) {
    return getPaymentOptionRootUri() + getPaymentOptionPath(id);
}
