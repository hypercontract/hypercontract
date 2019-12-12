import { Response } from 'express';

export function handleJsonResponse(response: Response, responseBody: any, mediaType = 'json') {
    return response
        .type(mediaType)
        .send(responseBody);
}
