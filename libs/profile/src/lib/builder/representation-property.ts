import { namedNode } from '@rdfjs/data-model';
import { flatten, isEmpty, isUndefined } from 'lodash';
import { owl, prefixes, rdf } from '../namespaces';
import { descriptor, Descriptor } from './descriptor';
import { toQuads } from './quad';
import { valueSchema, ValueSchema } from './schema';

export interface RepresentationProperty extends Descriptor {
    type?: string;
    schemas?: ValueSchema[];
}

export const representationProperty = (uri: string, definition: RepresentationProperty) => {
    const propertyType = getPropertyType(definition);
    return [
        ...descriptor(uri, definition),
        ...getValueSchemaStatements(uri, definition),
        ...toQuads(
            [namedNode(uri), namedNode(rdf('type')), namedNode(propertyType)],
        )
    ];
}

function getValueSchemaStatements(uri: string, { schemas }: RepresentationProperty) {
    if (isEmpty(schemas)) {
        return [];
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    return flatten(schemas!.map(
        schema => valueSchema(uri, schema)
    ));
}

function getPropertyType({ type, range }: RepresentationProperty): string {
    if (!isUndefined(type)) {
        return type;
    }

    if (isEmpty(range)) {
        return rdf('Property');
    }

    if (hasXsdDatatypeRange(range)) {
        return owl('DatatypeProperty');
    }

    return owl('ObjectProperty');
}

function hasXsdDatatypeRange(range: string[]) {
    return range.some(isXsdDatatype);
}

function isXsdDatatype(uri: string) {
    return uri.startsWith(prefixes.xsd);
}
