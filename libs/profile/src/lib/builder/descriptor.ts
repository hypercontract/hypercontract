import { namedNode } from '@rdfjs/data-model';
import { isUndefined } from 'lodash';
import { owl, rdf, rdfs } from '../namespaces';
import { Statement } from '../profile';
import { concept, Concept } from './concept';
import { toQuads } from './quad';

export interface Descriptor extends Concept {
    domain: string[];
    range: string[];
    cardinality?: Cardinality;
}

export enum Cardinality {
    One,
    OneOrMore,
    ZeroOrMore
}

export const descriptor = (uri: string, definition: Descriptor) => [
    ...concept(uri, definition),
    ...toQuads(
        isOne(definition.cardinality) ? [namedNode(uri), namedNode(rdf('type')), namedNode(owl('FunctionalProperty'))] : null,
        ...getDomainStatements(uri, definition),
        ...getRangeStatements(uri, definition)
    )
];

function getDomainStatements(uri: string, { domain }: Descriptor): Statement[] {
    return domain.map(
        domainUri => [namedNode(uri), namedNode(rdfs('domain')), namedNode(domainUri)]
    );
}

function getRangeStatements(uri: string, { range }: Descriptor): Statement[] {
    return range.map(
        rangeUri => [namedNode(uri), namedNode(rdfs('range')), namedNode(rangeUri)]
    );
}

function isOne(cardinality: Cardinality | undefined) {
    return isUndefined(cardinality) || cardinality === Cardinality.One;
}
