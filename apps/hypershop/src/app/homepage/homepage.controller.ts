import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../content-negotiation';
import { getHomepageRootPath } from '../routing/homepage.uris';
import { homepage } from './homepage.html';

@Controller()
export class HomepageController {

    @Get(getHomepageRootPath())
    get(@Res() response: Response) {
        sendResponse(response, {
            html: homepage()
        });
    }

}
