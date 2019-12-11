import { JSONSchema7 } from 'json-schema';
import { Schema } from './schema';

type JSONSchema = JSONSchema7;

const baseSchema: JSONSchema = {
    '$schema': 'http://json-schema.org/draft-07/schema#'
};

export const jsonSchema = (definition: JSONSchema): Schema => ({
    fileExtension: 'json',
    schemaType: 'application/schema+json',
    targetTypes: [
        'application/json'
    ],
    schemaDefinition: JSON.stringify(definition)
})

export const jsonSchemaString = (definition: JSONSchema = {}): Schema => jsonSchema({
    ...baseSchema,
    type: 'string',
    ...definition
});

export const jsonSchemaNumber = (definition: JSONSchema = {}): Schema => jsonSchema({
    ...baseSchema,
    type: 'number',
    ...definition
});

export const jsonSchemaInteger = (definition: JSONSchema = {}): Schema => jsonSchemaNumber({
    multipleOf: 1,
    ...definition
});

export const jsonSchemaDecimal = (definition: JSONSchema = {}): Schema => jsonSchemaNumber({
    ...definition
});

export const jsonSchemaDate = (definition: JSONSchema = {}): Schema => jsonSchemaString({
    pattern: '^\\d\\d\\d\\d-(0?[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])Z?([-+](0?[1-9]|1[1-9]|2[0-3]):([0-5][0-9]))?$',
    ...definition
});
