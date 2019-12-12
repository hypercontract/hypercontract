import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../formats/handler';
import { MediaType } from '../formats/media-type';
import { getApiRootPath } from '../routing/api-root.uris';
import { renderHomepage } from './api-root.html';
import { toJsonHalApiRoot } from './api-root.json-hal';
import { toJsonLdApiRoot } from './api-root.json-ld';

@Controller()
export class ApiRootController {

    @Get(getApiRootPath())
    getApiRoot(
        @Res() response: Response
    ) {
        return sendResponse(response, {
            json: {},
            html: renderHomepage(),
            [MediaType.JsonHal]: toJsonHalApiRoot(),
            [MediaType.JsonLd]: toJsonLdApiRoot()
        });
    }

}
