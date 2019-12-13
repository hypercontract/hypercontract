import { handleNotAcceptable } from '@hypercontract/express';
import { Response } from 'express';
import { mapValues, values } from 'lodash';
import { profile } from '../profile';
import { handleHtmlResponse } from './html/html-handler';
import { handleJsonHalResponse } from './json-hal/json-hal-handler';
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
    [MediaType.JsonHal]: handleJsonHalResponse,
    [MediaType.JsonLd]: handleJsonLdResponse
};

export function sendResponse(response: Response, responseBodies: { [key: string]: any }) {
    response
        .format({
            ...mapValues(
                responseBodies,
                (responseBody, mediaType) => () => handlerMapping[mediaType](response, responseBody)
            ),
            default: () => handleNotAcceptable(response, values(MediaType), [profile.uri])
        });
}
