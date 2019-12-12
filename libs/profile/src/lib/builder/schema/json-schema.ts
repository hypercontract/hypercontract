import { JSONSchema7 } from 'json-schema';
import { Schema } from './schema';

export type JSONSchema = JSONSchema7;

export const toJsonSchemaId = (conceptUri: string, targetType: string) => `${conceptUri}/schema/${targetType}`;

export const jsonSchema = (conceptUri: string, definition: JSONSchema, targetType = 'application/json'): Schema => ({
    conceptUri,
    targetType,
    schemaType: 'application/schema+json',
    schemaDefinition: JSON.stringify({
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: toJsonSchemaId(conceptUri, targetType),
        ...definition
    })
})

export const jsonSchemaObject = (definition: JSONSchema = {}): JSONSchema => ({
    type: 'object',
    ...definition
});

export const jsonSchemaArray = (items: JSONSchema, definition: JSONSchema = {}): JSONSchema => ({
    type: 'array',
    items,
    ...definition
});

export const jsonSchemaString = (definition: JSONSchema = {}): JSONSchema => ({
    type: 'string',
    ...definition
});

export const jsonSchemaHref = (conceptUri: string, definition: JSONSchema = {}): JSONSchema => jsonSchemaString({
    $comment: `Value must be an URI for an instance of type <${conceptUri}>.`,
    ...definition
});

export const jsonSchemaRef = (conceptUri: string, definition: JSONSchema = {}, targetType = 'application/json'): JSONSchema => ({
    $ref: toJsonSchemaId(conceptUri, targetType),
    ...definition
});

export const jsonSchemaResource = (conceptUri: string, definition: JSONSchema = {}, targetType = 'application/json'): JSONSchema => ({
    oneOf: [
        jsonSchemaHref(conceptUri),
        jsonSchemaRef(conceptUri, {}, targetType)
    ],
    ...definition
});

export const jsonSchemaNumber = (definition: JSONSchema = {}): JSONSchema => ({
    type: 'number',
    ...definition
});

export const jsonSchemaInteger = (definition: JSONSchema = {}): JSONSchema => jsonSchemaNumber({
    multipleOf: 1,
    ...definition
});

export const jsonSchemaDecimal = (definition: JSONSchema = {}): JSONSchema => jsonSchemaNumber({
    ...definition
});

export const jsonSchemaDate = (definition: JSONSchema = {}): JSONSchema => jsonSchemaString({
    pattern: '^\\d\\d\\d\\d-(0?[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])Z?([-+](0?[1-9]|1[1-9]|2[0-3]):([0-5][0-9]))?$',
    ...definition
});
