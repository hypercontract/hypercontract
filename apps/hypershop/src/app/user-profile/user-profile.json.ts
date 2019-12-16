import { getAddressUri, getPaymentOptionUri } from '../routing';
import { Address, PaymentOption, UserProfile } from './user-profile.model';

export function toJsonUserProfile(userProfile: UserProfile) {
    return {
        ...userProfile,
        addresses: userProfile.addresses.map(toJsonAddress),
        paymentOptions: userProfile.paymentOptions.map(toJsonPaymentOption)
    };
}

export function toJsonAddress(address: Address) {
    return {
        ...address,
        _id: getAddressUri(address._id!)
    };
}

export function toJsonPaymentOption(paymentOption: PaymentOption) {
    return {
        ...paymentOption,
        _id: getPaymentOptionUri(paymentOption._id!)
    };
}
