import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../formats/handler';
import { MediaType } from '../formats/media-type';
import { getUserProfileBasePath, getUserProfileRootPath } from '../routing';
import { renderUserProfile } from './user-profile.html';
import { toJsonUserProfile } from './user-profile.json';
import { toJsonHalUserProfile } from './user-profile.json-hal';
import { toJsonLdUserProfile } from './user-profile.json-ld';
import { UserProfileService } from './user-profile.service';

@Controller(getUserProfileBasePath())
export class UserProfileController {

    constructor(
        private userProfileService: UserProfileService
    ) {}

    @Get(getUserProfileRootPath())
    async getUserProfile(
        @Res() response: Response
    ) {
        const userProfile = await this.userProfileService.getUserProfile();

        return sendResponse(response, {
            json: toJsonUserProfile(userProfile),
            html: renderUserProfile(userProfile),
            [MediaType.JsonHal]: toJsonHalUserProfile(userProfile),
            [MediaType.JsonLd]: toJsonLdUserProfile(userProfile)
        })
    }
}
