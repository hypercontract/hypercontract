import { Response } from 'express';
import { mapValues } from 'lodash';
import { handleHtmlResponse } from './html/html-handler';
import { handleJsonResponse } from './json/json-handler';

type Handler = (response: Response, responseBody: any) => Response | Promise<Response>;

interface HandlerMapping {
    [key: string]: Handler;
}

const handlerMapping: HandlerMapping = {
    json: handleJsonResponse,
    html: handleHtmlResponse,
    // [jsonHalWithProfile]: handleJsonHalResponse,
    // [jsonLdWithProfile]: handleJsonLdResponse
};

export function sendResponse(response: Response, responseBodies: { [key: string]: any }) {
    response
        .format(mapValues(
            responseBodies,
            (responseBody, mediaType) => () => {
                handlerMapping[mediaType](response, responseBody);
            }
        ));
}
