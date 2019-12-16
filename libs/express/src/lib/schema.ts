import { hyper, ProfileStore, rdf } from '@hypercontract/profile';
import { Request, Response } from 'express';
import { isNull, values } from 'lodash';
import { handleNotAcceptable, handleNotFound } from './error';
import { MediaType } from './profile/media-types';
import { getRequestUri } from './request';

export function isSchemaRequest(request: Request, profileStore: ProfileStore) {
    const requestUri = getRequestUri(request, profileStore);
    const schemaType = getSchemaType(requestUri, profileStore);
    return !isNull(schemaType) && request.accepts(schemaType);
}

export function handleSchemaRequest(request: Request, response: Response, profileStore: ProfileStore) {
    const schemaUri = getRequestUri(request, profileStore);
    const schemaType = getSchemaType(schemaUri, profileStore);
    const definition = getSchemaDefinition(schemaUri, profileStore);

    if (isNull(schemaType) || isNull(definition)) {
        return handleNotFound(response);
    }

    return response.format({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [schemaType!]: () => response.send(definition),
        default: () => handleNotAcceptable(response, [
            ...values(MediaType),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            schemaType!
        ])
    });
}

function getSchemaType(schemaUri: string, profileStore: ProfileStore) {
    return profileStore.getObject(schemaUri, hyper('schemaType'));
}

function getSchemaDefinition(schemaUri: string, profileStore: ProfileStore) {
    return profileStore.getObject(schemaUri, rdf('value'));
}
