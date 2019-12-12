import { Response } from 'express';
import { handleJsonResponse } from '../json/json-handler';
import { MediaType } from '../media-type';

export function handleJsonHalResponse(response: Response, responseBody: any) {
    return handleJsonResponse(response, responseBody, MediaType.JsonHal);
}
