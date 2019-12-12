import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../formats/handler';
import { getApiRootPath } from '../routing/api-root.uris';
import { renderHomepage } from './api-root.html';

@Controller()
export class ApiRootController {

    @Get(getApiRootPath())
    getApiRoot(
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
