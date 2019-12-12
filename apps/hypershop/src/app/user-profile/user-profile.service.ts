import { Inject, Injectable } from '@nestjs/common';
import { createStore, EntityId } from '../store';
import { Address, PaymentOption } from './user-profile.model';

export const ADDRESSES = 'ADDRESSES';
export const ADDRESS_STORE = 'ADDRESS_STORE';
export const PAYMENT_OPTIONS = 'PAYMENT_OPTIONS';
export const PAYMENT_OPTION_STORE = 'PAYMENT_OPTION_STORE';

@Injectable()
export class UserProfileService {

    constructor(
        @Inject(ADDRESS_STORE) private addressStore = createStore<Address>(),
        @Inject(PAYMENT_OPTION_STORE) private paymentOptionStore = createStore<PaymentOption>()
    ) {}

    public async getUserProfile() {
        const [paymentOptions, addresses] = await Promise.all([
            this.paymentOptionStore.find(),
            this.addressStore.find()
        ])

        return {
            paymentOptions,
            addresses
        };
    }

    public getAddress(id: EntityId) {
        return this.addressStore.getOne(id);
    }

    public getPaymentOption(id: EntityId) {
        return this.paymentOptionStore.getOne(id);
    }
}
