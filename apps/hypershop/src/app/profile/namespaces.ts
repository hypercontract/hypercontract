import { createNamespaceFn, prefixes as hyperPrefixes, Prefixes } from '@hypercontract/profile';
import { getBaseUri } from '../routing/base.uri';

export const prefixes: Prefixes = {
    ...hyperPrefixes,
    shop: `${getBaseUri()}/profile/`,
};

export const shop = createNamespaceFn(prefixes.shop);
