import { createNamespaceFn, prefixes as hyperPrefixes, Prefixes } from '@hypercontract/profile';
import deepMapKeys from 'deep-map-keys';
import { getBaseUri } from '../routing/base.uri';

export const prefixes: Prefixes = {
    ...hyperPrefixes,
    shop: `${getBaseUri()}/profile/`,
};

export const shop = createNamespaceFn(prefixes.shop);

export const shopify = (object: {}): object => deepMapKeys(
    object,
    key => shop(key)
);
