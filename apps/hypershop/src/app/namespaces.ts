import { createNamespaceFn, prefixes as hyperPrefixes } from '@hypercontract/profile';
import { environment } from '../environments/environment';

export const prefixes = {
    ...hyperPrefixes,
    shop: `${environment.baseUri}profile/`,
};

export const shop = createNamespaceFn(prefixes.shop);
