import { Inject, Injectable } from '@nestjs/common';
import { createStore, EntityId } from '../../store';
import { Address, NewAddress } from './address.model';

export const ADDRESS_STORE = 'ADDRESS_STORE';

@Injectable()
export class AddressService {

    constructor(
        @Inject(ADDRESS_STORE) private addressStore = createStore<Address>()
    ) { }

    public getAddress(id: EntityId) {
        return this.addressStore.getOne(id);
    }

    public getAllAddresses() {
        return this.addressStore.find();
    }

    public async addAddress(newAddress: NewAddress) {
        return this.addressStore.insert(newAddress);
    }

    public updateAddress(id: EntityId, address: Address) {
        return this.addressStore.update(id, address);
    }

    public removeAddress(id: EntityId) {
        return this.addressStore.remove(id);
    }
}
