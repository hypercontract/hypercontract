import { map, omit } from 'lodash';
import { shop, shopify } from '../../profile/namespaces';
import { getAddressRootUri, getAddressUri } from '../../routing';
import { Address } from './address.model';
import { requireEntityId } from '../../store/entity.model';

export function toJsonLdAddresses(addresses: Address[]) {
    return {
        '@id': getAddressRootUri(),
        '@type': shop('Addresses'),
        [shop('addresses')]: map(addresses, toJsonLdAddress)
    };
}

export function toJsonLdAddress(address: Address) {
    return {
        '@id': getAddressUri(requireEntityId(address)),
        '@type': shop('Address'),
        ...shopify(omit(address, ['_id']))
    };
}
