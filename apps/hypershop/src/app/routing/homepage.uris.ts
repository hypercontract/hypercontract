import { getBaseUri } from './base.uri';

export function getHomepageBaseUri() {
    return getBaseUri();
}

export function getHomepageRootPath() {
    return '/';
}

export function getHomepageRootUri() {
    return getHomepageBaseUri() + getHomepageRootPath();
}
