import { getBaseUri } from './base.uri';

export function getApiRootBaseUri() {
    return getBaseUri();
}

export function getApiRootPath() {
    return '/';
}

export function getApiRootUri() {
    return getApiRootBaseUri() + getApiRootPath();
}
