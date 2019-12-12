import { JSONSchema } from '@hypercontract/profile';
import { MediaType } from '../media-types';
import { shop } from '../namespaces';
import { jsonSchemaFor } from './json-schema-builder';

const { array, hrefSchema, object, refSchema } = jsonSchemaFor(MediaType.JsonHal);

const halLinkObject = (href: JSONSchema): JSONSchema => ({
    type: 'object',
    properties: {
        href
    },
    required: ['href']
});

const halResourceState = (properties: string[]): { [key: string]: JSONSchema } => properties.reduce(
    (propertyRefs, property) => ({
        ...propertyRefs,
        [property]: refSchema(property)
    }),
    {}
);

const halLinks = (links: string[]): JSONSchema => ({
    type: 'object',
    properties: [...links].reduce(
        (linkObjects, link) => ({
            ...linkObjects,
            [shop(link)]: refSchema(link)
        }),
        {
            self: halLinkObject({
                type: 'string',
                $comment: 'A unique identifier.'
            })
        }
    ),
    required: ['self']
});

const halEmbedded = (embedded: string[]): JSONSchema => ({
    type: 'object',
    properties: embedded.reduce(
        (embeddedResources, embeddedResource) => ({
            ...embeddedResources,
            [shop(embeddedResource)]: refSchema(embeddedResource)
        }),
        {}
    )
});

export const halHref = (name: string, target: string) => object(
    name,
    halLinkObject(hrefSchema(target))
);

export const hal = (properties: string[], optionalProperties: string[] = [], links: string[] = [], embedded: string[] = []): JSONSchema => ({
    properties: {
        ...halResourceState([...properties, ...optionalProperties]),
        _links: halLinks(links),
        _embedded: halEmbedded(embedded)
    },
    required: properties
});
