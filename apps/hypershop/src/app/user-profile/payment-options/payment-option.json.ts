import { getPaymentOptionUri } from '../../routing';
import { PaymentOption } from './payment-option.model';
import { requireEntityId } from '../../store/entity.model';

export function toJsonPaymentOptions(paymentOptions: PaymentOption[]) {
    return paymentOptions.map(toJsonPaymentOption);
}

export function toJsonPaymentOption(paymentOption: PaymentOption) {
    return {
        ...paymentOption,
        _id: getPaymentOptionUri(requireEntityId(paymentOption))
    };
}
