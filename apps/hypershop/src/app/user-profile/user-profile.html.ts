import { globals } from '../formats/html/globals';
import { UserProfile } from './user-profile.model';

const activeNavItem = 'userProfile';

export function renderUserProfile(userProfile: UserProfile) {
    return [
        'user-profile/templates/user-profile',
        {
            activeNavItem,
            userProfile,
            ...globals
        }
    ];
}
