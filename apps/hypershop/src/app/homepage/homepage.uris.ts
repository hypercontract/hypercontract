import { trimEnd } from 'lodash';
import { environment } from '../../environments/environment';

export function getBaseUri() {
    return trimEnd(environment.baseUri, '/');
}

export function getRootPath() {
    return '/';
}

export function getRootUri() {
    return getBaseUri() + getRootPath();
}
