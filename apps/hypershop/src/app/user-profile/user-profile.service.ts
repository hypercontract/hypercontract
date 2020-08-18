import { Injectable } from '@nestjs/common';
import { EntityId } from '../store';
import { AddressService } from './addresses/address.service';
import { PaymentOptionService } from './payment-options/payment-option.service';

@Injectable()
export class UserProfileService {

    constructor(
        private addressService: AddressService,
        private paymentOptionService: PaymentOptionService
    ) { }

    public async getUserProfile() {
        const [paymentOptions, addresses] = await Promise.all([
            this.paymentOptionService.getAllPaymentOptions(),
            this.addressService.getAllAddresses(),
        ])

        return {
            paymentOptions,
            addresses
        };
    }

    public getAddress(id: EntityId) {
        return this.addressService.getAddress(id);
    }

    public getPaymentOption(id: EntityId) {
        return this.paymentOptionService.getPaymentOption(id);
    }
}
