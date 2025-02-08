import RefParser from '@apidevtools/json-schema-ref-parser';
import { hyper, ProfileStore, rdf } from '@hypercontract/profile';
import { Request, Response } from 'express';
import { isNull, memoize, values } from 'lodash';
import omitDeep from 'omit-deep';
import { handleNotAcceptable, handleNotFound } from './error';
import { MediaType } from './profile/media-types';
import { getRequestUri } from './request';

export function isSchemaRequest(request: Request, profileStore: ProfileStore) {
    const requestUri = getRequestUri(request, profileStore);
    const schemaType = getSchemaType(requestUri, profileStore);
    return !isNull(schemaType) && request.accepts(schemaType);
}

export async function handleSchemaRequest(request: Request, response: Response, profileStore: ProfileStore) {
    const schemaUri = getRequestUri(request, profileStore);
    const schemaType = getSchemaType(schemaUri, profileStore);
    const definition = getSchemaDefinition(schemaUri, profileStore);

    if (isNull(schemaType) || isNull(definition)) {
        return handleNotFound(response);
    }

    const dereferencedDefinition = await dereferenceSchema(
        definition,
        schemaType,
        profileStore,
        false
    );

    return response.format({
        [schemaType]: () => response.send(dereferencedDefinition),
        default: () => handleNotAcceptable(response, [
            ...values(MediaType),
            schemaType
        ])
    });
}

const getAllSchemas = memoize((profileStore: ProfileStore): { [key: string]: any } => {
    const schemas = profileStore.getSubjects(rdf('type'), hyper('Schema'));
    return schemas.reduce(
        (definitions, schema) => ({
            ...definitions,
            [schema]: profileStore.getObject(schema, rdf('value'))
        }),
        {}
    );
});

export async function dereferenceSchema(
    schemaDefinition: string,
    schemaType: string,
    profileStore: ProfileStore,
    omitMetadata = true
) {
    if (schemaType !== 'application/schema+json') {
        return schemaDefinition;
    }

    const schemas = getAllSchemas(profileStore);

    const dereferencedSchemaDefinition = await RefParser.dereference(
        JSON.parse(schemaDefinition),
        {
            resolve: {
                file: false,
                http: false,
                profileSchema: {
                    canRead: true,

                    async read(file: { url: string }) {
                        return schemas[file.url];
                    }
                }
            } as any
        }
    );
    return JSON.stringify(
        omitMetadata ? omitDeep(dereferencedSchemaDefinition, ['$id', '$schema']) : dereferencedSchemaDefinition,
        undefined, 2
    );
}

function getSchemaType(schemaUri: string, profileStore: ProfileStore) {
    return profileStore.getObject(schemaUri, hyper('schemaType'));
}

function getSchemaDefinition(schemaUri: string, profileStore: ProfileStore) {
    return profileStore.getObject(schemaUri, rdf('value'));
}
