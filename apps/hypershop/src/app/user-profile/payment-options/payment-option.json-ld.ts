import { map, omit } from 'lodash';
import { shop, shopify } from '../../profile/namespaces';
import { getPaymentOptionRootUri, getPaymentOptionUri } from '../../routing';
import { PaymentOption } from './payment-option.model';

export function toJsonLdPaymentOptions(paymentOptions: PaymentOption[]) {
    return {
        '@id': getPaymentOptionRootUri(),
        '@type': shop('PaymentOptions'),
        [shop('paymentOptions')]: map(paymentOptions, toJsonLdPaymentOption)
    };
}

export function toJsonLdPaymentOption(paymentOption: PaymentOption) {
    return {
        '@id': getPaymentOptionUri(paymentOption._id!),
        '@type': shop('PaymentOption'),
        ...shopify(omit(paymentOption, ['_id']))
    };
}
