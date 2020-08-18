import { map, omit } from 'lodash';
import { shop, shopify } from '../profile/namespaces';
import { getUserProfileRootUri } from '../routing';
import { toJsonLdAddress } from './addresses/address.json-ld';
import { toJsonLdPaymentOption } from './payment-options/payment-option.json-ld';
import { UserProfile } from './user-profile.model';

export function toJsonLdUserProfile(userProfile: UserProfile) {
    return {
        '@id': getUserProfileRootUri(),
        '@type': shop('UserProfile'),
        ...shopify(omit(userProfile, ['addresses', 'paymentOptions'])),
        [shop('addresses')]: map(userProfile.addresses, toJsonLdAddress),
        [shop('paymentOptions')]: map(userProfile.paymentOptions, toJsonLdPaymentOption)
    };
}
