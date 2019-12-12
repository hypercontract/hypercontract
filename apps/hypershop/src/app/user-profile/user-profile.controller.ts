import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../content-negotiation';
import { getUserProfileBasePath, getUserProfileRootPath } from '../routing';
import { fromUserProfile } from './user-profile.html';
import { UserProfileService } from './user-profile.service';

@Controller(getUserProfileBasePath())
export class UserProfileController {

    constructor(
        private userProfileService: UserProfileService
    ) {}

    @Get(getUserProfileRootPath())
    async get(
        @Res() response: Response
    ) {
        const userProfile = await this.userProfileService.getUserProfile();

        return sendResponse(response, {
            json: userProfile,
            html: fromUserProfile(userProfile),
            // [jsonHalWithProfile]: hal.fromUserProfile(userProfile),
            // [jsonLdWithProfile]: ld.fromUserProfile(userProfile)
        })
    }
}