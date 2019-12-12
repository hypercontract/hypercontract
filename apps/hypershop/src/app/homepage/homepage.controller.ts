import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../content-negotiation';
import { getHomepageRootPath } from '../routing/homepage.uris';
import { renderHomepage } from './homepage.html';

@Controller()
export class HomepageController {

    @Get(getHomepageRootPath())
    getHomepage(
        @Res() response: Response
    ) {
        return sendResponse(response, {
            json: {},
            html: renderHomepage(),
            // [jsonHalWithProfile]: hal.fromApiRoot(apiRoot),
            // [jsonLdWithProfile]: ld.fromApiRoot(apiRoot, apiRootProfile)
        });
    }

}
