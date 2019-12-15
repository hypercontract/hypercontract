import { shop } from '../profile/namespaces';
import { getAddressUri, getPaymentOptionUri, getUserProfileRootUri } from '../routing';
import { UserProfile } from './user-profile.model';

const activeNavItem = 'userProfile';

export function renderUserProfile(userProfile: UserProfile) {
    return [
        'user-profile/templates/user-profile',
        {
            activeNavItem,
            userProfile,
            links: {
                self: getUserProfileRootUri(),
                addresses: userProfile.addresses.map(
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    address => getAddressUri(address._id!)
                ),
                paymentOptions: userProfile.paymentOptions.map(
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    paymentOption => getPaymentOptionUri(paymentOption._id!)
                )
            },
            shop
        }
    ];
}
