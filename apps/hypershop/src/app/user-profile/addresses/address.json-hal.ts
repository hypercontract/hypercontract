import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { shop } from '../../profile/namespaces';
import { getAddressRootUri, getAddressUri } from '../../routing';
import { Address } from './address.model';

export function toJsonHalAddresses(addresses: Address[]) {
    return Resource(
        {},
        getAddressRootUri()
    )
        .embed(
            shop('addresses'),
            map(addresses, toJsonHalAddress)
        );
}

export function toJsonHalAddress(address: Address) {
    return Resource(
        omit(address, ['_id']),
        getAddressUri(address._id!)
    );
}
