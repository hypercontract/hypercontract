import { map, omit } from 'lodash';
import { shop, shopify } from '../profile/namespaces';
import { getAddressUri, getPaymentOptionUri, getUserProfileRootUri } from '../routing';
import { Address, PaymentOption, UserProfile } from './user-profile.model';

export function toJsonLdUserProfile(userProfile: UserProfile) {
    return {
        '@context': {
            addresses: {
                '@id': shop('addresses'),
                '@container': '@set'
            },
            paymentOptions: {
                '@id': shop('paymentOptions'),
                '@container': '@set'
            }
        },
        '@id': getUserProfileRootUri(),
        '@type': shop('UserProfile'),
        ...shopify(omit(userProfile, ['addresses', 'paymentOptions'])),
        [shop('addresses')]: map(userProfile.addresses, toJsonLdAddress),
        [shop('paymentOptions')]: map(userProfile.paymentOptions, toJsonLdPaymentOption)
    };
}

export function toJsonLdAddress(address: Address) {
    return {
        '@id': getAddressUri(address._id!),
        '@type': shop('Address'),
        ...shopify(omit(address, ['_id']))
    };
}

export function toJsonLdPaymentOption(paymentOption: PaymentOption) {
    return {
        '@id': getPaymentOptionUri(paymentOption._id!),
        '@type': shop('PaymentOption'),
        ...shopify(omit(paymentOption, ['_id']))
    };
}
