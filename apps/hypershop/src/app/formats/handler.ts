import { Response } from 'express';
import { isArray, mapValues } from 'lodash';

type ResponseBody = any;
type Handler = (response: Response, responseBody: ResponseBody) => Response | Promise<Response>;
interface HandlerMapping {
    [key: string]: Handler;
}

const handlerMapping: HandlerMapping = {
    json: handleJsonResponse,
    html: handleHtmlResponse,
    // [jsonHalWithProfile]: handleJsonHalResponse,
    // [jsonLdWithProfile]: handleJsonLdResponse
};


export function sendResponse(response: Response, responseBodies: { [key: string]: ResponseBody }) {
    response
        .format(mapValues(
            responseBodies,
            (responseBody, mediaType) => () => {
                handlerMapping[mediaType](response, responseBody);
            }
        ));
}

function handleHtmlResponse(response: Response, responseBody: ResponseBody) {
    let view = responseBody;
    let locals = {};

    if (isArray(responseBody)) {
        view = responseBody[0];
        locals = responseBody[1];
    }

    response.render(view, locals);
    return response;
}

// function handleJsonLdResponse(response: Response, responseBody: ResponseBody) {
//     const body = await compactWithDomainContext(responseBody);

//     return response
//         .type(jsonLdWithProfile)
//         .send(body);
// }

// function handleJsonHalResponse(response: Response, responseBody: ResponseBody) {
//     return handleJsonResponse(response, responseBody, jsonHalWithProfile);
// }

function handleJsonResponse(response: Response, responseBody: ResponseBody, mediaType = 'json') {
    return response
        .type(mediaType)
        .send(responseBody);
}
