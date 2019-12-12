import { createNamespaceFn, prefixes as hyperPrefixes, Prefixes } from '@hypercontract/profile';
import * as homepageUris from '../homepage/homepage.uris';

export const prefixes: Prefixes = {
    ...hyperPrefixes,
    shop: `${homepageUris.getBaseUri()}profile/`,
};

export const shop = createNamespaceFn(prefixes.shop);
