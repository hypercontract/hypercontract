import { asyncHandler } from '@hypercontract/express';
import { Router } from 'express';
import { sendResponse } from '../formats/handler';
import { MediaType } from '../formats/media-type';
import { getUserProfileRootPath } from '../routing';
import { renderUserProfile } from './user-profile.html';
import { toJsonUserProfile } from './user-profile.json';
import { toJsonHalUserProfile } from './user-profile.json-hal';
import { toJsonLdUserProfile } from './user-profile.json-ld';
import { UserProfileService } from './user-profile.service';

export function createUserProfileRouter(userProfileService: UserProfileService): Router {
    const router = Router();

    router.get(getUserProfileRootPath(), asyncHandler(async (_request, response) => {
        const userProfile = await userProfileService.getUserProfile();

        return sendResponse(response, {
            json: toJsonUserProfile(userProfile),
            html: renderUserProfile(userProfile),
            [MediaType.JsonHal]: toJsonHalUserProfile(userProfile),
            [MediaType.JsonLd]: toJsonLdUserProfile(userProfile)
        });
    }));

    return router;
}
