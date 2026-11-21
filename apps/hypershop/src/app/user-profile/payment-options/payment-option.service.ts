import { EntityId, Store } from '../../store';
import { PaymentOption } from './payment-option.model';

export class PaymentOptionService {

    constructor(
        private paymentOptionStore: Store<PaymentOption>
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
