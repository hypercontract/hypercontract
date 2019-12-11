import { jsonSchema, JSONSchema, jsonSchemaDate, jsonSchemaDecimal, jsonSchemaInteger, jsonSchemaObject, jsonSchemaRef, jsonSchemaResource, jsonSchemaString } from '@hypercontract/profile';
import { MediaType } from '../media-types';
import { shop } from '../namespaces';

export function jsonSchemaFor(targetType: MediaType) {
    const empty = (name: string, definition: JSONSchema) => jsonSchema(shop(name), definition, targetType);

    return {
        empty,
        date: (name: string, definition?: JSONSchema) => empty(name, jsonSchemaDate(definition)),
        decimal: (name: string, definition?: JSONSchema) => empty(name, jsonSchemaDecimal(definition)),
        integer: (name: string, definition?: JSONSchema) => empty(name, jsonSchemaInteger(definition)),
        string: (name: string, definition?: JSONSchema) => empty(name, jsonSchemaString(definition)),
        object: (name: string, definition?: JSONSchema) => empty(name, jsonSchemaObject(definition)),
        ref: (concept: string, definition?: JSONSchema) => jsonSchemaRef(shop(concept), definition, targetType),
        resource: (concept: string, definition?: JSONSchema) => jsonSchemaResource(shop(concept), definition, targetType),
    }
}
