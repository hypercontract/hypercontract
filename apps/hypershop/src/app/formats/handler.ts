import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { mapValues, values } from 'lodash';
import { handleHtmlResponse } from './html/html-handler';
import { handleJsonLdResponse } from './json-ld/json-ld-handler';
import { handleJsonResponse } from './json/json-handler';
import { MediaType } from './media-type';

type Handler = (response: Response, responseBody: any) => Response | Promise<Response>;

interface HandlerMapping {
    [key: string]: Handler;
}

const handlerMapping: HandlerMapping = {
    json: handleJsonResponse,
    html: handleHtmlResponse,
    // [jsonHalWithProfile]: handleJsonHalResponse,
    [MediaType.JsonLd]: handleJsonLdResponse
};

export function sendResponse(response: Response, responseBodies: { [key: string]: any }) {
    response
        .format({
            ...mapValues(
                responseBodies,
                (responseBody, mediaType) => () => handlerMapping[mediaType](response, responseBody)
            ),
            default: () => response
                .status(HttpStatus.NOT_ACCEPTABLE)
                .header('Content-Type', values(MediaType).join(', '))
                .send()
        });
}
