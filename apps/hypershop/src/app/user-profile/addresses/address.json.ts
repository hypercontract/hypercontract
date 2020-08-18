import { getAddressUri } from '../../routing';
import { Address } from './address.model';

export function toJsonAddresses(addresses: Address[]) {
    return addresses.map(toJsonAddress);
}

export function toJsonAddress(address: Address) {
    return {
        ...address,
        _id: getAddressUri(address._id!)
    };
}
