import RDF from '@rdfjs/data-model';
import { isEmpty, isUndefined } from 'lodash';
import { owl, prefixes, rdf } from '../namespaces';
import { descriptor, Descriptor } from './descriptor';
import { toQuads } from './quad';

export interface ConceptProperty extends Descriptor {
    type?: string;
}

export const conceptProperty = (uri: string, definition: ConceptProperty) => {
    const propertyType = getPropertyType(definition);
    return [
        ...descriptor(uri, definition),
        ...toQuads(
            [RDF.namedNode(uri), RDF.namedNode(rdf('type')), RDF.namedNode(propertyType)],
        )
    ];
}

function getPropertyType({ type, range }: ConceptProperty): string {
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
