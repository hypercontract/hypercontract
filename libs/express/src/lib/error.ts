import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { isEmpty } from 'lodash';

export function handleNotAcceptable(
    response: Response,
    supportedMediaTypes: string[],
    supportedProfiles: string[] = []
) {
    return response
        .status(HttpStatus.NOT_ACCEPTABLE)
        .header('Link', supportedMediaTypes.map(
            mediaType => `${getAlternateLink(mediaType, supportedProfiles)}`
        ))
        .send();
}

export function handleNotFound(response: Response) {
    return response
        .status(HttpStatus.NOT_FOUND)
        .send();
    }

export function handleInternalServerError(response: Response) {
    return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send();
}

function getAlternateLink(mediaType: string, profiles: string[]) {
    let alternate = `rel="alternate"; type="${mediaType}"`;

    if (!isEmpty(profiles)) {
        alternate = `${alternate}; profile="${profiles.join(' ')}"`;
    }

    return alternate;
}
