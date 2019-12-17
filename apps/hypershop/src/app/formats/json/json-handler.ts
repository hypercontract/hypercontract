import { Response } from 'express';
import { MediaType } from '../media-type';

export function handleJsonResponse(response: Response, responseBody: any, mediaType = MediaType.Json) {
    return response
        .type(mediaType)
        .send(JSON.stringify(responseBody, undefined, 2));
}
