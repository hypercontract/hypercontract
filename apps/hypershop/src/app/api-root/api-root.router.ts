import { asyncHandler } from '@hypercontract/express';
import { Router } from 'express';
import { sendResponse } from '../formats/handler';
import { MediaType } from '../formats/media-type';
import { getApiRootPath } from '../routing/api-root.uris';
import { renderHomepage } from './api-root.html';
import { toJsonHalApiRoot } from './api-root.json-hal';
import { toJsonLdApiRoot } from './api-root.json-ld';

export function createApiRootRouter(): Router {
    const router = Router();

    router.get(getApiRootPath(), asyncHandler((_request, response) => {
        return sendResponse(response, {
            json: {},
            html: renderHomepage(),
            [MediaType.JsonHal]: toJsonHalApiRoot(),
            [MediaType.JsonLd]: toJsonLdApiRoot()
        });
    }));

    return router;
}
