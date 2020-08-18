import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { shop } from '../profile/namespaces';
import { getUserProfileRootUri } from '../routing';
import { toJsonHalAddress } from './addresses/address.json-hal';
import { toJsonHalPaymentOption } from './payment-options/payment-option.json-hal';
import { UserProfile } from './user-profile.model';

export function toJsonHalUserProfile(userProfile: UserProfile) {
    return Resource(
        omit(userProfile, ['addresses', 'paymentOptions']),
        getUserProfileRootUri()
    )
        .embed(
            shop('addresses'),
            map(userProfile.addresses, toJsonHalAddress)
        )
        .embed(
            shop('paymentOptions'),
            map(userProfile.paymentOptions, toJsonHalPaymentOption)
        );
}
