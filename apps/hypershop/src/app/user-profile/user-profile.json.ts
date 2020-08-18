import { toJsonAddress } from './addresses/address.json';
import { toJsonPaymentOption } from './payment-options/payment-option.json';
import { UserProfile } from './user-profile.model';

export function toJsonUserProfile(userProfile: UserProfile) {
    return {
        ...userProfile,
        addresses: userProfile.addresses.map(toJsonAddress),
        paymentOptions: userProfile.paymentOptions.map(toJsonPaymentOption)
    };
}
