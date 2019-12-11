import { createNamespaceFn, prefixes as hyperPrefixes, Prefixes } from '@hypercontract/profile';
import { environment } from '../environments/environment';

export const prefixes: Prefixes = {
    ...hyperPrefixes,
    shop: `${environment.baseUri}profile/`,
};

export const shop = createNamespaceFn(prefixes.shop);
