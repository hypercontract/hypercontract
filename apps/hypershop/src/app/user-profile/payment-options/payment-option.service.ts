import { Inject, Injectable } from '@nestjs/common';
import { createStore, EntityId } from '../../store';
import { PaymentOption } from './payment-option.model';

export const PAYMENT_OPTION_STORE = 'PAYMENT_OPTION_STORE';

@Injectable()
export class PaymentOptionService {

    constructor(
        @Inject(PAYMENT_OPTION_STORE) private paymentOptionStore = createStore<PaymentOption>()
    ) { }

    public getPaymentOption(id: EntityId) {
        return this.paymentOptionStore.getOne(id);
    }

    public getAllPaymentOptions() {
        return this.paymentOptionStore.find();
    }

    public addPaymentOption(address: PaymentOption) {
        return this.paymentOptionStore.insert(address);
    }

    public updatePaymentOption(id: EntityId, paymentOption: PaymentOption) {
        return this.paymentOptionStore.update(id, paymentOption);
    }

    public removePaymentOption(id: EntityId) {
        return this.paymentOptionStore.remove(id);
    }
}
