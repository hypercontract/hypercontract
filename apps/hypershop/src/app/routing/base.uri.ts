import { trimEnd } from 'lodash';
import { environment } from '../../environments/environment';

export function getBaseUri() {
    return trimEnd(environment.baseUri, '/');
}
