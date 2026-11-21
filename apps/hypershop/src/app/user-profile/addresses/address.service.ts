import { EntityId, Store } from '../../store';
import { Address, NewAddress } from './address.model';

export class AddressService {

    constructor(
        private addressStore: Store<Address>
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
