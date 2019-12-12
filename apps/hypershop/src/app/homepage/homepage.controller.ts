import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../content-negotiation';
import { homepage } from './homepage.html';
import { getRootPath } from './homepage.uris';

@Controller()
export class HomepageController {

    @Get(getRootPath())
    get(@Res() response: Response) {
        sendResponse(response, {
            html: homepage()
        });
    }

}
