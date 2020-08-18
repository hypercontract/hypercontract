import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { shop } from '../../profile/namespaces';
import { getPaymentOptionRootUri, getPaymentOptionUri } from '../../routing';
import { PaymentOption } from './payment-option.model';

export function toJsonHalPaymentOptions(paymentOptions: PaymentOption[]) {
    return Resource(
        {},
        getPaymentOptionRootUri()
    )
        .embed(
            shop('paymentOptions'),
            map(paymentOptions, toJsonHalPaymentOption)
        );
}

export function toJsonHalPaymentOption(paymentOption: PaymentOption) {
    return Resource(
        omit(paymentOption, ['_id']),
        getPaymentOptionUri(paymentOption._id!)
    );
}
