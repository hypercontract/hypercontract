import { Response } from 'express';
import { isArray } from 'lodash';
import { globals } from './globals';

export function handleHtmlResponse(response: Response, responseBody: any) {
    let view = responseBody as string;
    let locals = {};

    if (isArray(responseBody)) {
        view = responseBody[0] as string;
        locals = responseBody[1];
    }

    response.render(view, {
        ...globals,
        ...locals
    });
    return response;
}
