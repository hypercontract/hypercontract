import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { shop } from '../profile/namespaces';
import { getAddressUri, getPaymentOptionUri, getUserProfileRootUri } from '../routing';
import { Address, PaymentOption, UserProfile } from './user-profile.model';

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

export function toJsonHalAddress(address: Address) {
    return Resource(
        omit(address, ['_id']),
        getAddressUri(address._id!)
    );
}

export function toJsonHalPaymentOption(paymentOption: PaymentOption) {
    return Resource(
        omit(paymentOption, ['_id']),
        getPaymentOptionUri(paymentOption._id!)
    );
}
