import { hyper, rdf } from '@hypercontract/profile';
import { Response } from 'express';
import { isNull } from 'lodash';
import { handleNotFound } from './error';
import { ProfileStore } from './profile-store';

export function isSchemaRequest(requestUri: string, profileStore: ProfileStore) {
    return !isNull(profileStore.getSubject(hyper('schemaDefinition'), requestUri));
}

export function handleSchemaRequest(requestUri: string, response: Response, profileStore: ProfileStore) {
    const schemaUri = getSchemaUri(requestUri, profileStore);

    if (isNull(schemaUri)) {
        return handleNotFound(response);
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const type = getSchemaType(schemaUri!, profileStore);
    const definition = getSchemaDefinition(requestUri, profileStore);

    if (isNull(type) || isNull(definition)) {
        return handleNotFound(response);
    }

    return response
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        .type(type!)
        .send(definition);
}

function getSchemaUri(schemaDefinitionUri: string, profileStore: ProfileStore) {
    return profileStore.getSubject(hyper('schemaDefinition'), schemaDefinitionUri);
}

function getSchemaType(schemaUri: string, profileStore: ProfileStore) {
    return profileStore.getObject(schemaUri, hyper('schemaType'));
}

function getSchemaDefinition(schemaDefinitionUri: string, profileStore: ProfileStore) {
    return profileStore.getObject(schemaDefinitionUri, rdf('value'));
}
