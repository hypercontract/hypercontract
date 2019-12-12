import { jsonSchema, JSONSchema, jsonSchemaArray, jsonSchemaDate, jsonSchemaDateTime, jsonSchemaDecimal, jsonSchemaHref, jsonSchemaInteger, jsonSchemaObject, jsonSchemaRef, jsonSchemaResource, jsonSchemaString } from '@hypercontract/profile';
import { MediaType } from '../../formats/media-type';
import { shop } from '../namespaces';

export function jsonSchemaFor(targetType: MediaType) {
    const hrefSchema = (concept: string, definition?: JSONSchema) => jsonSchemaHref(shop(concept), definition);
    const refSchema = (concept: string, definition?: JSONSchema) => jsonSchemaRef(shop(concept), definition, targetType);
    const resourceSchema = (concept: string, definition?: JSONSchema) => jsonSchemaResource(shop(concept), definition, targetType);

    const empty = (name: string, definition: JSONSchema) => jsonSchema(shop(name), definition, targetType);
    const array = (name: string, items: JSONSchema, definition?: JSONSchema) => empty(name, jsonSchemaArray(items, definition));
    const date = (name: string, definition?: JSONSchema) => empty(name, jsonSchemaDate(definition));
    const dateTime = (name: string, definition?: JSONSchema) => empty(name, jsonSchemaDateTime(definition));
    const decimal = (name: string, definition?: JSONSchema) => empty(name, jsonSchemaDecimal(definition));
    const href = (name: string, target: string, definition?: JSONSchema) => empty(name, hrefSchema(target, definition));
    const integer = (name: string, definition?: JSONSchema) => empty(name, jsonSchemaInteger(definition));
    const string = (name: string, definition?: JSONSchema) => empty(name, jsonSchemaString(definition));
    const object = (name: string, definition?: JSONSchema) => empty(name, jsonSchemaObject(definition));
    const ref = (name: string, target: string, definition?: JSONSchema) => empty(name, refSchema(target, definition));
    const resource = (name: string, target: string, definition?: JSONSchema) => empty(name, resourceSchema(target, definition));

    const objectWith = (name: string, requiredProperties: string[], optionalProperties: string[] = [], definition?: JSONSchema) => object(
        name,
        {
            properties: [...requiredProperties, ...optionalProperties].reduce(
                (properties, property) => ({
                    ...properties,
                    [property]: refSchema(property)
                }),
                {}
            ),
            required: requiredProperties,
            ...definition
        }
    );

    return {
        empty,
        array,
        date,
        dateTime,
        decimal,
        href,
        integer,
        string,
        object,
        objectWith,
        ref,
        resource,
        hrefSchema,
        refSchema,
        resourceSchema
    }
}
