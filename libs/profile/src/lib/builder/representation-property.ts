import { namedNode } from '@rdfjs/data-model';
import { isEmpty, isUndefined } from 'lodash';
import { owl, prefixes, rdf } from '../namespaces';
import { descriptor, Descriptor } from './descriptor';
import { toQuads } from './quad';

export interface RepresentationProperty extends Descriptor {
    type?: string;
}

export const representationProperty = (uri: string, definition: RepresentationProperty) => {
    const propertyType = getPropertyType(definition);
    return [
        ...descriptor(uri, definition),
        ...toQuads(
            [namedNode(uri), namedNode(rdf('type')), namedNode(propertyType)],
        )
    ];
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
